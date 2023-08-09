import React from "react";
import './medicines.css';
import { useState,useEffect } from "react";
import MedImg from '../../images/medicine.png'
import Addmedicines from "./addmedicines";

function Medicines(){
    const [searchmed, setSearchmed] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [close_add_view, set_add_view] = useState(true);
    const [medicine_list,setmedicine_list]=useState([]);
    const [displayed_list,setdisplayed_list]=useState([])
    const [viewmode,setviewmode]=useState(true)
    const [allcategories,setallcategories]=useState([])
//set whether an element is expanded or not
  const [expanded,setexpanded]=useState(false)
//selected medicines to delete
    const [selected_medicine,setselected_medicine]=useState([])
//values to update medicine details
    const [updatedmed,setupdatedmed]=useState({oldname:'',name:'',price:'',category:''})

//submitting the update details
const updatemedicine=()=>{
    if(updatedmed.category===''){
      setupdatedmed(
          (prevMed) => ({
          ...prevMed,
          category:'not specified',
        })
      )
    }
    try{
        
        const api='http://localhost:5000/api/pharmacy/updatemed';
        let data={name:sessionStorage.getItem('org_name'),address:sessionStorage.getItem('org_address'),med_list:[updatedmed]}
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
                    setupdatedmed({
                      oldname:'',
                      name:'',
                      price:'',
                      category:''
                    })
                    fetchmeds()
                                 
                }
                else if (res.status === 430) { alert(res.error) }

                else {  alert('Problem updating medicine', res.error) }
            });
    }catch(err){
        console.log(err);
    }

}

//to handle the updation values
const handle_update=(e)=>{
    
      var title=e.target.name.replace("-update","");
      setupdatedmed(
          (prevMed) => ({
          ...prevMed,
          [title]: e.target.value,
        })
      )
    if(e.target.value===''&&e.target.name!='category-update'){
      document.getElementById('update-ok').classList.add('disabledbtn')
    }else{
      document.getElementById('update-ok').classList.remove('disabledbtn')
    }

}

//set up the update view
const update_view=(e)=>{
    if(!expanded){
      var id=e.target.id;
      document.getElementsByClassName('medsdiv')[id].classList.add('medsdivspecial');
      document.getElementsByClassName('medsdivspecial')[0].classList.remove('medsdiv');
      setupdatedmed({
        oldname:displayed_list[id].name,
        name:displayed_list[id].name,
        price:displayed_list[id].price,
        category:displayed_list[id].category
      })
      setexpanded(true);
    }
}

//close the update view
const close_update_view=(e)=>{
    if(expanded){
      document.getElementsByClassName('medsdivspecial')[0].classList.add('medsdiv');      
      document.getElementsByClassName('medsdivspecial')[0].classList.remove('medsdivspecial'); 
      setupdatedmed({
        name:'',
        price:'',
        category:''
      })
      setexpanded(false); 
    }     
}

//notify the changed updated medicine values
useEffect(()=>{
  console.log(updatedmed)
},[updatedmed])

//fetch medicines from the database
function fetchmeds(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/pharmacy/detailmed/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.medicines){
          const m=json.medicines.filter(o=>o.quantity>0)
          setmedicine_list(m);
          setallcategories(Array.from(new Set(m.map(item => item.category)))) 
          setSelectedCategory('')
          setSearchmed('')
        }else{setmedicine_list([]);setdisplayed_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

//initial tasks on page load
useEffect(()=>{
  fetchmeds()  
},[])

useEffect(()=>{
console.log(medicine_list)
setdisplayed_list(medicine_list)

},[medicine_list])

useEffect(()=>{
console.log(displayed_list)
},[displayed_list])


//close the add view tab
const handle_add=(close)=>{
  set_add_view(close)
  fetchmeds()
  
}

//open the add view tab
const open_add=(e)=>{
        set_add_view(false)
        var cb_o=document.getElementsByClassName('checkbox-outline');
        var deletebtn=document.getElementById('delMedicines');
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
        setviewmode(true)
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

//activate the delete view
const deletemodeon=()=>{
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
                fetchmeds()
                document.getElementById('delstock').click()   
                alert('Medicines deleted successfully')
            }
                
            }
        )

    }catch(err){
        console.log(err)
    }
}

