import React from "react";
import './profilehospital.css';
import HospitalP from '../../images/hospital1.png'
import { useState,useEffect } from "react";
import validator from "validator";
import EditP from '../../images/edit1.png'

function Profilehospital(){
    const [edit_view, set_edit_view] = useState(false);
    const [hospitalinfo,sethospitalinfo]=useState({name:'',email:'',phone:'',address:'',time:{open:'',close:''},password:''})

useEffect(()=>{
    enterdetails()

},[])

function enterdetails(){
    
    
    sethospitalinfo({name:sessionStorage.getItem('org_name'),email:sessionStorage.getItem('email'),phone:sessionStorage.getItem('phone'),address:sessionStorage.getItem('org_address'),password:sessionStorage.getItem('password'),time:sessionStorage.getItem('time')})

}

useEffect(()=>{console.log(hospitalinfo)},[hospitalinfo])

const handleinput=(e)=>{
        if (e.target.name === 'email') {
            if (!validator.isEmail(e.target.value)) {
                document.getElementById('emailerr').style.display="block";
            }
            else { 
                document.getElementById('emailerr').style.display="none";
                sethospitalinfo((prev) => ({
                    ...prev,
                    email:e.target.value
                }))
             }
        }

        else if (e.target.name ==='name'){
            const name_expression =/^[A-Za-z]+$/;
            if((name_expression.test(e.target.value[0]))){
                document.getElementById('nameerr').style.display="none";
                    sethospitalinfo((prev) => ({
                    ...prev,
                    name:e.target.value
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
                    sethospitalinfo((prev) => ({
                    ...prev,
                    password:e.target.value
                }))
            }
        }
        else if (e.target.name ==='address'){
            const name_expression =/^[A-Za-z]+$/;
            if((name_expression.test(e.target.value[0]))){
                document.getElementById('addresserr').style.display="none";
                    sethospitalinfo((prev) => ({
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
                sethospitalinfo((prev) => ({
                ...prev,
                time: {
                    ...prev.time,
                    open: e.target.value
                }
                }));
            } else if (e.target.id === 'close') {
                sethospitalinfo((prev) => ({
                ...prev,
                time: {
                    ...prev.time,
                    close: e.target.value
                }
                }));
            }
        }
        else{
            sethospitalinfo((prev) => ({
            ...prev,
            [e.target.name]:e.target.value
            }))

        }
}

const editformsubmit=()=>{
        try{

        const api='http://localhost:5000/api/hospital/update';
        let data={old_name:sessionStorage.getItem('org_name'),old_address:sessionStorage.getItem('org_address'),hospitalinfo:hospitalinfo}
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
                if (res.status === 200) {
                    alert('Hospital updated successfully')
                    res.json().then(data => {
                        console.log('doc is ',data.hospital)
                        sessionStorage.setItem('org_name',data.hospital.name)
                        sessionStorage.setItem('org_address',data.hospital.address)
                        sessionStorage.setItem('phone',data.hospital.phone)
                        sessionStorage.setItem('email',data.hospital.email)
                        sessionStorage.setItem('time',data.hospital.time)
                    })

                    enterdetails()
                }
                else if (res.status === 430) { alert(res.error) }

                else {  alert('Problem updating Hospital', res.error) }
            });
    }catch(err){
        console.log(err);
    }
}
return(
<>
        <div id="Profilehospitaldashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">My Profile</h3>
                    <hr/>

                <div id="profiledivhospital">
                    <div>
                        <div id="boldinfodivhospital">
                            <div id="profimgdivhospital">
                                <div><img src={HospitalP}></img></div>
                            </div>
{edit_view&&
                            <div id="maincontentdivhospital">

                                <div id="Namediv">
                                    <div>
                                        <h6 id="nameerr">Name cannot contain special characters or numbers</h6>
                                        <input type='text' placeholder="Enter Name" value={hospitalinfo.name} onChange={handleinput} name="name"/>
                                    </div>
                                </div>
                                <div id="Addressdiv">
                                    <div>
                                        <h6 id="addresserr">Address cannot be empty</h6>
                                        <input type='text' placeholder="Enter Address" value={hospitalinfo.address} onChange={handleinput} name="adddress"/>
                                    </div>
                                </div>
                                <div id="Phonediv">
                                    <div>
                                    <   input  value={hospitalinfo.phone} onChange={handleinput} name="phone" type="number" minLength={10} placeholder="3** *******" />
                                    </div>
                                </div>


                            </div>
}
{!edit_view&&
                            <div id="maincontentdivhospital">
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
                            <div id="editsectionhospital">
                                <div id="editstock" className="stockoperation" onClick={()=>{set_edit_view(true)}}>
                                    <div id="editMedicineshospital" className="stockopiconmedicine">
                                    <img src={EditP}></img>
                                    </div>
                                    <div className="stockoptitle"><h4>Edit Information</h4></div>
                                </div>
                            </div>
                        </div>
{edit_view&&
                        <div id="profinfodivhospital">
                            <h6 id='pwerr'>Password is too short</h6>
                            <div id="Passworddiv">
                                <h1>Password:</h1>
                                <input value={hospitalinfo.password} onChange={handleinput} name="password" minLength={8} type="password" placeholder="Enter password"/>
                            </div>
                            <h6 id="emailerr">Email is not valid</h6>
                            <div id="Emaildiv">
                                <h1>Email:</h1>

                                    <input type="email" placeholder="Enter Email" value={hospitalinfo.email} onChange={handleinput} name="email"/>
                                
                            </div>

                            <h6 id="timeerr">Time cannot be empty</h6>
                            <div id="Timediv">
                                    <h1>Timings:</h1>
                                
                                <div>
                                
                                        
                                        <input className="timingsedit" type="time" name="time" id="open" onChange={handleinput}/><h5>to</h5>
                                        <input className="timingsedit" type="time" name="time" id="close" onChange={handleinput}/>
                                    
                                </div>
                            </div>
 
         
                        </div>
}
{!edit_view&&
                        <div id="profinfodivhospital">
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
export default Profilehospital;