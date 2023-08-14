import React from "react";
import './dashboardpharmacy.css'
import Sidenavpharmacy from "../Sidenav/sidenavpharmacy"
import { useState } from "react";
import Medicines from "../Medicines/medicines";
import { useEffect } from "react";
import Orders from "../Orders/orders";
import Transactions from "../Transactions/transactions";
import Profit from '../../images/profits.png'
import Med from '../../images/drugs1.png';
import MedP from '../../images/medicine.png';
import Week from '../../images/week.png';
import OrdersI from '../../images/order (1).png'
import OrdersP from '../../images/box.png'
import Trans from '../../images/card-payment.png'
import Profilepharmacy from "../Profile/profilepharmacy";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function Dashboardpharmacy(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(true)
    const [statistics,setstatistics]=useState({todaymed:'',weeksale:'',todaysale:'',totalorder:'',orderpend:'',popmed:''})
    const [tab, settab]=useState('Home');
    const [order_list,setorder_list]=useState([]);
    const [last_transact,setlast_transact]=useState({date:'',buyer_name:'',amount:'',items:[{name:'',quantity:''}]});
    const [medicine_list,setmedicine_list]=useState([]);

//navigate between tabs from the sidenav clicks and transitions
    const handlestate=(msg)=>{
        settab(msg.tab)
        
        setexpandedstate(msg.expanded)
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: 'Medicines sold in Week',
          },
        },
      };
      
      const labels = ['zylex','augmentin','cafka','ponstan','panadol','flagel','gponstan','honad','isbhcbshj','jbcjhc','ksbjcvnvx','lxsbcj','mxscb','motilium','csbhnc','ansaid','honad','isbhcbshj','jbcjhc','ksbjcvnvx','lxsbcj','mxscb','motilium','csbhnc','ansaid'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Week 1',
            data: [10,79,25,25,32,1,45,23,56,34,4,20,19,50,27,7,34,4,20,19,50,27,7],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Week 2',
            data: [4,47,23,56,5,61,15,8,3,67,34,9,0,3,0,10,34,4,20,19,50,27,7],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };


useEffect(()=>{

    if(!expandedstate){
        document.getElementById('dashboardarea').style.width='97%'
    }
    else{
        document.getElementById('dashboardarea').style.width='85%'
    }


})

useEffect(()=>{
    sessionStorage.setItem('org_name', 'Tabiyat pk');
    sessionStorage.setItem('org_address', '456 Park Avenue PECHS');
},[])

useEffect(()=>{
    if(tab==='Home'){
        fetchlasttransact()
        fetchlowmeds()
        fetchstats()
        
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
        }else{setlast_transact();}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

function fetchlowmeds(){
try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/pharmacy/lowmeds/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.medicines){
          setmedicine_list(json.medicines.filter(o=>o.quantity>=0));
          
        }else{setmedicine_list([]);}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

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


return(
<>


<div id="dashboardcontainer">

<Sidenavpharmacy msg={handlestate} />

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
                                    <img src={Med}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Medicines sold</h3>
                                        <h2 className="tilevalue">{statistics.todaymed}</h2>
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
                                    <img src={Profit}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Sales(Rupees)</h3>
                                        <h2 className="tilevalue">{statistics.todaysale}</h2>
                                    </div>
                                </div>
                                      
                                
                            </div>
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
                            
                        </div>
                <div className="performancegraphpharmacy">
                    <Line options={options} data={data} className="linechart"/>;

                </div>
            </div>
            <div className="subsec2pharmacy">
                
                <h2 className="booktitledivpharmacy">Medicines Sold Today</h2>
                <div className="bookdiv10">

                    <div id='headpharmacy' className="pharmacyinfo">
                        <h3>Medicine Name</h3>
                        <h3>Quantity</h3>
                        <h3>Price</h3>
                    </div>
                    <div id="contentinfopharmacy">
                    {!order_list.length>0&&
    <div className="inventorycontent">
                    <h6 classname="nolowmed">No medicines sold today</h6>
                    </div>
}
{order_list.map((i,index)=>{return(<>
                        <div className="pharmacyinfo pharmacycontent">
                            <h3>{i.buyer_name}</h3>
                            <h3>Rs {i.amount}</h3>
<h3>

                            {i.items.map((item,ind)=>{return(<>
                                                        {item.name}
                            <br/>
                                                        
                            </>)})}
                            </h3>
                            <h3>

                            {i.items.map((item,ind)=>{return(<>
                                                        {item.quantity}
                            <br/>
                                                        
                            </>)})}
                            </h3>

                        </div>

</>)})}
                    </div>

                </div>
                <h2 className="booktitledivpharmacy">Last Transaction</h2>
                <div className="bookdiv3">
{last_transact&&
                    <div>
                        <div>
                            <img src={Trans}></img>
                            <div>
                                <h2>{last_transact.buyer_name}</h2>
                                <h3>{last_transact.date}</h3>
                                <h4>Rs {last_transact.amount?last_transact.amount:0}</h4>
                            </div>
                        </div>
                        <div>
{last_transact.items.map((i,index)=>{return(<>
                            <div><h5>{i.name}</h5><h5>{i.quantity}</h5></div>
</>)})}


                        </div>
                    </div>
}
                </div>
                <h2 className="booktitledivpharmacy">Low Inventory</h2>
                <div className="bookdiv5">
                    <div id='headinventory'>
                        <h3>Medicine Name</h3>
                        <h3>Quantity</h3>

                    </div>
                    <div id="inventorycontentdiv">
{medicine_list.map((item,index)=>{return(<>
                        <div className="inventorycontent">
                            <h6>{item.name}</h6>
                            <h6>{item.quantity}</h6>
                        </div>


</>)})}
{!medicine_list.length>0&&
    <div className="inventorycontent">
                    <h6 classname="nolowmed">No medicines below 5 units</h6>
                    </div>
}

                    </div>
                </div>
            </div>
        </div>

      </>
}


{(tab==='Medicines') && 
      <>
<Medicines/>
      </>
}

{(tab==='Transactions') && 
<Transactions stock="Medicine" class="pharmacy"/>
}

{(tab==='Orders') && 
<Orders></Orders>
}

{(tab==='Profile')&&
<Profilepharmacy/>
}





    </div>

</div>
</div>
</>
)
}

export default Dashboardpharmacy;