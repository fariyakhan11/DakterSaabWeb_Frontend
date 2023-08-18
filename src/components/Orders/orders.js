import React from "react";
import './orders.css';
import {FiPackage} from "react-icons/fi";
import { useState,useEffect } from "react";
import {AiFillCaretDown} from "react-icons/ai";

import {BsSave} from "react-icons/bs";

import 'react-datepicker/dist/react-datepicker.css';
import OrdersI from '../../images/order (1).png'
import OrdersP from '../../images/box.png'
import MedP from '../../images/medicine.png';
import io from 'socket.io-client';

function Orders(){
    const [searchcustomer,setsearchcustomer]=useState('')
    const [selectedstatus,setselectedstatus]=useState('')
    const [selectedDate, setSelectedDate] = useState('');
    const [order_list,setorder_list]=useState([]);
    const [displayed_list,setdisplayed_list]=useState([])
    const [statistics,setstatistics]=useState({todaymed:'',weeksale:'',todaysale:'',totalorder:'',orderpend:'',popmed:''})
    

//fetch orders from the database
function fetchorders(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/transactionandorder/getorders/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.order){
          setorder_list(json.order);
        }else{setorder_list([]);setdisplayed_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

useEffect(() => {
    const socket = io('http://localhost:5000'); // Replace with your server URL
    fetchorders();
    fetchstats();
    // Listen for the 'entryAdded' event
    socket.on('entryAdded', newEntry => {
      
      if(newEntry.org_name===sessionStorage.getItem('org_name')&&newEntry.org_address===sessionStorage.getItem('org_address')){
        setorder_list(prev=>[...prev,newEntry])
      }
    });

    // Cleanup: Disconnect the socket when the component unmounts
    return () => socket.disconnect();
    // Fetch orders and stats


}, []);

useEffect(()=>{
    
filter()

},[order_list])

//data filter toggle on/off
const handledatefilter = (e) => {
  var currentDate = new Date(); // Get the current date

  if (selectedDate==='') {
    e.target.classList.add('activetogglebtn');
    e.target.classList.remove('idletogglebtn');
    document.getElementById('togglebtndiv').style.justifyContent = 'flex-end';
    setSelectedDate(currentDate.toISOString().split('T')[0]); // Set selectedDate to current date
    

  } else {
    e.target.classList.add('idletogglebtn');
    e.target.classList.remove('activetogglebtn');
    document.getElementById('togglebtndiv').style.justifyContent = 'flex-start';
    setSelectedDate('');
    
    
  }
};
//show or hide the order detail
const orderdetailhandler=(e)=>{
    var parentnode=e.target.parentNode;
    var id=parseInt(parentnode.id);

    if(document.getElementsByClassName('orderdetail')[id].style.display==='none'){
        document.getElementsByClassName('expand_icon')[id].style.transform='rotate(180deg)';
        document.getElementsByClassName('orderdetail')[id].style.display='flex';
    }
    else{
        document.getElementsByClassName('expand_icon')[id].style.transform='rotate(0deg)';
        document.getElementsByClassName('orderdetail')[id].style.display='none';
    }
}

const filterorders = (e) => {

  if (e.target.id === 'all') {
    
    document.getElementsByClassName('selectedstatus')[0].classList.remove('selectedstatus');
    e.target.classList.add('selectedstatus');
    setselectedstatus('')
  } else {

    document.getElementsByClassName('selectedstatus')[0].classList.remove('selectedstatus');
    e.target.classList.add('selectedstatus');
    setselectedstatus(e.target.id)
  }
};


function fetchstats(){
try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/pharmacy/stats/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {

            setstatistics({todaymed:json.item_sold_today,weeksale:json.transac_amount_week,todaysale:json.transac_amount_today,totalorder:json.total_orders_today,orderpend:json.pending_orders_today,popmed:json.popular_med})
      });
    }catch(err){
      console.log(err)
    }
}

function format_date(d){
    d=parseInt(d.split('-')[2])+'/'+parseInt(d.split('-')[1])+'/'+d.split('-')[0]
    d=d.toString();
    return d;
}

const handleSearchCustomer=(e)=>{

    setsearchcustomer(e.target.value)
}
function filter(){
    var dL=[...order_list]
    if(searchcustomer!==''){
        dL=dL.filter(f=>f.buyer_name.toLowerCase().includes(searchcustomer.toLowerCase()))
    }
    if(selectedstatus!==''){
        dL=dL.filter(f=>f.status===selectedstatus)
    }
    if(selectedDate!==''){
        var d=selectedDate('/')+'-'+selectedDate.split('/')[1]+'-'+selectedDate.split('/')[0]
        dL=dL.filter(f=>f.date===d)
    }
    setdisplayed_list(dL)
}

