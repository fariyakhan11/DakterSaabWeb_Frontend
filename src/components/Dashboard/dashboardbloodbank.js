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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import {  
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
  } from 'chart.js';

  import { Bar } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );


function Dashboardbloodbank(){
    const currentDate = new Date()
    const [expandedstate,setexpandedstate]=useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [tab, settab]=useState('Home');
 
    const [bloodsold,settodaybloodsold]=useState([]);
    const [last_transact,setlast_transact]=useState({date:'',buyer_name:'',amount:'',items:[{name:'',quantity:''}]});
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Sales This Week',
          },
        },
      };
      const optionsweek = {
        // The `legend` configuration to position the labels on the side
        labels: {
          position: 'right',
          labels: {
            boxWidth: 6, // Adjust the box width for the colored squares next to the labels
          },
        },
      };
  
      const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      const [dataweek,setdataweek]=useState({
        labels,
        datasets: [
            {
              label: 'Component A',
              data: [15000, 20000, 22000, 18000, 25000, 28000],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            
          ],
      })
     
    const  data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }; 
      
      


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

function fetchtodaymedsold(){
  try{
      const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
      const api='http://localhost:5000/api/pharmacy/todaymedsold/'+params;
      fetch(api, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      }).then((response) => response.json()) // get response, convert to json
      .then((json) => {

          settodaybloodsold(json.bloodsold)
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

useEffect(()=>{
    sessionStorage.setItem('org_name', 'Hussani Blood Bank');
    sessionStorage.setItem('org_address', 'Soldier Bazaar Parsi Colony Saddar, Karachi, Sindh, Pakistan');
},[])
return(

<>

<div id="dashboardcontainer">

<Sidenavbloodbank msg={handlestate} />
    <div id="dashboardarea">

            <div className="infoareadashboard">
{(tab==='Home') && 
            <>
                <div className="section1">
                    <div className="subsec1blood">
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
                        
                        <div className="performancegraphbloodbank">
                        <Bar
                            data={dataweek}
                            options={options}
                        />
                        </div>
                    </div>
                    <div className="subsec2bloodbank">
                        

                        <div className="bookdiv">
                        <h2 className="booktitledivbloodbank">Sales Today</h2>
                            <Pie data={data} options={optionsweek}/>;
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
                                
                                <h4>Rs {last_transact.amount?last_transact.amount:0}</h4>
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