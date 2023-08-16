import React from "react";
import './department.css';
import {AiOutlineDelete} from "react-icons/ai";
import { useState,useEffect } from "react";
import AddDepartment from './adddepartment';
import Departmentexpand from "./departmentexpand";

function Department(){
    const [close_add_view, set_add_view] = useState(true);
    const [close_expand_view, set_expand_view] = useState(true);
    const [department_list,setdepartment_list]=useState([]);
    const [displayed_list,setdisplayed_list]=useState([])
    const [loggedindep,setloggedindep]=useState()
//selected medicines to delete
    const [selected_department,setselected_department]=useState({depname:'',password:''})
    
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
        var data_to_delete={org_name:sessionStorage.getItem('org_name'),org_address:sessionStorage.getItem('org_address'),dep_name:selected_department.depname,password:selected_department.password}
        
        fetch('http://localhost:5000/api/hospital/deldep/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_delete)
        }).then(res=>{

            res.json();
            console.log("the response is ",res);
            setselected_department({depname:'',password:''})
            
            if(res.status===200){
                   
                alert('Departments deleted successfully')
                fetchdepartments() 
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
        setselected_department({depname:'',password:''})
}

//close the add view tab
const handle_add=(close)=>{
  set_add_view(close)
    fetchdepartments()
}

//close the department view tab
const handle_expand=(close)=>{
  set_expand_view(close)
    fetchdepartments()
}
//close delete alert
const closedeletediv=(e)=>{
document.getElementById('deletealertgray').style.display='none'
document.getElementsByClassName('deletealertgray')[0].style.display='none'
}

const deleteselect=(e)=>{
    var id=parseInt(e.target.id);
    setselected_department((prev)=>({...prev,depname:department_list[id]['name']}))
    document.getElementById('deletealertgray').style.display='flex';
}

const handleChange = (e) => {
 
  setselected_department((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const opendepart=(e)=>{
    var id=parseInt(e.target.id)
    setselected_department((prev)=>({...prev,depname:department_list[id]['name']}))
    document.getElementsByClassName('deletealertgray')[0].style.display='flex';
}

const Login=()=>{

    try{
        var data_to_delete={org_name:sessionStorage.getItem('org_name'),org_address:sessionStorage.getItem('org_address'),name:selected_department.depname,password:selected_department.password}
        
        fetch('http://localhost:5000/api/hospital/logindep/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_to_delete)
        }).then(res=>{

            
            
            setselected_department({depname:'',password:''})
            
            if (res.status === 200) {
            res.json()
                .then(data => {
                console.log(data);
                console.log(data.user);
                const userData = data.user; // Store the user data in a variable
                setloggedindep(userData);
                alert('Department logged in successfully');
                fetchdepartments();
                document.getElementsByClassName('deletealertgray')[0].style.display = 'none';
                set_expand_view(!close_expand_view);
                })
                .catch(err => {
                console.log('Error reading response:', err);
                });
}
            else{
                alert('Problem logging in to this department . Please check if you have provided the correct password for it.')
                document.getElementsByClassName('deletealertgray')[0].style.display='none'
            }   
            }
        )

    }catch(err){
        console.log(err)
    }
}

return(
<>
{!close_expand_view &&
<Departmentexpand close={handle_expand} department={loggedindep}/>
}
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
            <h2>Do you want to delete {selected_department.depname} department?<br/>Enter its password to confirm </h2>
           <input
                type="password"
                name='password'
                id="password"
                onChange={handleChange}
                value={selected_department.password}
                />
            <button onClick={delete_selected}>Delete</button>
        </div>
    </div>
</div>
</div>
<div className="deletealertgray">
<div id="loginalert">
        <div id="alertcontainer">
        <div id="topalertbar">
            <h1>Alert</h1>
            <div id="closealert" onClick={closedeletediv} >
                <h2>+</h2>
            </div>
        </div>

        <div id="contentareaalert">
            <h2>Logging in to  {selected_department.depname} department?<br/>Enter its password to confirm </h2>
           <input
                type="password"
                name='password'
                id="password"
                onChange={handleChange}
                value={selected_department.password}
                />
            <button onClick={Login}>Login</button>
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
                        <div className="depsdiv" id={index+'depsdiv'} >
                            <div className="deptitle" id={index+'deptitle'}>
                                <h3 id={index}>{i.name}</h3>
                                <AiOutlineDelete className="icondep" id={index+'deldep'} onClick={deleteselect}/>
                                    
                                
                            </div>
                            <div className="depinfo" id={index +'depinfo'} onClick={opendepart}>
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
