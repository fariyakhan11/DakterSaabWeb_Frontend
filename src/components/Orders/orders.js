import React from "react";
import './orders.css';
import {FiPackage} from "react-icons/fi";
import { useState,useEffect } from "react";
import {AiFillCaretDown} from "react-icons/ai";
import {GrTransaction} from "react-icons/gr";
import {BsCalendar2Date} from "react-icons/bs";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Orders(){
    var currentDate = new Date()
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState('');
    const [filters,setfilters]=useState({time:''});
    const [order_list,setorder_list]=useState([]);
    const [displayed_list,setdisplayed_list]=useState([])

    const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

//fetch departments from the database
function fetchorders(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/order/getorders/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.order){
          setorder_list(json.order);
          setdisplayed_list(json.order);
        }else{setorder_list([]);setdisplayed_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

useEffect(()=>{
    fetchorders()
},[])

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
//data filter toggle on/off
const handledatefilter = (e) => {
  var currentDate = new Date(); // Get the current date

  if (!filters.time) {
    e.target.classList.add('activetogglebtn');
    e.target.classList.remove('idletogglebtn');
    document.getElementById('togglebtndiv').style.justifyContent = 'flex-end';
    setSelectedDate(currentDate.toISOString().split('T')[0]); // Set selectedDate to current date
    setfilters((prevdata) => ({ ...prevdata, time: currentDate }));
  
  } else {
    e.target.classList.add('idletogglebtn');
    e.target.classList.remove('activetogglebtn');
    document.getElementById('togglebtndiv').style.justifyContent = 'flex-start';
    setSelectedDate('');
    setfilters((prevdata) => ({ ...prevdata, time: '' }));
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

return(
<>
        <div id="Ordersdashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">Our Orders</h3>
                    <hr/>
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
                            <div className="order_container" id={index}>
                                <FiPackage className="tabsicon Order_symbol" id={index}/>
                                <h2 className="order_title" id={index}>{i.buyer_name}</h2>
                                <div className="expand_icon" onClick={orderdetailhandler} id={index}>
                                    <AiFillCaretDown className="tabsicon " id={index}/>
                                </div>
                                <h2 className="order_date" id={index}>{i.date}</h2>
                                <h2 className="status" id={index}>Pending</h2>
                                <GrTransaction  className="tabsicon transact_icon" id={index}/>
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
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                                className='searchorder'
                                />
                            <div id="datesearch">
                                <h6>Search by Date: </h6>
                                <div id="togglebtndiv"><div id="togglebtncircle" className="idletogglebtn" onClick={handledatefilter}></div></div>
                            </div>

                            
                            <input type="date" id="datepicker" className="calendar-containerfilter" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}></input>                                

                            <h6>Order Status:</h6>
                                <h5 className="selectedstatus">All</h5>
                                <h5>Pending</h5>
                                <h5>Delivered</h5>  
                        </div>
                    </div>
                </div>
            </div>

        </div>
</>
)
}
export default Orders;