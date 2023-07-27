import React from "react";
import './profilebloodbank.css';
import BloodP from '../../images/blood1.png'
import { useState,useEffect } from "react";


function Profilebloodbank(){
    const [edit_view, set_edit_view] = useState(false);
    const [bloodbankinfo,setbloodbankinfo]=useState({name:'',email:'',phone:'',address:'',time:[{day:'Monday',timing:''},{day:'Tuesday',timing:''},{day:'Wednesday',timing:''},{day:'Thursday',timing:''},{day:'Friday',timing:''},{day:'Saturday',timing:''},{day:'Sunday',timing:''}],password:'',feedback:[]})

return(
<>
        <div id="Profilebloodbankdashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">My Profile</h3>
                    <hr/>

                <div id="profilediv">
                    <div>
                        <div id="boldinfodiv">
                            <div id="profimgdiv">
                                <div><img src={BloodP}></img></div>
                            </div>
{edit_view&&
                            <div id="maincontentdiv">

                                <div id="Namediv">
                                    <div>
                                        <h6 id="nameerr">Name cannot contain special characters or numbers</h6>
                                        <input type='text' placeholder="Enter Name" value={bloodbankinfo.name} onChange={handleinput} name="name"/>
                                    </div>
                                </div>
                                <div id="Addressdiv">
                                    <div>
                                        <h6 id="addresserr">Address cannot be empty</h6>
                                        <input type='text' placeholder="Enter Address" value={bloodbankinfo.address} onChange={handleinput} name="adddress"/>
                                    </div>
                                </div>
                                <div id="Phonediv">
                                    <div>
                                    <   input  value={bloodbankinfo.phone} onChange={handleinput} name="phone" type="number" minLength={10} placeholder="3** *******" />
                                    </div>
                                </div>


                            </div>
}
{!edit_view&&
                            <div id="maincontentdiv">
                                <div id="Namediv">
                                <h2>{sessionStorage.getItem('org_name')}</h2>
                                </div>
                                <div id="Addressdiv">
                                <h2>{sessionStorage.getItem('org_address')}</h2>
                                </div>
                                <div id="Phonediv">
                                <h2>{sessionStorage.getItem('phone')}</h2>
                                </div>
                            </div>
}
                            <div id="editsection">
                                <div id="editstock" className="stockoperation" onClick={()=>{set_edit_view(true)}}>
                                    <div id="editMedicines" className="stockopiconmedicine">
                                    <img src={EditP}></img>
                                    </div>
                                    <div className="stockoptitle"><h4>Edit Information</h4></div>
                                </div>
                            </div>
                        </div>
{edit_view&&
                        <div id="profinfodiv">
                            <h6 id='pwerr'>Password is too short</h6>
                            <div id="Passworddiv">
                                <h1>Password:</h1>
                                <input value={bloodbankinfo.password} onChange={handleinput} name="password" minLength={8} type="password" placeholder="Enter password"/>
                            </div>
                            <h6 id="emailerr">Email is not valid</h6>
                            <div id="Emaildiv">
                                <div>

                                    <input type="email" placeholder="Enter Email" value={bloodbankinfo.email} onChange={handleinput} name="email"/>
                                </div>
                            </div>

                            <h6 id="timeerr">Time cannot be empty</h6>
                            <div id="Timediv">
                                <div>
                                    <h1> Day and Time:</h1>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
{bloodbankinfo.time.map((i,index)=>{return(<>
                            <div id="Timediv">

                                <div>
                                    <h1>{i.day}</h1>    
                                </div>

                                <div>
                                    <input value={i.timing} onChange={handleinput} name="time" type="text" id={index} placeholder="Enter timing"/>
                                </div>
                            </div>  
</>)})}
 
         
                        </div>
}
{!edit_view&&
                        <div id="profinfodiv">
                            <div id="Passworddiv">
                                <h1>Password:</h1>
                                <h2>{sessionStorage.getItem('password')}</h2>
                            </div>
                            <div id="Emaildiv">
                                <h1>Password:</h1>
                                <h2>{sessionStorage.getItem('email')}</h2>
                            </div>
                            <div id="Timediv">
                            <h1>Hospitals:</h1>

                            <h2></h2>
                            </div>
{bloodbankinfo.time.map((i,index)=>{return(<>
                            <div id="Timediv">

                                <h1>{i.day}</h1>    

                                <h2>{i.timing}</h2>
                                
                            </div>  
</>)})}
                        </div>
}
                    </div>
{edit_view&&
                    <div>

                        <button onClick={()=>{set_edit_view(false)}}>Cancel</button>
                        <button onClick={editformsubmit}>Submit</button>
                    </div>
}
                </div>
            </div>
        </div>
</>
)
}
export default Profilebloodbank;