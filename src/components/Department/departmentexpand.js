import React from "react";
import './department.css';
import { useState,useEffect } from "react";
import EditP from '../../images/edit1.png'
import DocP from '../../images/doctor1.png'
import PatientI from '../../images/patient1.png'
import socketIOClient from 'socket.io-client';

function Departmentexpand({close,department}){
    const [currentday,setcurrentday]=useState(new Date())
    
    const [Department,setDepartment]=useState(department)
    const [dep,setdep]=useState({name:Department.name,admin_name:Department.admin_name,password:'........',phone:Department.phone,changepw:0})
    const [searchdoctor,setsearchdoctor]= useState('')
    const [doctor_list,setdoctor_list]=useState([]);
    const [appointment_list,setappointment_list]=useState([]);
    const [currentToken,setcurrentToken]=useState([{name:'',appointment:{}}]);
    const [displayed_listdoctor,setdisplayed_listdoctor]=useState([])
    const [nav,setnav]=useState('App')
    const[editview,set_edit_view]=useState(false)
    const [maxToken,setmaxToken]=useState(0)
    


    const serverUrl = 'http://localhost:5000'; // Your server URL
    // Get the day information for each date
const options = { weekday: 'long' };

//initial tasks on page load
useEffect(()=>{
  // Connect to the server's socket.io
  const socket = socketIOClient(serverUrl);
  
  },[])

//fetch doctors from the database
function fetchdoctors(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/hospital/getdoctors/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.doctors){
            
            var doc=json.doctors.filter(h=>h.Department===Department.name)
            console.log('all dep drs are',doc)

            
          setdoctor_list(doc);
        
        }else{setdoctor_list([]);}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

function filternowdoctor(doctorsArray){
    const now = new Date();
const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
setcurrentday(currentDay)
const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const availableDoctors = doctorsArray.filter(doctor => {
    const availability = doctor.availability.find(slot => slot.day === currentDay);
    if (availability) {
        const [startHour, startMinute] = availability.time[0].split(':');
        const [currentHour, currentMinute] = currentTime.split(':');
        const startTimestamp = parseInt(startHour) * 60 + parseInt(startMinute);
        const currentTimestamp = parseInt(currentHour) * 60 + parseInt(currentMinute);

        return currentTimestamp >= startTimestamp;
    }
    return false;
});
    return availableDoctors
}

useEffect(()=>{
    
const availableDoctors=filternowdoctor(doctor_list)
console.log('Available Doctors:', availableDoctors);
            setdisplayed_listdoctor(availableDoctors)
},[doctor_list])

const editformsubmit=()=>{
        try{
        console.log('here')
        const api='http://localhost:5000/api/hospital/updatedep';
        let data={old_name:Department.name,org_name:sessionStorage.getItem('org_name'),org_address:sessionStorage.getItem('org_address'),depinfo:dep}
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
                if (res.status === 200) {
                    alert('Department updated successfully')
                    res.json().then(data => {
                        setDepartment(data.department)
                        setdep(data.department)
                    })

                    
                    document.getElementById('profcancel').click()
                }
                else if (res.status === 430) { alert(res.error) }

                else {  alert('Problem updating department', res.error) }
            });
    }catch(err){
        console.log(err);
    }
}

const handleinput=(e)=>{
const { name, value } = e.target;
    
      
      setdep((prevViewdoc) => ({
        ...prevViewdoc,
        [name]: value,
      }));
      if(name==='password'){
        setdep((prevViewdoc) => ({
            ...prevViewdoc,
            ['changepw']: 1,
          }));        
      }
}

useEffect(()=>{

    if(nav==='App'){
        getpatients()
        fetchdoctors()
    }
    else if(nav==='Prof'){

    }
    else if(nav==='Doc'){
        fetchdoctors()
    }

},[nav])

useEffect(()=>{
if(appointment_list.length>0&&nav==='App'){
    var den=[]
    displayed_listdoctor.forEach(d=>{
        var f=appointment_list.filter(app=>app.doctorName===d.Name).sort((a,b)=>a.tokenNumber -b.tokenNumber)
        if(f.length){
        den.push({name:d.Name,appointment:f[0]})
        }
        else{
            alert('no appointment for this doctor')
        }
    }
    )
    currentToken(den)
}
},[displayed_listdoctor])

const handleSearchdoctor = (e)=>{
    setsearchdoctor(e.target.value)
    
}
  
