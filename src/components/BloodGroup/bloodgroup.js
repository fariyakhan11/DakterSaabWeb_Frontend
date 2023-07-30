import React from "react";
import './bloodgroup.css';
import BloodP from '../../images/blood1.png';
import Addbloodgroup from './addbloodgroup';
import { useState,useEffect } from "react";



function Bloodgroup(){

    const [bloodgroup_list,setbloodgroup_list]=useState([])
    const [displayed_list,setdisplayed_list]=useState([])
    const [viewmode,setviewmode]=useState(true)
    const [close_add_view, set_add_view] = useState(true);
//values to update medicine details
    const [updatedblood,setupdatedblood]=useState({oldtype:'',type:'',price:'',quantity:''})
//set whether an element is expanded or not
    const [expanded,setexpanded]=useState(false)
//selected medicines to delete
    const [selected_blood,setselected_blood]=useState([])

//initial tasks on page load
  useEffect(()=>{
fetchblood()
  },[])

//fetch medicines from the database
function fetchblood(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/bloodbank/getblood/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.bloodgroups){
          setbloodgroup_list(json.bloodgroups);
          setdisplayed_list(json.bloodgroups);
        }else{setbloodgroup_list([]);setdisplayed_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

//set up the update view
const update_view=(e)=>{
    if(!expanded){
      var id=e.target.id;
      document.getElementsByClassName('medsdiv')[id].classList.add('medsdivspecial');
      document.getElementsByClassName('medsdivspecial')[0].classList.remove('medsdiv');
      setupdatedblood({
        oldtype:displayed_list[id].AvailableBloodGroup,
        type:displayed_list[id].AvailableBloodGroup,
        price:displayed_list[id].price,
        quantity:displayed_list[id].quantity
      })
      setexpanded(true);
    }
}

//to handle the updation values
const handle_update=(e)=>{
    
      var title=e.target.name.replace("-update","");
      setupdatedblood(
          (prevblood) => ({
          ...prevblood,
          [title]: e.target.value,
        })
      )
    if(e.target.value===''){
      document.getElementById('update-ok').classList.add('disabledbtn')
    }else{
      document.getElementById('update-ok').classList.remove('disabledbtn')
    }

}

//notify the changed updated medicine values
useEffect(()=>{
  console.log(updatedblood)
},[updatedblood])

//submitting the update details
const updateblood=()=>{

    try{
        
        const api='http://localhost:5000/api/bloodbank/updatebloodgroup';
        let data={name:sessionStorage.getItem('org_name'),address:sessionStorage.getItem('org_address'),blood_list:[updatedblood]}
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
                if (res.status === 200) {
                    alert('medicine updated successfully')
                    setexpanded(false);
                    document.getElementsByClassName('medsdivspecial')[0].classList.add('medsdiv');      
                    document.getElementsByClassName('medsdivspecial')[0].classList.remove('medsdivspecial'); 
                    setupdatedblood({
                      oldtype:'',  
                      type:'',
                      price:'',
                      quantity:''
                    })
                    fetchblood()              
                }
                else if (res.status === 430) { alert(res.error) }

                else {  alert('Problem updating blood group', res.error) }
            });
    }catch(err){
        console.log(err);
    }

}

//close the update view
const close_update_view=(e)=>{
    if(expanded){
      document.getElementsByClassName('medsdivspecial')[0].classList.add('medsdiv');      
      document.getElementsByClassName('medsdivspecial')[0].classList.remove('medsdivspecial'); 
      setupdatedblood({
        type:'',
        price:'',
        quantity:'',
        oldtype:''
      })
      setexpanded(false); 
    }     
}

//add to the selected blood array when the delete mode is on
const select_delete = (event) => {
  event.preventDefault();
  let id = parseInt(event.target.id);
  let check = document.getElementById('cbd' + id);
  check.checked = !check.checked;

  if (check.checked) {
    document.getElementById('cb' + id).style.display = 'block';
    setselected_blood((prevState) => [...prevState, check.value]);
  } else {
    document.getElementById('cb' + id).style.display = 'none';
    setselected_blood((prevState) => prevState.filter((item) => item !== check.value));
  }  
};

//which medicines are selected for deletion
useEffect(() => {
  console.log(selected_blood);
}, [selected_blood]);

