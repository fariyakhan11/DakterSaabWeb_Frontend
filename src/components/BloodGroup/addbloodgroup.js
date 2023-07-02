import React from "react";
import './bloodgroup.css';
import {GrHelp} from "react-icons/gr";
import Papa from "papaparse";
import { useState,useEffect } from "react";


function Addbloodgroup({close}){
//auto blood group  name    
    const [auto_file, setauto_file]=useState('');
//auto blood group data
    const [autoblood, setautoblood]=useState([{type:'',price:'',quantity:''}]);

//Method in which the data shall be entered by default Manual so true otherwise false   
    const [add_manual, set_manual_tab]=useState(true);

//manual blood data
    const [manualblood,setmanualblood]=useState([{type:'',price:'',quantity:''},{type:'',price:'',quantity:''}])


//initially set manual blood add tab to active    
useEffect(()=>{
    document.getElementById('manual_add').classList.add('active_tabblood');
    document.getElementsByClassName('submitbtnmedblood')[0].classList.add('disabledbtn')
},[])

//if manual med div have only one med input div displayed you cannot close it 
useEffect(()=>{
    if(add_manual){
        if(manualblood.length<=1){document.getElementsByClassName('closebtn')[0].style.display='none';}
        else{document.getElementsByClassName('closebtn')[0].style.display='flex';}
    }
})
//check whether to disable or enable the submit medicine data btn whenever the medicine inputs are updated
useEffect(()=>{
    if(add_manual){
    disablesubmitmanual();}
},[manualblood])

//check whether to disable or enable the submit medicine data btn whenever the medicine inputs are updated
useEffect(()=>{
    if(!add_manual){
    disablesubmitauto();
    console.log('the blood groups are',autoblood)
}
},[autoblood])

//change the method the data is entered
const change_tab=(e)=>{
        
        
        let x=document.getElementsByClassName('active_tabblood')[0];
        if(x){
            x.classList.remove('active_tabblood');
            x.classList.add('idle_tabblood');
        }

        let f=e.target.id;
        document.getElementById(f).classList.add('active_tabblood');
        document.getElementById(f).classList.remove('idle_tabblood');
        if(e.target.id==='manual_add'){
            set_manual_tab(true);
            setauto_file('');
            setmanualblood([{type:'',price:'',quantity:''},{type:'',price:'',quantity:''}])
        }
        else{
            set_manual_tab(false);
            setautoblood([{type:'',price:'',quantity:''}])
            setmanualblood([{type:'',price:'',quantity:''},{type:'',price:'',quantity:''}])
        }
}
//add more manual medicine add divs
const addmoredivs = (e) => {
  setmanualblood(prevState => [...prevState, {type:'',price:'',quantity:''}]);
    e.preventDefault();
};

//update the info for the medicines input    
const changeinfo = (e) => {
  const { id, name, value } = e.target;

  setmanualblood((prevState) => {
    return prevState.map((item, index) => {
      if (index === parseInt(id)) {
        return { ...item, [name]: value };
      }
      return item;
    });
  });
    verify(name,value,id);
  
};

//close the medicine div if the close btn is clicked
const closebtn = (e) => {
  const updatedManualblood = [...manualblood];
  updatedManualblood.splice(e.target.id-1, 1);
  setmanualblood(updatedManualblood);

}

//verify the content of data being sent
function verify(element,value,index){
    const name_expression =/^[A-Za-z]+$/;

    if(element=='name'){
        
        if(name_expression.test(value[0])){
            document.getElementById(('typeerr'+index).toString()).style.display="none";
        }
        else{
            document.getElementById(('typeerr'+index).toString()).style.display="block";
        }
    }
    else if(element==='price'){
        if(value<1){
            document.getElementById(('priceerr'+index).toString()).style.display="block";
        }
        else{
            document.getElementById(('priceerr'+index).toString()).style.display="none";
        }
    }
    else {
        if(value<1){
            document.getElementById(('quantityerr'+index).toString()).style.display="block";
        }
        else{
            document.getElementById(('quantityerr'+index).toString()).style.display="none";
        }
    }


}

//if any error message is shown then disable the submit btn 
function disablesubmitmanual(){
    let f=1;let e=0;
    var errors=['typeerr','priceerr','quantityerr']
    for(var element=0;element<manualblood.length;element++){
       if(document.getElementById((errors[0]+[element]).toString()).style.display==='block'||document.getElementById((errors[1]+[element]).toString()).style.display==='block'||document.getElementById((errors[2]+[element]).toString()).style.display==='block'){ 
            e=1;
            break;
        }
        
        e=0;
        
    }
    
    for(var i=0;i<manualblood.length;i++){
        
        if(manualblood[i].type===''||manualblood[i].quantity===''||manualblood[i].price===''){
            f=1;
            
            break;
        }
        f=0;
    }
    if(f||e){
        document.getElementsByClassName('submitbtnmedblood')[0].classList.add('disabledbtn');
    }else{
        document.getElementsByClassName('submitbtnmedblood')[0].classList.remove('disabledbtn');
    }
}

//if no sheet is uploaded then disable the submit btn 
function disablesubmitauto(){
    if(auto_file){
        document.getElementsByClassName('submitbtnmedblood')[0].classList.remove('disabledbtn');
    }else{
        document.getElementsByClassName('submitbtnmedblood')[0].classList.add('disabledbtn');
    }
}
//submit the manual data inputted
const submit_data=(e)=>{

    e.preventDefault();
    try{
        var blood_list;
        if(add_manual){
            blood_list=manualblood;
        }else{
            blood_list=autoblood;
        }
        const api='http://localhost:5000/api/bloodbank/addbloodgroup';
        let data={name:sessionStorage.getItem('org_name'),address:sessionStorage.getItem('org_address'),blood_list:blood_list}
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
                if (res.status === 200) {
                    alert('blood groups added successfully')
                    setmanualblood([{type:'',price:'',quantity:''},{type:'',price:'',quantity:''}])
                    var btn = document.getElementById('closebtn');
                    btn.click();
                }
                else if (res.status === 430) { alert(res.error) }

                else {  alert('Problem adding blood groups', res.error) }
            });
    }catch(err){
        console.log(err);
    }

}