useEffect(()=>{
setdisplayed_listdoctor(doctor_list)
var d=doctor_list
if(searchdoctor!=''){
    const filteredDoctors = d.filter((doctor) =>
    doctor.Name.toLowerCase().includes(searchdoctor.toLowerCase())
    );
    d=filteredDoctors;
}
setdisplayed_listdoctor(d)
},[searchdoctor])

function getpatients(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')+'/'+Department.name;
        const api='http://localhost:5000/api/hospital/getpatients/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.appointments){
            var b=json.appointments.sort((a,b)=>a.tokenNumber - b.tokenNumber)
          setappointment_list(b)

        }else{setappointment_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

const increasetoken=(e)=>{
    var app=appointment_list.filter(app=>app.doctorName===e.target.id)
    var f=app.indexOf(currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===e.target.id))].appointment)+1
    var curr=[...currentToken]
    if(f<app.length){
    curr[f]=app[f]
    setcurrentToken(curr)}
    else{
        alert('Already at the last token')
    }        
}

const skiptoken=(e)=>{
    var app=appointment_list
    var f=appointment_list.indexOf(currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===e.target.id))].appointment)
    app[f].tokenNumber=app[-1].tokenNumber+1
    var g=app.sort((a,b)=>a.tokenNumber - b.tokenNumber)
    
    
    var appl=appointment_list.filter(app=>app.doctorName===e.target.id)
    var fl=appl.indexOf(currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===e.target.id))].appointment)+1
    var curr=[...currentToken]
    if(fl<app.length){
    curr[fl]=appl[fl]
    
    setcurrentToken(curr)}
    setappointment_list(g)
        alert('Moved token to last')

    }