function updateorder(id){
    try{
        var api='http://localhost:5000/api/transactionandorder/updateorder';
        
        var transactioninfo={date:displayed_list[id].date,buyer_name:displayed_list[id].buyer_name,items:displayed_list[id].items,discount:displayed_list[id].discount,amount:displayed_list[id].amount,status:'delivered'}
        let data={org_name:sessionStorage.getItem('org_name'),address:sessionStorage.getItem('org_address'),transactioninfo:transactioninfo}
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
                if (res.status === 200) {
                    alert('order is updated')
                    fetchorders()

                }
                else if (res.status === 430) { alert(res.error) }

                else {  alert('Problem adding medicines', res.error) }
            });
    }catch(err){
        console.log(err);
    }
}
const savetrans=(e)=>{
    const id=e.target.id;
    console.log(order_list[id])
    try{
        var api='http://localhost:5000/api/transactionandorder/transactionmeds';
        
        var transactioninfo={date:displayed_list[id].date,buyer_name:displayed_list[id].buyer_name,items:displayed_list[id].items,discount:displayed_list[id].discount,amount:displayed_list[id].amount}
        let data={org_name:sessionStorage.getItem('org_name'),address:sessionStorage.getItem('org_address'),transactioninfo:transactioninfo}
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
                if (res.status === 200) {
                    
                    updateorder(id)

                }
                else if (res.status === 430) { alert(res.error) }

                else {  alert('Problem adding medicines', res.error) }
            });
    }catch(err){
        console.log(err);
    }
}

useEffect(()=>{
filter()
},[selectedstatus])

useEffect(()=>{
    filter()
},[searchcustomer])

useEffect(()=>{
    filter()
},[selectedDate])
return(
<>
        <div id="Ordersdashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">Our Orders</h3>
                    <hr/>
                            <div id="statisticsdiv">
                                <div className="summarytilesbloodbank">
                                    <img src={OrdersI}></img>
                                    <div>
                                        <h3 className="tilename">Total <br/>Orders</h3>
                                        <h2 className="tilevalue">{statistics.totalorder}</h2>
                                    </div>
                                </div>
                                <div className="summarytilesbloodbank">
                                    <img src={OrdersP}></img>
                                    <div>
                                        <h3 className="tilename">Orders <br/>Pending </h3>
                                        <h2 className="tilevalue">{statistics.orderpend}</h2>
                                    </div>
                                </div> 
                                <div className="summarytilesbloodbank">
                                    <img src={MedP}></img>
                                    <div>
                                        <h3 className="tilename">Popular<br/> Medicine</h3>
                                        <h2 className="tilevalue">{statistics.popmed}</h2>
                                    </div>
                                </div>
                                      
                                
                            </div>
                <div id="mainorderdiv">
                    <div id="ordersdiv">
    {
                            !order_list.length&&
                            <h2 className="no_med">No orders yet</h2>
    }
    {

                            displayed_list.map((i,index)=>{
                            return(

                        <div className="orderbox" id={index}>
                            <div className={"order_container"+i.status} id={index}>
                                <FiPackage className="tabsicon Order_symbol" id={index}/>
                                <h2 className="order_title" id={index}>{i.buyer_name}</h2>
                                <div className="orderchangestatus" onClick={savetrans} id={index}>
                                    <BsSave className="tabsicon " id={index} onClick={savetrans}/>
                                </div>
                                <h2 className="order_date" id={index}>{format_date(i.date)}</h2>
                                <h2 className="status" id={index}>{i.status}</h2>
                                
                                <div className="expand_icon" onClick={orderdetailhandler} id={index}>
                                    <AiFillCaretDown className="tabsicon " id={index}/>
                                </div>
                            </div>
                            <div className="orderdetail" id={index}>
                                <table className="detail_table" id={index}>
                                    <tr className="headings" id={index}>
                                        <th id={index}>Medicine Name</th>
                                        <th id={index}>Quantity</th>
                                        <th id={index}>Price</th>
                                    </tr>
    {i.items.map((j,jindex)=>{
        return(
                                    <tr id={index}>
                                        <td id={index}>{j.name}</td>
                                        <td id={index}>{j.quantity}</td>
                                        <td id={index}>{j.price}</td>
                                    </tr >
    )})}
                                    <tr className="totaldiv" id={index}>
                                        <td colspan="2" className="total">Discount</td>
                                        <td className="totalamount">{i.discount}</td>
                                    </tr>
                                    <tr className="totaldiv" id={index}>
                                        <td colspan="2" className="total">Total Price</td>
                                        <td className="totalamount">{i.amount}</td>
                                    </tr>

                                </table>
                            </div>
                        </div>
    )})}                  

                    </div>
                    <div id="sidebarorder">
                    <div id="summarybardiv">

                    </div>
                    <div className="filterbar">
                        
                            <h6>Customer Name:</h6>
                                <input
                                type="text"
                                placeholder="Search orders by name"
                                value={searchcustomer}
                                onChange={handleSearchCustomer}
                                className='searchorder'
                                />
                            <div id="datesearch">
                                <h6>Search by Date: </h6>
                                <div id="togglebtndiv"><div id="togglebtncircle" className="idletogglebtn" onClick={handledatefilter}></div></div>
                            </div>

                            
                            <input type="date" id="datepicker" className="calendar-containerfilter" value={selectedDate} onChange={(e) =>{ setSelectedDate(e.target.value)}}></input>                                

                            <h6>Order Status:</h6>
                                <h5 id="all" className="selectedstatus" onClick={filterorders} >All</h5>
                                <h5 id="pending" onClick={filterorders}>Pending</h5>
                                <h5 id="delivered" onClick={filterorders}>Delivered</h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>
</>
)
}
export default Orders;