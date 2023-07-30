import React from "react";
import './transactions.css';
import { useEffect,useState } from "react";
import DropP from '../../images/arrow-down.png'
import Med from '../../images/drugs1.png';
import Week from '../../images/week.png';
import Profit from '../../images/profits.png'
import Bloodimg from '../../images/blood.png'
import BloodGroup from '../../images/bloodgroup.png'

function Transactionhistory({close,message}){
    const [transactionhistory,settransactionhistory]=useState([])

function fetchtransactioninfo(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/transactionandorder/gettransactions/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.history){
          
          settransactionhistory(json.history);
        }else{settransactionhistory([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}
useEffect(()=>{
fetchtransactioninfo()
},[])

const opendetailtransact=(e)=>{
    var id=parseInt(e.target.id)
    if(document.getElementById(id+'detail').style.display==="block"){
        document.getElementById(id+'detail').style.display="none";
        e.target.style.rotate="0deg";
    }
    else{
        document.getElementById(id+'detail').style.display="block";
        e.target.style.rotate="180deg";
    }

    

}


return(
<>
<div id="transactionhistorygrayarea">
    
    <div id="transactionhistory">
        <div id="transactionhistoryheader">
            <div id="thheading"><h1>Transaction History</h1></div>
            <div id="closebtnhistory" onClick={()=>{close(true)}}><h2>+</h2></div>
        </div>
        <div id="transactionhistorycontent">
<div>
                            <div id="statisticsdiv">
{(message==='blood')&&
                                <div className="summarytilesbloodbank">
                                    <img src={Bloodimg}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Blood units sold</h3>
                                        <h2 className="tilevalue">292</h2>
                                    </div>
                                </div>
}
{(message==='pharmacy')&&
                                <div className="summarytilesbloodbank">
                                    <img src={Med}></img>

                                    <div>
                                        <h3 className="tilename">Today <br/> Medicines sold</h3>
                                        <h2 className="tilevalue">292</h2>
                                    </div>
                                </div>
}
                                <div className="summarytilesbloodbank">
                                    <img src={Week}></img>
                                    <div>
                                        <h3 className="tilename">This Week<br/> Sales(Rupees)</h3>
                                        <h2 className="tilevalue">8330</h2>
                                    </div>
                                </div> 
                                <div className="summarytilesbloodbank">
                                    <img src={Profit}></img>
                                    <div>
                                        <h3 className="tilename">Today <br/> Sales(Rupees)</h3>
                                        <h2 className="tilevalue">1092</h2>
                                    </div>
                                </div>
{(message==='blood')&&
                                 <div className="summarytilesbloodbank">
                                    <img src={BloodGroup}></img>
                                    <div>
                                        <h3 className="tilename">Popular<br/> Blood group</h3>
                                        <h2 className="tilevalue">O+</h2>
                                    </div>
                                </div>      
}                                
                            </div>
</div>

            <div>
            {transactionhistory.map((i,index)=>{
                return(<>
                    <div className="historydiv">
                        <div className="circlehistoryno"><h1>{index+1}</h1></div>
                        <h3>Date: {'  '+i.date}</h3>
                        <h3>Customer Name: {'  '+i.buyer_name}</h3>
                        <h3>Total Amount: {'  '+i.amount}</h3>
                        <div className="transacthistorydetail" id={index} onClick={opendetailtransact}><img id={index} src={DropP}></img></div>
                    </div>
                    <div id={index+'detail'} className="historydetail">
                        <div className="historydetaillabel">
                            <h3>Name</h3>
                            <h3>Quantity</h3>
                            <h3>Price</h3>
                        </div>
                    {i.items.map((item,ind)=>{return(<>
                            <div id={ind+'historydetaildiv'} className="historydetaildiv">
                                <h3>{item.name}</h3>
                                <h3>{item.quantity}</h3>
                                <h3>{item.price}</h3>
                            </div>
                    </>)})}
                    </div>
                </>)
            })}
            </div>
        </div>
    </div>
</div>
</>
)
}
export default Transactionhistory;