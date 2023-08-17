import React from "react";
import './department.css';
import { useState,useEffect } from "react";
import EditP from '../../images/edit1.png'
import DocP from '../../images/doctor1.png'
import PatientI from '../../images/patient1.png'
import socketIOClient from 'socket.io-client';

function Departmentexpand({close,department}){
    const [currentday,setcurrentday]=useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }))
    
    const [Department,setDepartment]=useState(department)
    const [dep,setdep]=useState({name:department.name,admin_name:department.admin_name,password:'........',phone:department.phone,changepw:0})
    const [searchdoctor,setsearchdoctor]= useState('')
    const [doctor_list,setdoctor_list]=useState([]);
    const [appointment_list,setappointment_list]=useState([]);
    const [currentToken, setcurrentToken] = useState([]);
    const [prevToken, setprevToken] = useState([]);
    const [upToken, setupToken] = useState([]);
    const [displayed_listdoctor,setdisplayed_listdoctor]=useState([])
    const [nav,setnav]=useState('App')
    const[editview,set_edit_view]=useState(false)

    const [first,setfirst]=useState([{}])

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
        
        fetchdoctors()
        getpatients()
    }
    else if(nav==='Prof'){

    }
    else if(nav==='Doc'){
        fetchdoctors()
    }

},[nav])


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
           
          
            
            var drname = [...new Set(json.appointments.map(a => a.doctorName))];
        
        var tokenData = [];
        var tokenDataprev=[]
        var tokenDataup=[]
        drname.forEach(d => {
            var f = json.appointments.filter(app => app.doctorName === d);
            if (f.length) {
                f = f.sort((a, c) => a.tokenNumber - c.tokenNumber);
                tokenData.push({ name: d, appointment: f[0] })
                tokenDataprev.push({})
                if(f.length>1){
                tokenDataup.push({name:d,appointment:f[1]})
                }
            }
        });
setappointment_list(json.appointments)

        setcurrentToken(tokenData);
        setprevToken(tokenDataprev)
        setupToken(tokenDataup)

        }else{setappointment_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

const increasetoken=(e)=>{
    
    document.getElementById('tokenno').textContent='45';
    document.getElementById('prevtokenno').textContent='44';
    document.getElementById('currenttokenname').textContent='Zainab';
    document.getElementById('futuretokenname').textContent='';
    document.getElementById('prevtokenname').textContent='Fasih';
    document.getElementById('futuretokenno').textContent='0';


    
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
                                <h4 id={index}>{'Experience: '+i.Experience}</h4>
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


        
      
        <div className="docopddiv" >
        <div id="Doctorappdet">
            <h1>Doctor Name: </h1>
            <h2>Prof Akhter Ali Baloch</h2>
            <h1>Timings: </h1>
            <h2></h2>

            <h1>Tokens Booked</h1>
            <h2>43</h2>
        </div>

        <div id="tokenpatientstats">

            <div>
                <h2>Previous Patient</h2>
                <img src={PatientI}></img>
                <h2 id="prevtokenname">Jawad</h2>
                <h2 id="prevtokenno">Token : 43</h2>
                <h2>10:20AM</h2>
            </div> 
      
            <div>
                <h2>Current Patient</h2>
                <img src={PatientI}></img>
                <h2 id="currenttokenname">Fasih</h2>
                <h2 id="currenttokenno">Token : 44</h2>
                <h2>10:40 AM</h2>
            </div>
            
            <div>
                <h2>Upcoming Patient</h2>
                <img src={PatientI}></img>
                <h2 id="futuretokenname">Zainab</h2>
                <h2 id="futuretokenno">Token : 45</h2>
                <h2>11:20AM</h2>
            </div>
        
        </div>
        <div id="tokencounter">
            <h1>Starting Appointment Time: </h1>
            <h2>10:40 AM</h2>
            <h1>Increase Token Number</h1>
            <h2 id="tokenno">44</h2>
            <h3 onClick={increasetoken} >+</h3>
            
        </div>
 
    </div>


</div>
    </div>

}
</div>


</div>

</>)}
export default Departmentexpand;