//activate the delete view
function deletemodeon(){
    var cb_o=document.getElementsByClassName('checkbox-outline');
    var deletebtn=document.getElementById('delMedicines');
    if(viewmode){

        document.getElementById('deletetitle').style.display='none';
       document.getElementById('hiddendiv').style.display='flex';
        deletebtn.style.transform='rotate(5deg)';
        deletebtn.classList.add('delMedicinesactive');
        for(var c=0;c<cb_o.length;c++){
            cb_o[c].style.display='flex';
        }
    }
    else{
        document.getElementById('deletetitle').style.display='flex';
       document.getElementById('hiddendiv').style.display='none';
        deletebtn.style.transform='rotate(-45deg)';
        deletebtn.classList.remove('delMedicinesactive');
        for(var c=0;c<cb_o.length;c++){
            cb_o[c].style.display='none';
        }
        setselected_blood([])
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
        var params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')+'/'+selected_blood
        fetch('http://localhost:5000/api/bloodbank/delblood/'+params,{
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'}
        }).then(res=>{

            res.json();
            console.log("the response is ",res);
            setselected_blood([])
            var cb=document.getElementsByClassName('checkbox-selected')
            for(var c=0;c<cb.length;c++){
                cb[c].style.display='none';
            }
            if(res.status===200){
                fetchblood()    
                alert('Blood Type deleted successfully')
            }
                
            }
        )

    }catch(err){
        console.log(err)
    }
}

//close the add view  tab
const handle_add=(close)=>{
  set_add_view(close)
  fetchblood()

    
}

//open the add view tab
const open_add=(e)=>{
        set_add_view(false)

      if(document.getElementById('deletetitle')){
        document.getElementById('deletetitle').style.display='flex';
      }
        var cb_o=document.getElementsByClassName('checkbox-outline');
        var deletebtn=document.getElementById('delMedicines');
        
        
        deletebtn.style.transform='rotate(-45deg)';
        deletebtn.classList.remove('delMedicinesactive');
        for(var c=0;c<cb_o.length;c++){
            cb_o[c].style.display='none';
        }
        setselected_blood([])
        var cb=document.getElementsByClassName('checkbox-selected')
        for(var c=0;c<cb.length;c++){
            cb[c].style.display='none';
        }
        setviewmode(true)
}
return(
<>
{!close_add_view &&
<Addbloodgroup close={handle_add}/>
}
        <div id="BloodGroupdashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">Blood Groups</h3>
                    <hr/>
                    <div id="hiddendiv">
                      <h2  onClick={delete_selected}>Delete</h2>
                      <h2 onClick={deletemodeon}>Cancel</h2>
                    </div>
                <div id="bloodgroupsdiv">
                      <div className="medscontainer">


{

                        displayed_list.map((i,index)=>{
                          return(

                          <div className="medsdiv" id={index} onClick={viewmode?update_view:select_delete}>
                            <div className="topareamed" id={index}>
                                <div className="medimg" id={index}>
                                  <img id={index} src={BloodP}></img>
                                </div>
                                <div className="sideareamed" id={index}>
                                    
                                    <div className="checkbox-outline" id={'co'+index}>
                                        <div className="checkbox-selected" id={'cb'+index}></div>
                                    </div>
                                    <input type="checkbox" value={i.name} name="selected-delete" id={'cbd'+index} className="selectedcbd"/>
                                    
                                </div>
                                <div className="expandable-div">
                                    <div id='update-btn-div'>
                                      <button onClick={close_update_view}>Cancel</button>
                                      <button id="update-ok" onClick={updateblood}>OK</button>
                                    </div>
                                    <div>
                                    <label htmlFor="type-update">Type: </label>
                                    <input id='type-update' name='type-update' type="text" onChange={handle_update} value={updatedblood.type}></input>
                                    </div>
                                    <div>
                                    <label htmlFor="price-update">Price: </label>
                                    <input id='price-update' value={updatedblood.price} name='price-update' type="number" onChange={handle_update}></input>
                                    </div>
                                    <div>
                                    <label htmlFor="quantity-update">Quantity: </label>
                                    <input id='quantity-update' value={updatedblood.quantity} name='quantity-update' type="number" onChange={handle_update}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="bottomareamed" id={index}>
                                <h3 id={index} style={{fontSize:'1.6em'}}>{i.AvailableBloodGroup}</h3>
                                <h4 id={index}>Rs {i.price}</h4>

                                <h4 id={index}>{i.quantity} units</h4>

                            </div>
                          </div>

)})}
{
                        !bloodgroup_list.length&&
                        <h2 className="no_med">No blood units available right now</h2>
}
                      </div>

                </div>
            </div>
            <div className="controlbtns">
              
              <div id="addstock" className="stockoperation" onClick={open_add}>
                  <div id="addMedicines" className="stockopiconbloodbank">
                  <h4>+</h4>
                  </div>
                  <div className="stockoptitle"><h4>Add Blood Units</h4></div>
              </div>
              <div id="delstock" className="stockoperation" onClick={deletemodeon}>
                  <div id="delMedicines"  className="stockopiconbloodbank" onClick={deletemodeon} >
                  <h4>+</h4>
                  </div>
                  <div className="stockoptitle" id="deletetitle"> 
                  <h4 >Delete Blood Types</h4>
                  </div>

              </div>
          </div>
        </div>
</>
)
}
export default Bloodgroup;