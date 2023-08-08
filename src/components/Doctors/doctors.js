import React from "react";
import './doctors.css';
import DocP from '../../images/doctor1.png'
import { useState,useEffect } from "react";
import Adddoctors from "./adddoctors";
import FrontP from '../../images/front.png'
import BackP from '../../images/back.png'

function Doctors(){
    const [searchdoctor,setsearchdoctor]= useState('')
    const [searchdep,setsearchdep]= useState('')
    const [close_add_view, set_add_view] = useState(true);
    const [viewmode,setviewmode]=useState(true)
    const [doctor_list,setdoctor_list]=useState([]);
    const [displayed_list,setdisplayed_list]=useState([])
    const [close_info_view, set_info_view] = useState(true);
    const [updatepage,setupdatedpage]=useState('1')
    const [department_list,setdepartment_list]=useState([]);
//selected medicines to delete
    const [selected_doctor,setselected_doctor]=useState([])
//set whether an element is expanded or not
  const [expanded,setexpanded]=useState(false)
//values to update medicine details
    const [viewdoc,setviewdoc]=useState({oldname:'',olddep:'',name:'',email:'',education:'',speciality:'',department:'',experience:'',availability:[{day:"",time:''}]})

//initial tasks on page load
useEffect(()=>{
  fetchdoctors()
  fetchdepartments()
  },[])

//close the add view tab
const handle_add=(close)=>{
  set_add_view(close)
  fetchdoctors()
}

//set up the update view
const detail_view=(e)=>{
    if(!expanded){
      var id=e.target.id;
      document.getElementsByClassName('medsdiv')[id].classList.add('docsdivspecial');
      document.getElementsByClassName('docsdivspecial')[0].classList.remove('medsdiv');
      console.log('the jdk',displayed_list[id].availability)
      setviewdoc({
        oldname:displayed_list[id].Name,
        olddep:displayed_list[id].Department,
        name:displayed_list[id].Name,
        email:displayed_list[id].email,
        education:displayed_list[id].Education,
        speciality:displayed_list[id].Speciality,
        experience:displayed_list[id].Experience,
        availability:displayed_list[id].availability,
        department:displayed_list[id].Department,

      })
      setexpanded(true);
      
    }
}

useEffect(()=>{console.log(viewdoc)},[viewdoc])

//close the update view
const close_detail_view=(e)=>{
    if(expanded){
      document.getElementsByClassName('docsdivspecial')[0].classList.add('medsdiv');      
      document.getElementsByClassName('docsdivspecial')[0].classList.remove('docsdivspecial'); 
      setviewdoc({
        name:'',
        email:'',
        education:'',
        speciality:'',
        experience:'',
        availability:'',
        department:'',
        olddep:'',
        oldname:'',
      })
      setexpanded(false); 
    }     
}

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
          setdisplayed_list(json.doctors);
        }else{setdoctor_list([]);setdisplayed_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

useEffect(()=>{console.log(displayed_list)},[displayed_list])

//activate the delete view
const deletemodeon=(e)=>{
    var cb_o=document.getElementsByClassName('checkbox-outline');
    var deletebtn=document.getElementById('delMedicines');
    if(viewmode){

        document.getElementById('deletetitle').style.display='none';
        document.getElementsByClassName('stockoptitle1')[0].style.display='block';
        deletebtn.style.transform='rotate(5deg)';
        deletebtn.classList.add('delMedicinesactive');
        for(var c=0;c<cb_o.length;c++){
            cb_o[c].style.display='flex';
        }
    }
    else{
        document.getElementById('deletetitle').style.display='flex';
        document.getElementsByClassName('stockoptitle1')[0].style.display='none';
        deletebtn.style.transform='rotate(-45deg)';
        deletebtn.classList.remove('delMedicinesactive');
        for(var c=0;c<cb_o.length;c++){
            cb_o[c].style.display='none';
        }
        setselected_doctor([])
        var cb=document.getElementsByClassName('checkbox-selected')
        for(var c=0;c<cb.length;c++){
            cb[c].style.display='none';
        }
    }
    setviewmode(!viewmode)
}

//delete the selected medicines
const delete_selected=(e)=>{
    e.preventDefault();
    try{
      let data={name:sessionStorage.getItem('org_name'),address:sessionStorage.getItem('org_address'),doc_list:selected_doctor}
        
        fetch('http://localhost:5000/api/hospital/deldoc/',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }).then(res=>{

            res.json();
            console.log("the response is ",res);
            setselected_doctor([])
            var cb=document.getElementsByClassName('checkbox-selected')
            for(var c=0;c<cb.length;c++){
                cb[c].style.display='none';
            }
            if(res.status===200){
                fetchdoctors()    
                alert('Doctors deleted successfully')
            }
            else{
              alert('Problem deleting Doctors')
            }    
            }
        )

    }catch(err){
        console.log(err)
    }
}

