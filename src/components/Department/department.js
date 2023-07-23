import React from "react";
import './department.css';
import {AiOutlineDelete} from "react-icons/ai";
import { useState,useEffect } from "react";
import AddDepartment from './adddepartment';

function Department(){
    const [close_add_view, set_add_view] = useState(true);
    const [department_list,setdepartment_list]=useState([]);
    const [displayed_list,setdisplayed_list]=useState([])
//selected medicines to delete
    const [selected_department,setselected_department]=useState([])
    const [dep_pw,set_dep_pw]=useState('')
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



//delete the selected departments
const delete_selected=(e)=>{
    e.preventDefault();
    try{
        var data_to_delete={org_name:sessionStorage.getItem('org_name'),org_address:sessionStorage.getItem('org_address'),dep_name:selected_department[0],password:dep_pw}
        
        fetch('http://localhost:5000/api/hospital/deldep/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_delete)
        }).then(res=>{

            res.json();
            console.log("the response is ",res);
            setselected_department([])
            set_dep_pw('')
            if(res.status===200){
                fetchdepartments()    
                alert('Departments deleted successfully')
                document.getElementById('deletealertgray').style.display='none'
            }
            else{
                alert('Problem deleting this department . Please check if you have provided the correct password for it.')
            }   
            }
        )

    }catch(err){
        console.log(err)
    }
}



//open the add view tab
const open_add=(e)=>{
        set_add_view(false)
        
    
    
        setselected_department([])
        
        
}

//close the add view tab
const handle_add=(close)=>{
  set_add_view(close)
    fetchdepartments()
}

//close delete alert
const closedeletediv=(e)=>{
document.getElementById('deletealertgray').style.display='none'

}

const deleteselect=(e)=>{

var id=e.target.id;
id=parseInt(id);
setselected_department([department_list[id]['name']])
document.getElementById('deletealertgray').style.display='flex';
}
return(
<>
<div id="deletealertgray">
<div id="deletealert">
        <div id="alertcontainer">
        <div id="topalertbar">
            <h1>Alert</h1>
            <div id="closealert" onClick={closedeletediv} >
                <h2>+</h2>
            </div>
        </div>

        <div id="contentareaalert">
            <h2>Do you want to delete {selected_department[0]} department?<br/>Enter its password to confirm </h2>
            <input type="password" id="departmentalpwdel" ></input>
            <button onClick={delete_selected}>Delete</button>
        </div>
    </div>
</div>
</div>
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
                                <h3 id={index}>{i.name}</h3>
                                <AiOutlineDelete className="icondep" id={index+'deldep'} onClick={deleteselect}/>
                                    
                                
                            </div>
                            <div className="depinfo" id={'depinfo'+index}>
                                <h4 id={index}>Admin Name : {i.admin_name}</h4>
                                <h4 id={index}>Phone : {(i.phone==='')?'-':i.phone}</h4>
                                <h4 id={index}>Doctors on Duty :</h4>
                                <h5 id={index}></h5>
                            </div>
                        </div>
)})}
{!department_list.length &&
                        <h5 className="nulldata">No departments added yet . Click to add departments</h5>
}
                        
                      </div>

                        
                </div>

            </div>
            <div className="controlbtns">
              
              <div id="addstock" className="stockoperation" onClick={open_add}>
                  <div id="addMedicines" className="stockopiconhospital">
                  <h4>+</h4>
                  </div>
                  <div className="stockoptitle"><h4>Add Departments</h4></div>
              </div>

            </div>
        </div>
</>
)
}
export default Department;