return(<>
<div className="depgray">
<div id="depexpdiv">
    <div id="depexpdivhead">
        <h1>{department.name}</h1>
        <div id="closebtndonor"  onClick={()=>{close(true)}}>
            <h1>+</h1>  
        </div>
    </div>


    <div id="depexpnav">

        <div onClick={()=>{setnav('App')}} className={nav==='App'?'selectednav':''}><h2>Appointments</h2></div>
        
        <div className={nav==='Doc'?'selectednav':''} onClick={()=>{setnav('Doc')}}><h2>Department Doctors</h2></div>
        <div onClick={()=>{setnav('Prof')}} className={nav==='Prof'?'selectednav':''}><h2>Department Information</h2></div>
    </div>



{nav==='Doc'&&
    <div id="depexpcontent">
        <div className="searchbar">

        <input
        type="text"
        placeholder="Search Doctors by name.."
        value={searchdoctor}
        onChange={handleSearchdoctor}
        className='searchhospital'
        />

        </div>
        <h3 className="docdeptitle">Doctors on Duty</h3>
        <div id="depdoctorsdiv">

        {

                        displayed_listdoctor.map((i,index)=>{
                          return(

                          <div className="medsdivdep" id={index} >
                            <div className="topareamed" id={index}>
                                <div className="medimg" id={index}>
                                  <img id={index} src={DocP}></img>
                                </div>



                            </div>
                            <div className="bottomareamed" id={index}>
                                <h4 id={index}>{i.Speciality}</h4>
                                <h3 id={index}>{i.Name}</h3>
                                <h4 id={index}>{i.email}</h4>
                                <h4 id={index}>{'Experience: '+i.Experience+' yrs'}</h4>
                            </div>
                          </div>

)})}
{!displayed_listdoctor.length&&
<h1 className="errordepexpand">No doctors on duty</h1>
}
        </div>
 <h3 className="docdeptitle">Department Doctors</h3>
        <div id="depdoctorsdiv">
       
        {

                        doctor_list.map((i,index)=>{
                          return(

                          <div className="medsdivdep" id={index} >
                            <div className="topareamed" id={index}>
                                <div className="medimg" id={index}>
                                  <img id={index} src={DocP}></img>
                                </div>



                            </div>
                            <div className="bottomareamed" id={index}>
                                <h4 id={index}>{i.Speciality}</h4>
                                <h3 id={index}>{i.Name}</h3>
                                <h4 id={index}>{i.email}</h4>
                                <h4 id={index}>{'Exp : '+i.Experience}</h4>
                            </div>
                          </div>

)})}
{!doctor_list.length&&
<h1 className="errordepexpand">No doctors added in this department</h1>
}
        </div>
    </div>
}
{nav==='Prof'&&
    <div id="depexpcontent">
{!editview&&
        <div id="profdivview">
            <div id="editstock" className="stockoperation" onClick={()=>{set_edit_view(true)}}>
                <div id="editMedicinesblood" className="stockopiconmedicine">
                <img src={EditP}></img>
                </div>
                <div className="stockoptitle"><h4>Edit Information</h4></div>
            </div>
            <div className="depinfofield">   
                <h2>Name: </h2>
                <h3>{Department.name}</h3>
            </div>
            <div className="depinfofield">   
                <h2>Admin Name: </h2>
                <h3>{Department.admin_name}</h3>
            </div>
            <div className="depinfofield">   
                <h2>Password: </h2>
                <h3>*********</h3>
            </div>
            <div className="depinfofield">   
                <h2>Phone: </h2>
                <h3>{Department.phone}</h3>
            </div>
            <div className="depinfofield">   
                <h2>Total Doctors: </h2>
                <h3>{displayed_listdoctor.length}</h3>
            </div>
        </div>
}
{editview&&
        <div id="profdivview" className="editprof">

            <div className="depinfofield">   
                <h2>Name: </h2>
                <input value={dep.name} type="text" name="name" onChange={handleinput}/>
            </div>
            <div className="depinfofield">   
                <h2>Admin Name: </h2>
                <input name="admin_name" value={dep.admin_name} type="text" onChange={handleinput}/>
            </div>
            <div className="depinfofield">   
                <h2>Password: </h2>
                <input type="password" name="password" value={dep.password} onChange={handleinput}/>
            </div>
            <div className="depinfofield">   
                <h2>Phone: </h2>
                <input type="text" name="phone" value={dep.phone} onChange={handleinput}/>
            </div>
            <div>
                <button id="profcancel" onClick={()=>{set_edit_view(false)}}>Cancel</button>
                <button onClick={editformsubmit}>Submit</button>
            </div>
        </div>
}         
    </div>

}

{nav==='App'&&
    <div id="depexpcontent" className="appdivdep">
<div>
    {displayed_listdoctor.map((i,index)=>{
        var t=appointment_list.filter(o=>o.doctorName===i.Name)
        if(t.length>0){

        
        return(<>
        <div className="docopddiv" >
        <div id="Doctorappdet">
            <h1>Doctor Name: </h1>
            <h2>{i.Name}</h2>
            <h1>Timings: </h1>
            <h2>{i.availability[i.availability.indexOf(i.availability.filter(a=>a.day.toLowerCase()===currentday.toLowerCase()))].time[0]}</h2>

            <h1>Tokens Booked</h1>
            <h2>{appointment_list.filter(app=>app.doctorName===i.Name).length}</h2>
        </div>

        <div id="tokenpatientstats">
            <div>
                <h2>Previous Patient</h2>
                <img src={PatientI}></img>
                <h2>{()=>{
                    var app=appointment_list.filter(app=>app.doctorName===i.name)
                    var f=app.indexOf(currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].appointment)-1
                    return f.patientName
                }}</h2>
                <h2>{()=>{
                    var app=appointment_list.filter(app=>app.doctorName===i.name)
                    var f=app.indexOf(currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].appointment)-1
                    return f.tokenNumber
                }}</h2>
                <h2>{()=>{
                    var app=appointment_list.filter(app=>app.doctorName===i.name)
                    var f=app.indexOf(currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].appointment)-1
                    return f.time
                }}</h2>
            </div>
            <div>
                <h2>Current Patient</h2>
                <img src={PatientI}></img>
                <h2>{currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].appointment.patientName}</h2>
                <h2>Token : {currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].appointment.tokenNumber}</h2>
                <h2>{currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].appointment.time}</h2>
            </div>
            <div>
                <h2>Next Patient</h2>
                <img src={PatientI}></img>
                <h2>{()=>{
                    var app=appointment_list.filter(app=>app.doctorName===i.name)
                    var f=app.indexOf(currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].appointment)+1
                    return f.patientName
                }}</h2>
                <h2>{currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].value+1}</h2>
                <h2>{()=>{
                    var app=appointment_list.filter(app=>app.doctorName===i.name)
                    var f=app.indexOf(currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].appointment)+1
                    return f.time
                }}</h2>
            </div>
        </div>
        <div id="tokencounter">
            <h1>Starting Appointment Time: </h1>
            <h2>{currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].appointment.time}</h2>
            <h1>Increase Token Number</h1>
            <h2>{currentToken[currentToken.indexOf(currentToken.filter(c=>c.name===i.Name))].appointment.tokenNumber}</h2>
            <h3 onClick={increasetoken} id={i.Name}>+</h3>
            <h4 onClick={skiptoken} id={i.Name}>Skip</h4>
        </div>
    </div>
    </>)}
            }
    )}


</div>
    </div>

}
</div>


</div>

</>)}
export default Departmentexpand;