//add to the selected medicines array when the delete mode is on
const select_delete = (event) => {
  event.preventDefault();
  let id = parseInt(event.target.id);
  let check = document.getElementById('cbd' + id);
  check.checked = !check.checked;

  if (check.checked) {
    document.getElementById('cb' + id).style.display = 'block';
    setselected_doctor((prevState) => [...prevState, {name:check.value,department:check.name}]);
  } else {
    document.getElementById('cb' + id).style.display = 'none';
    setselected_doctor((prevState) => prevState.filter((item) => item.name !== check.value&&item.department!==check.name ));
  }  
};

//which medicines are selected for deletion
useEffect(() => {
  console.log(selected_doctor);
}, [selected_doctor]);

const openupdate=(e)=>{
set_info_view(false)
}

//fetch departments from the database
function fetchdepartments(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/hospital/getdeptdetail/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.department){
          setdepartment_list(json.department);
          
        }else{setdepartment_list([]);}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

const handleinputupdate=(e)=>{
  const { name, value } = e.target;
        setviewdoc((prevViewdoc) => ({
          ...prevViewdoc,
          [name]: value,
        }));
}

const handleInputUpdate = (event) => {
  const { id, value } = event.target;
  const day = id; // Since the id attribute is set to the day name

  // Check if the day already exists in the availability array
  const existingDayIndex = viewdoc.availability.findIndex(
    (item) => item.day.toLowerCase() === day.toLowerCase()
  );

  if (existingDayIndex !== -1) {
    // If the day exists, update the time for that day
    setviewdoc((prev) => ({
      ...prev,
      availability: prev.availability.map((item) =>
        item.day.toLowerCase() === day.toLowerCase() ? { ...item, time: [value] } : item
      ),
    }));
  } else {
    // If the day does not exist, create a new object and insert it in the proper position
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const newDayIndex = days.findIndex((d) => d.toLowerCase() === day.toLowerCase());

    if (newDayIndex !== -1) {
      setviewdoc((prev) => ({
        ...prev,
        availability: [
          ...prev.availability.slice(0, newDayIndex),
          { day, time: [value] },
          ...prev.availability.slice(newDayIndex),
        ],
      }));
    }
  }
};

const handleSearchdoctor = (e)=>{
  setsearchdoctor(e.target.value.toLowerCase())
  

  if (searchdoctor === '') {
    setdisplayed_list(doctor_list); // Show all doctors if search is empty
  } else {
    const filteredDoctors = doctor_list.filter((doctor) =>
      doctor.Name.toLowerCase().includes(searchdoctor)
    );
    setdisplayed_list(filteredDoctors);
  }
}

const handleSearchdep=(e)=>{
  setsearchdep(e.target.value.toLowerCase())
  if (searchdep === '') {
      setdisplayed_list(doctor_list)
    } else {
      var filteredDoctors = doctor_list.filter((o) => o.Department.toLowerCase() === searchdep);
      setdisplayed_list(filteredDoctors);
    } 

}

