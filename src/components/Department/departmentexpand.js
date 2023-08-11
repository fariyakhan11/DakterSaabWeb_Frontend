import React from "react";
import './department.css';
import {AiOutlineDelete} from "react-icons/ai";
import { useState,useEffect } from "react";
import EditP from '../../images/edit1.png'
import DocP from '../../images/doctor1.png'
import PatientI from '../../images/patient1.png'


function Departmentexpand({close,department}){
    const [Department,setDepartment]=useState(department)
    const [dep,setdep]=useState({name:Department.name,admin_name:Department.admin_name,password:'',phone:Department.phone})
    const [searchdoctor,setsearchdoctor]= useState('')
    const [doctor_list,setdoctor_list]=useState([]);
    const [displayed_listdoctor,setdisplayed_listdoctor]=useState([])
    const [nav,setnav]=useState('App')
    const[editview,set_edit_view]=useState(false)
//initial tasks on page load
useEffect(()=>{
  
  
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
          setdoctor_list(json.doctors);
          setdisplayed_listdoctor(json.doctors);
        }else{setdoctor_list([]);setdisplayed_listdoctor([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}
const editformsubmit=()=>{
        try{
        
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
                        setdep({name:data.name,admin_name:data.admin_name,password:'',phone:data.phone})
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
}

useEffect(()=>{

    if(nav==='App'){

    }
    else if(nav==='Prof'){

    }
    else if(nav==='Doc'){
        fetchdoctors()
    }

},[nav])

const handleSearchdoctor = (e)=>{
    setsearchdoctor(e.target.value.toLowerCase())
    
  
    if (searchdoctor === '') {
      setdisplayed_listdoctor(doctor_list); // Show all doctors if search is empty
    } else {
      const filteredDoctors = doctor_list.filter((doctor) =>
        doctor.Name.toLowerCase().includes(searchdoctor)
      );
      setdisplayed_listdoctor(filteredDoctors);
    }
}

function getpatients(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/hospital/getpatients/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.doctors){
          setdoctor_list(json.doctors);
          setdisplayed_listdoctor(json.doctors);
        }else{setdoctor_list([]);setdisplayed_listdoctor([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
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
 <h3>Doctors on Duty</h3>
        <div id="depdoctorsdiv">
                <div className="searchbar">

                    <input
                    type="text"
                    placeholder="Search Doctors by name.."
                    value={searchdoctor}
                    onChange={handleSearchdoctor}
                    className='searchhospital'
                    />
            
                </div>
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
        </div>
 <h3>Department Doctors</h3>
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
                          <div className="medsdivdep"  >
                            <div className="topareamed">
                                <div className="medimg" >
                                  <img  src={DocP}></img>
                                </div>



                            </div>
                            <div className="bottomareamed" >
                                <h4 >Surgery</h4>
                                <h3 >Fareha</h3>
                                <h4 >fareha123@gmail.com</h4>
                                <h4 >{'Experience: '+5+' yrs'}</h4>
                            </div>
                          </div>

                          <div className="medsdivdep"  >
                            <div className="topareamed" >
                                <div className="medimg">
                                  <img  src={DocP}></img>
                                </div>



                            </div>
                            <div className="bottomareamed">
                                <h4 >Surgery</h4>
                                <h3 >Mohiduddin</h3>
                                <h4 >moh_uddin34@gmail.com</h4>
                                <h4 >{'Experience: '+8+' yrs'}</h4>
                            </div>
                          </div>
                          <div className="medsdivdep"  >
                            <div className="topareamed" >
                                <div className="medimg">
                                  <img  src={DocP}></img>
                                </div>



                            </div>
                            <div className="bottomareamed">
                                <h4 >General Medicine</h4>
                                <h3 >Sohaib</h3>
                                <h4 >sohaib34@gmail.com</h4>
                                <h4 >{'Experience: '+1+' yrs'}</h4>
                            </div>
                          </div>
                          <div className="medsdivdep"  >
                            <div className="topareamed" >
                                <div className="medimg">
                                  <img  src={DocP}></img>
                                </div>



                            </div>
                            <div className="bottomareamed">
                                <h4 >Surgery</h4>
                                <h3 >Mohiduddin</h3>
                                <h4 >moh_uddin34@gmail.com</h4>
                                <h4 >{'Experience: '+8+' yrs'}</h4>
                            </div>
                          </div>
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
                <h2>Alishba Arshad</h2>
                <h1>Timings</h1>
                <h2>7:30AM-3:00PM</h2>
                <h1>Tokens Booked</h1>
                <h2>20</h2>
            </div>

            <div id="tokenpatientstats">
                <div>
                    <h2>Previous Patient</h2>
                    <img src={PatientI}></img>
                    <h2>Shehla</h2>
                    <h2>6</h2>
                    <h2>9:15AM</h2>
                </div>
                <div>
                    <h2>Current Patient</h2>
                    <img src={PatientI}></img>
                    <h2>Abdullah</h2>
                    <h2>Token : 7</h2>
                    <h2>10:00AM</h2>
                </div>
                <div>
                    <h2>Next Patient</h2>
                    <img src={PatientI}></img>
                    <h2>Farah</h2>
                    <h2>8</h2>
                    <h2>10:30AM</h2>
                </div>
            </div>
            <div id="tokencounter">
                <h1>Starting Appointment Time: </h1>
                <h2>10:00AM</h2>
                <h1>Increase Token Number</h1>
                <h2>7</h2>
                <h3>+</h3>
                <h4>Skip</h4>
            </div>
        </div>
        <div className="docopddiv" >
            <div id="Doctorappdet">
                <h1>Doctor Name: </h1>
                <h2>Alishba Arshad</h2>
                <h1>Timings</h1>
                <h2>7:30AM-3:00PM</h2>
                <h1>Tokens Booked</h1>
                <h2>20</h2>
            </div>

            <div id="tokenpatientstats">
                <div>
                    <h2>Previous Patient</h2>
                    <img src={PatientI}></img>
                    <h2>Shehla</h2>
                    <h2>6</h2>
                    <h2>9:15AM</h2>
                </div>
                <div>
                    <h2>Current Patient</h2>
                    <img src={PatientI}></img>
                    <h2>Abdullah</h2>
                    <h2>Token : 7</h2>
                    <h2>10:00AM</h2>
                </div>
                <div>
                    <h2>Next Patient</h2>
                    <img src={PatientI}></img>
                    <h2>Farah</h2>
                    <h2>8</h2>
                    <h2>10:30AM</h2>
                </div>
            </div>
            <div id="tokencounter">
                <h1>Starting Appointment Time: </h1>
                <h2>10:00AM</h2>
                <h1>Increase Token Number</h1>
                <h2>7</h2>
                <h3>+</h3>
                <h4>Skip</h4>
            </div>
        </div>
</div>
    </div>

}
</div>


</div>

</>)}
export default Departmentexpand;