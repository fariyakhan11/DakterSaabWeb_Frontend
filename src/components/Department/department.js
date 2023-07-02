import React from "react";
import './department.css';
import {AiOutlineDelete} from "react-icons/ai";
import { useState,useEffect } from "react";
import AddDepartment from './adddepartment';

function Department(){
    const [close_add_view, set_add_view] = useState(true);
    const [viewmode,setviewmode]=useState(true)
    const [department_list,setdepartment_list]=useState([]);
    const [displayed_list,setdisplayed_list]=useState([])
//selected medicines to delete
    const [selected_department,setselected_department]=useState([])

//initial tasks on page load
  useEffect(()=>{
fetchdepartments()
  },[])

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
          setdisplayed_list(json.department);
        }else{setdepartment_list([]);setdisplayed_list([])}
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
        setselected_department([])
        var cb=document.getElementsByClassName('checkbox-selected')
        for(var c=0;c<cb.length;c++){
            cb[c].style.display='none';
        }
    }
    setviewmode(!viewmode)
}

//delete the selected departments
const delete_selected=(e)=>{
    e.preventDefault();
    try{
        var params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')+'/'+selected_department
        fetch('http://localhost:5000/api/hospital/deldep/'+params,{
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'}
        }).then(res=>{

            res.json();
            console.log("the response is ",res);
            setselected_department([])
            var cb=document.getElementsByClassName('checkbox-selected')
            for(var c=0;c<cb.length;c++){
                cb[c].style.display='none';
            }
            if(res.status===200){
                fetchdepartments()    
                alert('Departments deleted successfully')
            }
                
            }
        )

    }catch(err){
        console.log(err)
    }
}

//add more manual medicine add divs
const addmoredeps = (e) => {

    e.preventDefault();
    set_add_view(false)
};

//open the add view tab
const handle_add=(close)=>{
  set_add_view(close)

}
return(
<>
{!close_add_view &&
<AddDepartment close={handle_add}/>
}
        <div id="Departmentdashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">Departments</h3>
                    <hr/>

                <div id="departmentsdiv">
                      <div className="depscontainer" >
{displayed_list.map((i,index)=>{return(
                        <div className="depsdiv" id={'depsdiv'+index}>
                            <div className="deptitle" id={'deptitle'+index}>
                                <h3 id={index}>hi</h3>
                                <AiOutlineDelete className="icondep"/>
                                    <input type="checkbox"  name="selected-delete" id={'cbd'+index} className="selectedcbd"/>
                                
                            </div>
                            <div className="depinfo" id={'depinfo'+index}>
                                <h4 id={index}>Admin Name : {i.admin_name}</h4>
                                <h4 id={index}>Phone : {(i.phone==='')?'-':i.phone}</h4>
                                <h4 id={index}>Doctors on Duty :</h4>
                                <h5 id={index}></h5>
                            </div>
                        </div>
)})}

                        <h5 className="nulldata">No departments added yet . Click to add departments</h5>

                        
                      </div>
                        <button className="more-btnhospital" onClick={addmoredeps}>+</button>
                </div>
            </div>

        </div>
</>
)
}
export default Department;