const updatedoctor=(e)=>{
    e.preventDefault()
    try{
      
      const api='http://localhost:5000/api/hospital/updatedoc';
      let data={org_name:sessionStorage.getItem('org_name'),org_address:sessionStorage.getItem('org_address'),doc_list:viewdoc}
      fetch(api, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }).then(res => {
              if (res.status === 200) {
                  alert('Doctors updated successfully')
                  setviewdoc({olddep:'',oldname:'',name:'',email:'',education:'',speciality:'',department:'',experience:'',availability:[{day:"",time:''}]})
                  fetchdoctors()
                  document.getElementsByClassName('docsdivspecial')[0].classList.add('medsdiv');      
                  document.getElementsByClassName('docsdivspecial')[0].classList.remove('docsdivspecial'); 
                  setexpanded(false)
                  var btn = document.getElementById('closebtndonor');
                  btn.click();
              }
              

              else {  alert('Problem updating doctors') }
          });
  }catch(err){
      console.log(err);
  }

}

return(
<>
{!close_add_view &&
<Adddoctors close={handle_add}/>
}
{!close_info_view &&
    <div className="donorinfogray">
        <div id="donorinfodiv">
            <div><h1>Doctor Information</h1><div id="closebtndonor"  onClick={()=>{set_info_view(true)}}><h1>+</h1></div></div>
            <div className="editinputcontent">
{(updatepage==='1')&&<>
                <div>
                    <h1>Name: </h1>
                    <input value={viewdoc.name} onChange={handleinputupdate} name="name"></input>
                </div>
                <div>
                    <h1>Email: </h1>
                    <input value={viewdoc.email} onChange={handleinputupdate} name="email"></input>
                </div>
                <div>
                    <h1>Department: </h1>
                      <select value={viewdoc.department} onChange={handleinputupdate} name="department" id="depinput">
                        {department_list.map((department) => (
                          <option key={department.name} value={department.name}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                </div>
                <div>
                    <h1>Education: </h1>
                    <input value={viewdoc.education} onChange={handleinputupdate} name="education"></input>
                </div>
                <div>
                    <h1>Speciality: </h1>
                    <input value={viewdoc.speciality} onChange={handleinputupdate} name="speciality"></input>
                </div>
                <div>
                    <h1>Experience: </h1>
                    <input value={viewdoc.experience} onChange={handleinputupdate} name="experience"></input>
                </div>
</>}
{(updatepage!='1' )&&
<>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                  <div key={day}>
                    <h1>{day}: </h1>
                    <input
                      value={
                        viewdoc.availability.find(item => item.day.toLowerCase() === day.toLowerCase())?.time || ""
                      }
                      onChange={handleInputUpdate}
                      name='availability'
                      id={day}
                    />
                  </div>
  ))}
</>}
                <div>

                </div>

            </div>
            <div id="footerupdate">
              <div>
{(updatepage!='1' )&&
                <img src={BackP} onClick={()=>{setupdatedpage('1')}}></img>
}
                <h2>Page : {updatepage} of 2</h2>
{   (updatepage==='1' )&&             
                <img src={FrontP} onClick={()=>{setupdatedpage('2')}}></img>
}
              </div>
              <button onClick={updatedoctor}>Submit</button>
            </div>
        </div>
    </div>
}
        <div id="Doctorsdashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">Doctors</h3>
                    <hr/>
                    <div className="searchbar">

                          <input
                            type="text"
                            placeholder="Search Doctors by name.."
                            value={searchdoctor}
                            onChange={handleSearchdoctor}
                            className='searchhospital'
                          />
                          <select value={searchdep} onChange={handleSearchdep} className='optionscategory'>
                            <option value="">Select Department</option>
                            {department_list.map((department) => (
                                        <option key={department.name} value={department.name}>
                                            {department.name}
                                        </option>
                                        ))}
                          </select>
                          
                        
                    </div>
                    <div className="infomeds">
<div id="scrollablecont">
                      <div className="medscontainerhospitaldr">


{

                        displayed_list.map((i,index)=>{
                          return(

                          <div className="medsdiv" id={index} onClick={viewmode?detail_view:select_delete}>
                            <div className="topareamed" id={index}>
                                <div className="medimg" id={index}>
                                  <img id={index} src={DocP}></img>
                                </div>
                                <div className="sideareamed" id={index}>
                                    
                                    <div className="checkbox-outline" id={'co'+index}>
                                        <div className="checkbox-selected" id={'cb'+index}></div>
                                    </div>
                                    <input type="checkbox" value={i.Name} name={i.Department} id={'cbd'+index} className="selectedcbd"/>
                                    
                                </div>

                                <div className="expandablediv">
                                   
                                    <div className="expandablediv_head">
                                      <button onClick={openupdate}>Update</button>
                                      <button id="update-ok" onClick={close_detail_view} >Cancel</button>
                                    
                                    </div>
                                    <div className="expandabledivcontent">
                                    <div>
                                    <div className="expandabledivchild">
                                        <h3>Name: </h3>
                                        <h4>{viewdoc.name}</h4>
                                    </div>
                                    <div className="expandabledivchild">
                                        <h3>Email: </h3>
                                        <h4>{viewdoc.email}</h4>
                                    </div>
                                    <div className="expandabledivchild">
                                        <h3>Department: </h3>
                                        <h4>{viewdoc.department}</h4>
                                    </div>
                                    <div className="expandabledivchild">
                                        <h3>Education: </h3>
                                        <h4>{viewdoc.education}</h4>
                                    </div>
                                    <div className="expandabledivchild">
                                        <h3>Experience: </h3>
                                        <h4>{viewdoc.experience}</h4>
                                    </div>
                                    <div className="expandabledivchild">
                                        <h3>Speciality: </h3>
                                        <h4>{viewdoc.speciality}</h4>
                                    </div>
                                    </div>
                                    <div>
                                    <div>
                                        <h3>Availability </h3>
                                    </div>
                                    {viewdoc.availability &&viewdoc.availability.map((i,index)=>{
                                        if(i.time!=''){
                                        return(
                                            <>
                                                <div className="expandabledivchild">
                                                    <h3>{i.day} : </h3>
                                                      <h4>{i.time}</h4>
                                                </div>
                                            </>
                                        )}

                                    })}
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottomareamed" id={index}>
                                <h4 id={index}>{i.Speciality}</h4>
                                <h3 id={index}>{i.Name}</h3>
                                <h4 id={index}>{i.Department}</h4>

                            </div>
                          </div>

)})}
{
                        !doctor_list.length&&
                        <h2 className="nulldata">No doctors added yet</h2>
}
                      </div>
</div>
                    </div>                     
                
            </div>
            <div className="controlbtns">
              
              <div id="addstock" className="stockoperation" onClick={()=>{set_add_view(false)}}>
                  <div id="addMedicines" className="stockopiconhospital">
                  <h4>+</h4>
                  </div>
                  <div className="stockoptitle"><h4>Add Doctor</h4></div>
              </div>
              <div id="delstock" className="stockoperation" onClick={deletemodeon}>
                  <div id="delMedicines"  className="stockopiconhospital" onClick={deletemodeon} >
                  <h4>+</h4>
                  </div>
                  <div className="stockoptitle" id="deletetitle"> 
                  <h4 >Delete Doctor</h4>
                  </div>
                  <div className="stockoptitle1" id='delbtns'>
                  <h3 id='delete-confirm' onClick={delete_selected}>Delete</h3>
                  <h3 id='cancel'  onClick={deletemodeon}>Cancel</h3>
                  </div>
              </div>
          </div>
        </div>
</>
)
}
export default Doctors;