//function to convert the arrays of data into data object format in a way it can be stored in database
function create_data_object(data,FieldsArray){
    return {
        type:matchcols(data,FieldsArray,'type'),
        quantity:matchcols(data,FieldsArray,'quantity'),
        price:matchcols(data,FieldsArray,'price'),
        
    }

}

//filter the keys of the data object to access the correct data to be stored
function matchcols(data,FieldsArray,Field){
    
    const pattern = new RegExp(Field, 'i');
    for(var f=0;f<FieldsArray.length;f++){
        if(pattern.test(FieldsArray[f])){
            var ind=FieldsArray[f];
            if(Field==='price'&&!data[ind]){
                return ''
            }
            return data[ind]
        }
    }return ''
}

//function to handle csv sheets
const handle_csv=()=>{
  const fileInput = document.getElementById('fileInputcsv');
  fileInput.click();
  fileInput.addEventListener('change', (e)=>{


  const selectedFile = e.target.files[0];

    if(selectedFile){
    
    setauto_file(selectedFile.name)
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {

        var result=results.data;
        
        var FieldsArray=Object.keys(result[0]);
        var blood=[]
        // Iterating data to get column name and their values
        result.map((d) => {

            var data_object=create_data_object(d,FieldsArray)
            console.log('the do created',data_object)
            if (
                data_object.type!=''&&
                data_object.quantity!=''
                
            ){blood.push(data_object);}
          
        });
        setautoblood(blood)
        
      },
    });}
    else{
    alert('no file selected')
    }
});
}

//function to handle json sheets
const handle_json=()=>{}

return(
<>
<div className="grayarea">
    <div id="addmed_container">
        <div id="topbarmedsblood">
            <h1>Add Blood groups</h1>
            <div id="closebtn" onClick={()=>{close(true)}} ><h2>+</h2></div>
        </div>
        <div id="addmeds_area">
            <div id="tabs_add">
                <div id="manual_add" className="active_tabblood" onClick={change_tab}>
                    <h2 id="manual_add">Add Manually</h2>
                </div>
                <div id="sheet_add" className="idle_tabblood" onClick={change_tab}>
                    <h2 id="sheet_add">Upload Sheet</h2>
                </div>
            </div>

            <div id="addmedcontentblood">
{add_manual &&
                <div id="area">
                    <div className="top_bar_add_medblood">
                        <h3>Add Data Manually</h3>
                        <button className="submitbtnmedblood " onClick={submit_data}>Submit</button>
                        <div><GrHelp className="icon"/></div>
                    </div>
                    <div className="add_area_meds">
                        <form>
                            <div className="super_med_div">
{
                            manualblood.map((i,index)=>{

                                return(
                                    <div className="med-divblood" id={'med-divblood'+index}>
                                        <div className="medno">
                                            <h3>Blood Type {index+1}</h3>
                                            <div className="closebtn" id={index+1} onClick={closebtn}><h3>+</h3></div>
                                        </div>
                                        
                                        <div className="med">
                                            <h6 id={"typeerr"+index}>Type cannot begin with special characters or numbers</h6>
                                            <div className="form-fields">
                                                <label>Type: </label>
                                                <input className="inputm" type="text" name="type" value={i.type} onChange={changeinfo} id={index}/>
                                            </div>
                                            <h6 id={"priceerr"+index}>Please enter a valid price</h6>
                                            <div className="form-fields">
                                                <label>Price: </label>
                                                <input className="inputm" type="number" name="price" value={i.price} onChange={changeinfo} id={index}/>
                                            </div>
                                            <h6 id={"quantityerr"+index}>Quantity cannot be less than 1</h6>
                                            <div className="form-fields">
                                                <label>Quantity: </label>
                                                <input className="inputm" type="number" name="quantity" value={i.quantity} onChange={changeinfo} id={index} />
                                            </div>

                                        </div>
                                    </div>

    )
})

}

                                    <button className="more-btnblood" onClick={addmoredivs}>+</button>
                            </div>
                        </form>
                    </div>
                </div>
}

{!add_manual &&
                <div id="area">
                    <div className="top_bar_add_medblood">
                        <h3>Add Data by Uploading Sheet</h3>
                        <button className="submitbtnmedblood " onClick={submit_data}>Submit</button>
                        <div><GrHelp className="icon"/></div>
                        
                    </div>
                    <div className="add_area_meds">
                        <h5>Choose how you want to upload your data through just one click!</h5>
                        <h5>Uploaded file : {auto_file} </h5>
                        <div className="add_med_btns">
                            <button id="csv" className="upload_btnblood" onClick={handle_csv}  >Upload CSV /Excel</button>
                            <input type="file" id="fileInputcsv"  name="file"></input>
                            <span>--------------------------------------or----------------------------------------</span>
                            <button id="json" className="upload_btnblood" onClick={handle_json}>Upload JSON</button>
                            <input type="file" id="fileInputjson" accept=".json" name="file"></input>
                        </div>
                        <h5>Having a hard time uploading data ? <a className="fplink">Click here for help</a></h5>
                    </div>
                </div>
}
            </div>
        </div>
    </div>

</div>

</>
)
}
export default Addbloodgroup;