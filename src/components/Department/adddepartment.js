import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import {GrHelp} from "react-icons/gr";
import Papa from "papaparse";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Adddepartment({close}){
//input values of the form
 const [data,setdata]=useState({name:'',admin_name:'',phone:'',password:'',repw:''})
    const [showPassword, setShowPassword] = useState(false);

//to handle the input values
const inputhandler=(e)=>{

    const name_expression =/^[A-Za-z]+$/;
    if(e.target.name==='name'){
        if(name_expression.test(e.target.value[0])){
            document.getElementById('name').style.borderBottomColor='#294f96';
        }
        else{
            document.getElementById('name').style.borderBottomColor='red';
        }
    }
    else if(e.target.name==='admin_name'){
        if(e.target.value===''){
            document.getElementById('nameerr').style.display='block';
        }
        else if(name_expression.test(e.target.value[0])){
            
            document.getElementById('nameerr').style.display='none';
        }
        else{
            
            document.getElementById('nameerr').style.display='block';
        }
    }
    else if (e.target.name === 'password') {

        if (!(e.target.value.length > 7)) {
            document.getElementById('pwerr').textContent="Password is too short";
            document.getElementById('pwerr').style.display="block";
        }
        else {
            document.getElementById('pwerr').style.display="none";
        }
    }
    else if (e.target.name === 'phone') {

        if ((e.target.value.length > 11)) {
            document.getElementById('phoneerr').textContent="Please enter valid phone number ";
            document.getElementById('phoneerr').style.display="block";
        }
        else {
            document.getElementById('phoneerr').style.display="none";
        }
    }
    else if (e.target.name==='repw'){
        if(!(document.getElementById('password').value===e.target.value)){
            document.getElementById('pwerr').textContent="Passwords dont match";
            document.getElementById('pwerr').style.display="block";
        }
        else{
            document.getElementById('pwerr').style.display="none";
        }
    }
    setdata((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value
    }));
    
  
}

//to show the value of the password input
    const togglePasswordVisibility = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword);
    };

function checkerror(){
    let e=document.getElementsByClassName('inputerror');
    for (var i=0;i<e.length;i++){
        if(e[i].style.display!='none'){
            return 1
        }
    }
    return 0
}
//to check whether to on the submit btn or not 
function disablebtn(){
    var d=1;
    if(data.name!=''&&data.admin_name!=''&&data.password!=''&&data.phone!=''&&data.repw!=''){
        d=0
    }
    if(d||checkerror()){
        document.getElementById('btndiv').classList.add('disablebtn');
    }
    else{
        document.getElementById('btndiv').classList.remove('disablebtn');
    }
}

useEffect(()=>{
disablebtn()
})
//to submit add department values
const submitadddep=(e)=>{
    e.preventDefault();
    try{

        const api='http://localhost:5000/api/hospital/adddep';
        let datasending={org_name:sessionStorage.getItem('org_name'),org_address:sessionStorage.getItem('org_address'),depinfo:data}
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datasending)
        }).then(res => {
                if (res.status === 200) {
                    
                    setdata([{name:'',admin_name:'',phone:'',password:'',repw:''}]);                   
                    var btn = document.getElementById('closebtn');
                    btn.click();
                }
                else if (res.status === 430) { alert(res.error) }

                else {  alert('Problem adding department', res.error) }
            });
    }catch(err){
        console.log(err);
    }
}
return(
<>
<div className="grayarea">
    <div id="addmed_container">
        <div id="topbarmedshospital">
            <h1>Add Department Information</h1>
            <div id="closebtn" onClick={()=>{close(true)}} ><h2>+</h2></div>
        </div>
        <div id="addmeds_area">
            <div id="addmedcontenthospital">
                <div id="depheading">
                    <label htmlFor="name">Department Name: </label>
                    <input type="text" name="name" value={data.name} onChange={inputhandler} id="name"/>
                </div>
                <div id="depcontent">

                    <div className="dep-info-field">
                    <h6 className="inputerror" id='nameerr'>Please enter valid name</h6>
                        <label htmlFor="admin_name">Admin Name: </label>
                        <input type="text" name="admin_name" id='admin_name' onChange={inputhandler} value={data.admin_name}/>
                    </div>

                    <div className="dep-info-field">
                    <h6 className="inputerror" id='phoneerr'>Phone Number cannot be empty</h6>
                        <label htmlFor="phone">Phone Number: </label>
                        <input type="number" name="phone" id='phone' onChange={inputhandler} value={data.phone} placeholder="3** *******"/>
                    </div>

                    <div className="dep-info-field">
                        <label htmlFor="password">Password: </label>
                        <input  name="password" id='password' onChange={inputhandler} value={data.password} minLength={8} type={showPassword ? "text" : "password"}/>
                        <button onClick={togglePasswordVisibility} id="showpw">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <h6  className="inputerror" id='pwerr'>Passwords donot match</h6>
                    <div className="dep-info-field">
                        <label htmlFor="repw">Retype Password: </label>
                        <input type="password" name="repw" id='repw' onChange={inputhandler} value={data.repw} />
                    </div>
                    <div id="btndiv">
                        <button className="depsubmit" onClick={submitadddep}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</>
)
}
export default Adddepartment;