const handleSearchMed=(e)=>{

  setSearchmed(e.target.value)
}

const handleCategoryChange=(e)=>{
  setSelectedCategory(e.target.value)

}

useEffect(() => {
    var filteredMeds = medicine_list;
    if (searchmed !== '') {
        filteredMeds = filteredMeds.filter((o) => o.name.toLowerCase().includes(searchmed.toLowerCase()));
    }
    if (selectedCategory !== '') {
        filteredMeds = filteredMeds.filter((o) => o.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }
    setdisplayed_list(filteredMeds);
}, [selectedCategory,searchmed]);

return(
<>
{!close_add_view &&
<Addmedicines close={handle_add}/>
}
        <div id="Medicinesdashboard">
          <div className="contentarea">
                    <h3 className="contentareatitle">Our Medicines</h3>
                    <hr/>
                    <div id="hiddendiv">
                      <h2  onClick={delete_selected}>Delete</h2>
                      <h2 onClick={deletemodeon}>Cancel</h2>
                    </div>
                    <div className="searchbar">

                          <input
                            type="text"
                            placeholder="Search medicines.."
                            value={searchmed}
                            onChange={handleSearchMed}
                            className='searchmedicine'
                          />
                          <select value={selectedCategory} onChange={handleCategoryChange} className='optionscategory' placeholder="Filter by Category">
                            <option value="">All categories</option>
{allcategories.map((i,ind)=>{return(<>
                            <option value={i} id={ind}>{i}</option>
</>)})}


                          </select>
                          
                        
                    </div>
                    <div className="infomeds">
                      <div className="medscontainer">


{

                        displayed_list.map((i,index)=>{
                          return(

                          <div className="medsdiv" id={index} onClick={viewmode?update_view:select_delete}>
                            <div className="topareamed" id={index}>
                                <div className="medimg" id={index}>
                                  <img id={index} src={MedImg}></img>
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
                                      <button id="update-ok" onClick={updatemedicine}>OK</button>
                                    </div>
                                    <div>
                                    <label htmlFor="name-update">Name: </label>
                                    <input id='name-update' name='name-update' type="text" onChange={handle_update} value={updatedmed.name}></input>
                                    </div>
                                    <div>
                                    <label htmlFor="price-update">Price: </label>
                                    <input id='price-update' value={updatedmed.price} name='price-update' type="number" onChange={handle_update}></input>
                                    </div>
                                    <div>
                                    <label htmlFor="category-update">Category: </label>
                                    <input id='category-update' value={updatedmed.category} name='category-update' type="text" onChange={handle_update}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="bottomareamed" id={index}>
                                <h4 id={index}>Rs {i.price}</h4>
                                <h3 id={index}>{i.name}</h3>
                                <h4 id={index}>{i.category}</h4>

                            </div>
                          </div>

)})}
{
                        !medicine_list.length&&
                        <h2 className="no_med">No medicines added yet</h2>
}
                      </div>
                    </div>    
          </div>
            <div className="controlbtns">
              
              <div id="addstock" className="stockoperation" onClick={()=>{set_add_view(false)}}>
                  <div id="addMedicines" className="stockopiconmedicine">
                  <h4>+</h4>
                  </div>
                  <div className="stockoptitle"><h4>Add Medicine Stock</h4></div>
              </div>
              <div id="delstock" className="stockoperation" onClick={deletemodeon}>
                  <div id="delMedicines"  className="stockopiconmedicine" onClick={deletemodeon} >
                  <h4>+</h4>
                  </div>
                  <div className="stockoptitle" id="deletetitle"> 
                  <h4 >Delete Medicines</h4>
                  </div>

              </div>
          </div>



        </div>
</>
)
}
export default Medicines;