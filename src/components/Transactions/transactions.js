import React from "react";
import './transactions.css';
import HistoryP from '../../images/history.png'
import { useState,useEffect } from "react";
import Transactionhistory from "./transactionhistory";


function Transactions(props){
    const [close_history_view, set_history_view] = useState(true);
    const [transactioninfo,settransactioninfo]=useState({buyer_name:'',date:'',discount:'',amount:0,items:[]})
    const [displayed_list,setdisplayed_list]=useState([])

useEffect(()=>{
    let currentdate=new Date()
    currentdate=currentdate.getDate()+'/'+currentdate.getMonth()+'/'+currentdate.getFullYear()
    settransactioninfo({buyer_name:'',date:currentdate,discount:'',amount:0,items:[]})
    if(props.class==='blood'){ fetchblood()}
    else if(props.class==='pharmacy'){
        fetchmeds()
        
}

},[])

//fetch medicines from the database
function fetchmeds(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/pharmacy/detailmed/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.medicines){
          var meds=json.medicines.filter(medicine => medicine.quantity >0)
          setdisplayed_list(meds);
            
        }else{setdisplayed_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

//fetch blood groups from the database
function fetchblood(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/bloodbank/getblood/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.bloodgroups){
          var blood =json.bloodgroups.filter(b => b.quantity > 0)
          setdisplayed_list(blood);
        }else{setdisplayed_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

const handleinput=(e)=>{
    e.preventDefault()
    if(e.target.name==='buyer_name'){
        settransactioninfo((previnfo)=>{return({...previnfo,[e.target.name]:e.target.value})})
    }
    if(e.target.className==='quantityinput'){
        if(e.target.value<0){
            e.target.value=0
        }
        
            var index=parseInt(e.target.id);
            let itemlist=transactioninfo.items;
            
            itemlist[index].quantity=e.target.value;
            var amounts=0
            for(var i=0;i<itemlist.length;i++){
                amounts+=parseInt(itemlist[i].quantity)*parseInt(itemlist[i].price);
            }
            settransactioninfo((previnfo)=>{return({...previnfo,items:itemlist,amount:amounts})})

            

    }
}

useEffect(()=>{
    console.log(transactioninfo )

},[transactioninfo])


const handlechecks=(e)=>{
            if(e.target.checked){
        var itemlist = transactioninfo.items;
        var itemid=parseInt(e.target.id)
        itemlist.push({ name: e.target.name, price:displayed_list[itemid].price, quantity: 1 });
        var amount = 0;
        for (var i = 0; i < itemlist.length; i++) {
        amount = amount + parseInt(itemlist[i].quantity) * parseInt(itemlist[i].price);
        }

        settransactioninfo((previnfo) => {
        return { ...previnfo, items: itemlist, amount: amount };
        });

        

    }
    else{
        var itemlists=[];
        for (var j=0;j<transactioninfo.items.length;j++){
            if(transactioninfo.items[j].name!==e.target.name){
                itemlists.push(transactioninfo.items[j])
            }
        } 
        var amounts = 0;
        for (var y = 0; y < itemlists.length; y++) {
        amounts = amounts + parseInt(itemlists[y].quantity) * parseInt(itemlists[y].price);
        }
        settransactioninfo((previnfo) => {
        return { ...previnfo, items: itemlists, amount: amounts };
        });
        
    }
}

useEffect(()=>{
    if(transactioninfo.buyer_name===''||transactioninfo.items.length<1){
        document.getElementsByClassName('save-btn')[0].classList.add('idlebtn');
    }
    else{
        document.getElementsByClassName('save-btn')[0].classList.remove('idlebtn');
    }
})

const transact_submit=()=>{
    try{
        var api;
        if(props.class==='blood'){
            api='http://localhost:5000/api/transactionandorder/transactionblood';
        }
        else if(props.class==='pharmacy'){
        api='http://localhost:5000/api/transactionandorder/transactionmeds';
        }

        let data={org_name:sessionStorage.getItem('org_name'),address:sessionStorage.getItem('org_address'),transactioninfo:transactioninfo}
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
                if (res.status === 200) {
                    alert('transaction successful')
                    if(props.class==='blood'){ 
                        fetchblood()
                    }
                    else if(props.class==='pharmacy'){
                        fetchmeds()
                    }
                    var currentDate = new Date();
                    var formattedDate =currentDate.getDate() +'/' +(currentDate.getMonth() + 1) +'/' +currentDate.getFullYear();

                    settransactioninfo({buyer_name: '',date: formattedDate,discount: '',amount: 0,items: []});

                    var x = document.getElementsByClassName('checkboxtransact');
                    for (var i = 0; i < x.length; i++) {
                        if (x[i].checked) {
                            x[i].checked = false;
                        }
                    }
                }
                else if (res.status === 430) { alert(res.error) }

                else {  alert('Problem adding medicines', res.error) }
            });
    }catch(err){
        console.log(err);
    }
}

//close the history tab
const handle_add=(close)=>{
  set_history_view(close)
  
}
return(
<>
{!close_history_view &&
<Transactionhistory close={handle_add} message={props.class}/>
}
        <div id="Transactionsdashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">Transactions</h3>
                    <hr/>
                    <div id="historybar">
                        <div onClick={()=>{set_history_view(false)}}>
                            <h3>Transaction History</h3>
                            <img src={HistoryP}></img>
                        </div>
                    </div>
                <div id="transactionsdiv">
                    <div id={"transact-div"+props.class}>
                        <div id='date'>
                            <h2 >Date:</h2>
                            <h3>{transactioninfo.date}</h3>
                        </div>
                        <div id='buyername'>
                            <label htmlFor='buyer_name'>Customer Name:</label>
                            <input type="text" value={transactioninfo.buyer_name} name="buyer_name" id='buyer_name' onChange={handleinput}/>
                        </div>
                        <div id='transactionitemcontainer'>
                            <table>
                                <tr className="itemhead">
                                    <th className="quantity">Quantity</th>
                                    <th className="itemname">Name</th>
                                    <th>Price (Rs)</th>
                                </tr>
{transactioninfo.items.map((i,index)=>{return(
                                <tr >
{props.class==='blood'&&
                                    <td className="quantity">
                                        <input type="number" id={index+'quantity'} className="quantityinput" min={1} value={i.quantity} onChange={handleinput} 

                                        max={displayed_list.find(d => d.AvailableBloodGroup === i.name)?.quantity}/>
                                    </td>
}
{props.class==='pharmacy'&&
                                    <td className="quantity">
                                        <input type="number" id={index+'quantity'} className="quantityinput" min={1} value={i.quantity} onChange={handleinput} 

                                        max={displayed_list.find(d => d.name === i.name)?.quantity}/>
                                    </td>
}
                                    <td className="itemname">{i.name}</td>
                                    <td>{parseInt(i.quantity)*parseInt(i.price)}</td>
                                </tr>
)})}
                                
                            </table>
                            <div>

                                <div id='itemtotalamount'>
                                    <h3>Total Amount:</h3>
                                    <h4>{transactioninfo.amount}</h4>
                                </div>
                            </div>
                        </div>
                        <div id={"transact-divbottom"+props.class}>
                            <button id={'savetransact'+props.class} className="save-btn" onClick={transact_submit}>Save And Proceed</button>
                        </div>
                    </div>
                    <div id={"side-transact-div"+props.class}>
                        <div id={"header-side-transact-div"+props.class}>
                            <h1>{props.stock} in stock</h1>
                        </div>
                        <div id="slec" className={'slec'+props.class}>
                                    <h6></h6>                        
                                    <h6>Name</h6>
                                    <h6>Price (Rs)</h6>
                                    <h6>Quantity</h6>
                                </div>
                        <div id="container-side-transact-div">
                        
                            <table>
                                
{displayed_list.map((i,index)=>{return(
                                <tr className={"entrydetail"+props.class}>
                                    <td><input type="checkbox" id={index+"-cb"} onChange={handlechecks} name={props.class==='blood'?i.AvailableBloodGroup:i.name} className="checkboxtransact"></input></td>                        
                                    <td ><label htmlFor={index+"-cb"}>{props.class==='blood'?i.AvailableBloodGroup:i.name}</label></td>
                                    <td><label htmlFor={index+"-cb"}>{i.price}</label></td>
                                    <td><label htmlFor={index+"-cb"}>{i.quantity}</label></td>
                                </tr>

)})}



                            </table>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
</>
)
}
export default Transactions;