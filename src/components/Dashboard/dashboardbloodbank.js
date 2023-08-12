import React from "react";
import './dashboardbloodbank.css'
import Sidenavbloodbank from "../Sidenav/sidenavbloodbank"
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import Blood from '../../images/blood.png'
import Profit from '../../images/profits.png'
import {GrHelp} from "react-icons/gr";
import BloodGroup from '../../images/bloodgroup.png'
import { useEffect } from "react";
import Transactions from "../Transactions/transactions";
import Bloodgroup from "../BloodGroup/bloodgroup";
import Week from '../../images/week.png';
import Profilebloodbank from '../Profile/profilebloodbank'


function Dashboardbloodbank(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [tab, settab]=useState('Home');
    
    const [last_transact,setlast_transact]=useState({date:'',buyer_name:'',amount:'',items:[{name:'',quantity:''}]});

//dashboard content

    const [statistics,setstatistics]=useState({todayblood:'',weeksale:'',todaysale:'',popblood:''})
    
    const [bloodgroup_list,setbloodgroup_list]=useState([])

//navigate between tabs from the sidenav clicks and transitions
    const handlestate=(msg)=>{
    
        settab(msg.tab)
        
        setexpandedstate(msg.expanded)
    }


useEffect(()=>{

    if(!expandedstate){
        document.getElementById('dashboardarea').style.width='97%'
    }
    else{
        document.getElementById('dashboardarea').style.width='85%'
    }
})

useEffect(()=>{
sessionStorage.setItem('org_name', 'Fatmid'); 
sessionStorage.setItem('org_address', 'Britto Rd, Garden East Karachi, Sindh, Pakistan');
sessionStorage.setItem('email', 'Hbb.south@gmail.com'); 
sessionStorage.setItem('phone', '021-32237734');  
sessionStorage.setItem('password','********')



},[])

useEffect(()=>{
    if(tab==='Home'){
        fetchblood()
        fetchstats()
        fetchlasttransact()
    }

},[tab])

//fetch last stored transaction
function fetchlasttransact(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/transactionandorder/getlasttransact/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.transaction){
          setlast_transact(json.transaction);
        }else{setlast_transact({date:'',buyer_name:'',amount:'',items:[{quantity:'',name:''}]});}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

function fetchstats(){
try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/bloodbank/stats/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {

            setstatistics({todayblood:json.item_sold_today,weeksale:json.transac_amount_week,todaysale:json.transac_amount_today,popblood:(json.popular_blood!=''||json.popular_blood!=null)?json.popular_blood:'-'})
        
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
          
          setbloodgroup_list(json.bloodgroups);
        }else{setbloodgroup_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

return(

<>

<div id="dashboardcontainer">

<Sidenavbloodbank msg={handlestate} />
    <div id="dashboardarea">

            <div className="infoareadashboard">
{(tab==='Home') && 
            <>
                <div className="section1">
                    <div className="subsec1">
                        <div className="Summarybar">
                            <h4>Statistics</h4>
                            <div id="statisticsdiv">
                                <div className="summarytilesbloodbank">
                                    <img src={Blood}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Blood units sold</h3>
                                        <h2 className="tilevalue">{statistics.todayblood}</h2>
                                    </div>
                                </div>
                                <div className="summarytilesbloodbank">
                                    <img src={Profit}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Sales(Rupees)</h3>
                                        <h2 className="tilevalue">{statistics.todaysale}</h2>
                                    </div>
                                </div>
                                <div className="summarytilesbloodbank">
                                    <img src={Week}></img>
                                    <div>
                                        <h3 className="tilename">This Week<br/> Sales(Rupees)</h3>
                                        <h2 className="tilevalue">{statistics.weeksale}</h2>
                                    </div>
                                </div> 
                                <div className="summarytilesbloodbank">
                                    <img src={BloodGroup}></img>
                                    <div>
                                        <h3 className="tilename">Popular<br/> Blood group</h3>
                                        <h2 className="tilevalue">{statistics.popblood}</h2>
                                    </div>
                                </div>                                    
                                
                            </div>
                            
                        </div>
                        <h2 className="performacetitle">Performance and Operations</h2>
                        <div className="performancegraphbloodbank">
                        </div>
                    </div>
                    <div className="subsec2bloodbank">
                        

                        <div className="bookdiv">
                       
                        </div>
                        <div id='bottomcontentbloodbank'>
                        <div className="section2subbloodbank">
                            <h2 className="booktitledivbloodbank">Stock</h2>
                            <div id="stockdiv">

                                <div id="stockhead">
                                    <h3>Blood Group</h3>
                                    <h3>Quantity</h3>
                                </div>
{bloodgroup_list.map((i,ind)=>{return(<>
                                <div id="stockcontent">
                                    <h3>{i.AvailableBloodGroup}</h3>
                                    <h3>{i.quantity}</h3>
                                </div>

</>)})}
                            </div>
                        </div>
                        <div className="section2subbloodbank">
                            <h2 className="booktitledivbloodbank">Last Transaction</h2>
                            <div id="eventsdiv">

                                <h5>{last_transact.date}</h5>
                                <h3>{last_transact.buyer_name}</h3>
                                
                                <h4>Rs {last_transact.amount}</h4>
                                <div id="itemblooddiv">

                                    <div><h5>Item</h5><h5>Quantity</h5></div>
{last_transact.items.map((i,index)=>{return(<>
                                    <div><h5>{i.name}</h5><h5>{i.quantity}</h5></div>
</>)})}
           
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

            </>
}
{(tab==='Transactions')&&
<Transactions stock="Blood Groups" class="blood"/>
}
{(tab==='Blood')&&
<Bloodgroup/>
}

{(tab==='Profile')&&
<Profilebloodbank/>
}



        </div>
    </div>
</div>
</>
)
}
export default Dashboardbloodbank;