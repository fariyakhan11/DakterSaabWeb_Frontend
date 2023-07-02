import React from "react";
import './doctors.css';
import DocP from '../../images/doctor1.png'
import { useState,useEffect } from "react";
import Adddoctors from "./adddoctors";


function Doctors(){
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [close_add_view, set_add_view] = useState(true);
    const [viewmode,setviewmode]=useState(true)
    const [doctor_list,setdoctor_list]=useState([]);
    const [displayed_list,setdisplayed_list]=useState([])
//selected medicines to delete
    const [selected_medicine,setselected_medicine]=useState([])
//set whether an element is expanded or not
  const [expanded,setexpanded]=useState(false)
//values to update medicine details
    const [viewdoc,setviewdoc]=useState({name:'',email:'',education:'',speciality:'',department:'',experience:'',availability:[{day:"",time:''}]})

//initial tasks on page load
  useEffect(()=>{
fetchdoctors()
  },[])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

const handle_add=(close)=>{
    set_add_view(close)
}

//set up the update view
const detail_view=(e)=>{
    if(!expanded){
      var id=e.target.id;
      document.getElementsByClassName('medsdiv')[id].classList.add('medsdivspecial');
      document.getElementsByClassName('medsdivspecial')[0].classList.remove('medsdiv');
      setviewdoc({
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

//close the update view
const close_detail_view=(e)=>{
    if(expanded){
      document.getElementsByClassName('medsdivspecial')[0].classList.add('medsdiv');      
      document.getElementsByClassName('medsdivspecial')[0].classList.remove('medsdivspecial'); 
      setviewdoc({
        name:'',
        email:'',
        education:'',
        speciality:'',
        experience:'',
        availability:'',
        department:'',
      })
      setexpanded(false); 
    }     
}

//fetch medicines from the database
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
        setselected_medicine([])
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
        var params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')+'/'+selected_medicine
        fetch('http://localhost:5000/api/pharmacy/delmed/'+params,{
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'}
        }).then(res=>{

            res.json();
            console.log("the response is ",res);
            setselected_medicine([])
            var cb=document.getElementsByClassName('checkbox-selected')
            for(var c=0;c<cb.length;c++){
                cb[c].style.display='none';
            }
            if(res.status===200){
                fetchdoctors()    
                alert('Medicines deleted successfully')
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
    setselected_medicine((prevState) => [...prevState, check.value]);
  } else {
    document.getElementById('cb' + id).style.display = 'none';
    setselected_medicine((prevState) => prevState.filter((item) => item !== check.value));
  }  
};

//which medicines are selected for deletion
useEffect(() => {
  console.log(selected_medicine);
}, [selected_medicine]);

return(
<>
{!close_add_view &&
<Adddoctors close={handle_add}/>
}
        <div id="Doctorsdashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">Doctors</h3>
                    <hr/>
                    <div className="searchbar">

                          <input
                            type="text"
                            placeholder="Search Doctors.."
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            className='searchhospital'
                          />
                          <select value={selectedCategory} onChange={handleCategoryChange} className='optionscategory'>
                            <option value="">All categories</option>
                            <option value="books">Books</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                          </select>
                          
                        
                    </div>
                    <div className="infomeds">
                      <div className="medscontainer">


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
                                    <input type="checkbox" value={i.name} name="selected-delete" id={'cbd'+index} className="selectedcbd"/>
                                    
                                </div>
                                <div className="expandable-div">
                                    <div id='view-btn-div'>
                                      <button onClick={close_detail_view}>+</button>

                                    </div>
                                    <div>
                                        <h3>Name: </h3>
                                        <h4>{viewdoc.name}</h4>
                                    </div>
                                    <div>
                                        <h3>Email: </h3>
                                        <h4>{viewdoc.email}</h4>
                                    </div>
                                    <div>
                                        <h3>Department: </h3>
                                        <h4>{viewdoc.department}</h4>
                                    </div>
                                    <div>
                                        <h3>Education: </h3>
                                        <h4>{viewdoc.education}</h4>
                                    </div>
                                    <div>
                                        <h3>Experience: </h3>
                                        <h4>{viewdoc.experience}</h4>
                                    </div>
                                    <div>
                                        <h3>Speciality: </h3>
                                        <h4>{viewdoc.speciality}</h4>
                                    </div>
                                    <div>
                                        <h3>Availability: </h3>
                                    </div>
                                    {viewdoc.availability.map((i,index)=>{
                                        return(
                                            <>
                                                <div>
                                                    <h3>{i.day} : {i.time}</h3>
                                                </div>
                                            </>
                                        )

                                    })}

                                </div>
                            </div>
                            <div className="bottomareamed" id={index}>
                                <h4 id={index}>Rs {i.Speciality}</h4>
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