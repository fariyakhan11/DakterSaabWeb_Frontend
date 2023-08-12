import React from "react";
import './profilepharmacy.css';
import PharmP from '../../images/drugs1.png'
import { useState,useEffect } from "react";
import validator from "validator";
import EditP from '../../images/edit1.png'

function Profilepharmacy(){
    const [edit_view, set_edit_view] = useState(false);
    const [pharmacyinfo,setpharmacyinfo]=useState({pharmacyname:'',email:'',phone:'',address:'',time:{open:'',close:''},password:''})

useEffect(()=>{
    enterdetails()

},[])

function enterdetails(){
    
    
    setpharmacyinfo({pharmacyname:sessionStorage.getItem('org_name'),email:sessionStorage.getItem('email'),phone:sessionStorage.getItem('phone'),address:sessionStorage.getItem('org_address'),password:sessionStorage.getItem('password'),time:sessionStorage.getItem('time')})

}

useEffect(()=>{console.log(pharmacyinfo)},[pharmacyinfo])

const handleinput=(e)=>{
        if (e.target.name === 'email') {
            if (!validator.isEmail(e.target.value)) {
                document.getElementById('emailerr').style.display="block";
            }
            else { 
                document.getElementById('emailerr').style.display="none";
                setpharmacyinfo((prev) => ({
                    ...prev,
                    email:e.target.value
                }))
             }
        }

        else if (e.target.name ==='name'){
            const name_expression =/^[A-Za-z]+$/;
            if((name_expression.test(e.target.value[0]))){
                document.getElementById('nameerr').style.display="none";
                    setpharmacyinfo((prev) => ({
                    ...prev,
                    pharmacyname:e.target.value
                }))
            }
            else{
                document.getElementById('nameerr').style.display="block";
            }
        }
        else if (e.target.name === 'password') {

            if (!(e.target.value.length > 7)) {
                document.getElementById('pwerr').textContent="Password is too short";
                document.getElementById('pwerr').style.display="block";
            }
            else {
                document.getElementById('pwerr').style.display="none";
                    setpharmacyinfo((prev) => ({
                    ...prev,
                    password:e.target.value
                }))
            }
        }
        else if (e.target.name ==='address'){
            const name_expression =/^[A-Za-z]+$/;
            if((name_expression.test(e.target.value[0]))){
                document.getElementById('addresserr').style.display="none";
                    setpharmacyinfo((prev) => ({
                    ...prev,
                    address:e.target.value
                }))
            }
            else{
                document.getElementById('addresserr').style.display="block";
            }
        }
        else if (e.target.name === 'time') {
            if (e.target.id === 'open') {
                setpharmacyinfo((prev) => ({
                ...prev,
                time: {
                    ...prev.time,
                    open: e.target.value
                }
                }));
            } else if (e.target.id === 'close') {
                setpharmacyinfo((prev) => ({
                ...prev,
                time: {
                    ...prev.time,
                    close: e.target.value
                }
                }));
            }
        }
        else{
            setpharmacyinfo((prev) => ({
            ...prev,
            [e.target.name]:e.target.value
            }))

        }
}

const editformsubmit = async () => {
    try {
        const api = 'http://localhost:5000/api/pharmacy/update';
        const data = {
            old_name: sessionStorage.getItem('org_name'),
            old_address: sessionStorage.getItem('org_address'),
            pharmacyinfo: pharmacyinfo
        };

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 200) {
            const jsonData = await response.json();
            console.log('Response data:', jsonData);

            // Update session storage with the updated data
            sessionStorage.setItem('org_name', jsonData.pharmacy.pharmacyname);
            sessionStorage.setItem('org_address', jsonData.pharmacy.address);
            sessionStorage.setItem('phone', jsonData.pharmacy.phone);
            sessionStorage.setItem('email', jsonData.pharmacy.email);
            sessionStorage.setItem('time', jsonData.pharmacy.time);

            // Close the edit form after successful update
            set_edit_view(false);

            alert('Pharmacy updated successfully');
        } else if (response.status === 430) {
            const errorData = await response.json();
            console.log('Error response:', errorData);
            alert(errorData.error);
        } else {
            console.log('Problem updating Pharmacy');
            alert('Problem updating Pharmacy');
        }
    } catch (err) {
        console.error(err);
    }
};
return(
<>
        <div id="Profilepharmacydashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">My Profile</h3>
                    <hr/>

                <div id="profiledivpharmacy">
                    <div>
                        <div id="boldinfodivpharmacy">
                            <div id="profimgdivpharmacy">
                                <div><img src={PharmP}></img></div>
                            </div>
{edit_view&&
                            <div id="maincontentdivpharmacy">

                                <div id="Namediv">
                                    <div>
                                        <h6 id="nameerr">Name cannot contain special characters or numbers</h6>
                                        <input type='text' placeholder="Enter Name" value={pharmacyinfo.pharmacyname} onChange={handleinput} name="name"/>
                                    </div>
                                </div>
                                <div id="Addressdiv">
    <div>
        <h6 id="addresserr">Address cannot be empty</h6>
        <input
            type='text'
            placeholder="Enter Address"
            value={pharmacyinfo.address}
            onChange={handleinput}
            name="address" // Fix the typo here
        />
    </div>
</div>

                                <div id="Phonediv">
                                    <div>
                                    <   input  value={pharmacyinfo.phone} onChange={handleinput} name="phone" type="number" minLength={10} placeholder="3** *******" />
                                    </div>
                                </div>


                            </div>
}
{!edit_view&&
                            <div id="maincontentdivpharmacy">
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
                            <div id="editsectionpharmacy">
                                <div id="editstock" className="stockoperation" onClick={()=>{set_edit_view(true)}}>
                                    <div id="editMedicinespharmacy" className="stockopiconmedicine">
                                    <img src={EditP}></img>
                                    </div>
                                    <div className="stockoptitle"><h4>Edit Information</h4></div>
                                </div>
                            </div>
                        </div>
{edit_view&&
                        <div id="profinfodivpharmacy">
                            <h6 id='pwerr'>Password is too short</h6>
                            <div id="Passworddiv">
                                <h1>Password:</h1>
                                <input value={pharmacyinfo.password} onChange={handleinput} name="password" minLength={8} type="password" placeholder="Enter password"/>
                            </div>
                            <h6 id="emailerr">Email is not valid</h6>
                            <div id="Emaildiv">
                                
                                <h1>Email:</h1>
                                <input type="email" placeholder="Enter Email" value={pharmacyinfo.email} onChange={handleinput} name="email"/>
                            </div>

                            <h6 id="timeerr">Time cannot be empty</h6>
                            <div id="Timediv">
                                
                                    <h1>Timings:</h1>
                                
                                <div>
                                
                                        
                                        <input className="timingseditpharmacy" type="time" name="time" id="open" onChange={handleinput}/><h5>to</h5>
                                        <input className="timingseditpharmacy" type="time" name="time" id="close" onChange={handleinput}/>
                                    
                                </div>
                            </div>
 
         
                        </div>
}
{!edit_view&&
                        <div id="profinfodivpharmacy">
                            <div id="Passworddiv">
                                <h1>Password:</h1>
                                <h2>{sessionStorage.getItem('password')}</h2>
                            </div>
                            <div id="Emaildiv">
                                <h1>Email:</h1>
                                <h2>{sessionStorage.getItem('email')}</h2>
                            </div>
                            <div id="Timediv">
                                <h1>Timings:</h1>
                                <h2>{sessionStorage.getItem('time')}</h2>
                            </div>
                        </div>
}
                    </div>
{edit_view&&
                    <div>

                        <button  id="profcancel" onClick={()=>{set_edit_view(false)}}>Cancel</button>
                        <button onClick={editformsubmit}>Submit</button>
                    </div>
}
                </div>
            </div>
        </div>
</>
)
}
export default Profilepharmacy;