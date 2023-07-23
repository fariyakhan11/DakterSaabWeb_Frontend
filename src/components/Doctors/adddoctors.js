import React from "react";
import '../Medicines/medicines.css';
import './doctors.css';
import { useState } from "react";
import { useEffect } from "react";
import {GrHelp} from "react-icons/gr";
import Papa from "papaparse";
import validator from "validator";

function Adddoctors({close}){

//auto doctor name    
    const [auto_file, setauto_file]=useState('');
//auto doctors data
    const [autodoc, setautodoc]=useState([{name:'',email:'',fee:'',education:'',experience:'',speciality:'',department:'',availability:[{day:'Monday',time:''},{day:'Tuesday',time:''},{day:'Wednesday',time:''},{day:'Thursday',time:''},{day:'Friday',time:''},{day:'Saturday',time:''},{day:'Sunday',time:''}]}]);

//Method in which the data shall be entered by default Manual so true otherwise false   
    const [add_manual, set_manual_tab]=useState(true);

//manual doctor data
    const [manualdoc,setmanualdoc]=useState([{name:'',email:'',fee:'',education:'',experience:'',speciality:'',department:'',availability:[{day:'Monday',time:''},{day:'Tuesday',time:''},{day:'Wednesday',time:''},{day:'Thursday',time:''},{day:'Friday',time:''},{day:'Saturday',time:''},{day:'Sunday',time:''}]}])


//initially set manual doctor add tab to active    
useEffect(()=>{
    document.getElementById('manual_add').classList.add('active_tabhospital');
    document.getElementsByClassName('submitbtnmedhospital')[0].classList.add('disabledbtn')
},[])

//if manual med div have only one med input div displayed you cannot close it 
useEffect(()=>{
    if(add_manual){
        if(manualdoc.length<=1){document.getElementsByClassName('closebtn')[0].style.display='none';}
        else{document.getElementsByClassName('closebtn')[0].style.display='flex';}
    }
})
//check whether to disable or enable the submit medicine data btn whenever the medicine inputs are updated
useEffect(()=>{
    if(add_manual){
    disablesubmitmanual();}
},[manualdoc])

//check whether to disable or enable the submit medicine data btn whenever the medicine inputs are updated
useEffect(()=>{
    if(!add_manual){
    disablesubmitauto();
    console.log('the doctors are',autodoc)
}
},[autodoc])

//change the method the data is entered
const change_tab=(e)=>{
        
        
        let x=document.getElementsByClassName('active_tabhospital')[0];
        if(x){
            x.classList.remove('active_tabhospital');
            x.classList.add('idle_tabhospital');
        }

        let f=e.target.id;
        document.getElementById(f).classList.add('active_tabhospital');
        document.getElementById(f).classList.remove('idle_tabhospital');
        if(e.target.id==='manual_add'){
            set_manual_tab(true);
            setauto_file('');
            setmanualdoc([{name:'',email:'',fee:'',education:'',experience:'',speciality:'',department:'',availability:[{day:'Monday',time:''},{day:'Tuesday',time:''},{day:'Wednesday',time:''},{day:'Thursday',time:''},{day:'Friday',time:''},{day:'Saturday',time:''},{day:'Sunday',time:''}]}])
        }
        else{
            set_manual_tab(false);
            setautodoc([{name:'',email:'',fee:'',education:'',experience:'',speciality:'',department:'',availability:[{day:'Monday',time:''},{day:'Tuesday',time:''},{day:'Wednesday',time:''},{day:'Thursday',time:''},{day:'Friday',time:''},{day:'Saturday',time:''},{day:'Sunday',time:''}]}])
            setmanualdoc([{name:'',email:'',fee:'',education:'',experience:'',speciality:'',department:'',availability:[{day:'Monday',time:''},{day:'Tuesday',time:''},{day:'Wednesday',time:''},{day:'Thursday',time:''},{day:'Friday',time:''},{day:'Saturday',time:''},{day:'Sunday',time:''}]}])
        }
}
//add more manual medicine add divs
const addmoredivs = (e) => {
  setmanualdoc(prevState => [...prevState, {name:'',email:'',fee:'',education:'',experience:'',speciality:'',department:'',availability:[{day:'Monday',time:''},{day:'Tuesday',time:''},{day:'Wednesday',time:''},{day:'Thursday',time:''},{day:'Friday',time:''},{day:'Saturday',time:''},{day:'Sunday',time:''}]}]);
    e.preventDefault();
};

//update the info for the medicines input    
const changeinfo = (e) => {
  const { id, name, value } = e.target;
  if (name === 'availability') {
    setmanualdoc((prevState) => {
      return prevState.map((item, index) => {
        if (index === parseInt(id)) {
          return {
            ...item,
            [name]: item.availability.map((i, ind) => {
              if (i.day === e.target.className) {
                return { ...i, ['time']: value };
              }
              return i;
            }),
          };
        }
        return item;
      });
    });
  } else {
    setmanualdoc((prevState) => {
      return prevState.map((item, index) => {
        if (index === parseInt(id)) {
          return { ...item, [name]: value };
        }
        return item;
      });
    });
    verify(name, value, id);
  }

};

useEffect(()=>{
  console.log(manualdoc);
},[manualdoc])


//close the medicine div if the close btn is clicked
const closebtn = (e) => {
  const updatedManualdoc = [...manualdoc];
  updatedManualdoc.splice(e.target.id-1, 1);
  setmanualdoc(updatedManualdoc);

}

//verify the content of data being sent
function verify(element,value,index){
    const name_expression =/^[A-Za-z]+$/;

    if(element=='name'){
        
        if(name_expression.test(value[0])){
            document.getElementById(('nameerr'+index).toString()).style.display="none";
        }
        else{
            document.getElementById(('nameerr'+index).toString()).style.display="block";
        }
    }
        else if (element === 'email') {
            if (!validator.isEmail(value)) {
                document.getElementById(('emailerr'+index).toString()).style.display="block";
            }
            else { 
                document.getElementById(('emailerr'+index).toString()).style.display="none";
             }
        }


}

//if any error message is shown then disable the submit btn 
function disablesubmitmanual(){
    let f=1;let e=0;
    var errors=['nameerr','emailerr']
    for(var element=0;element<manualdoc.length;element++){
       if(document.getElementById((errors[0]+[element]).toString()).style.display==='block'||document.getElementById((errors[1]+[element]).toString()).style.display==='block'){ 
            e=1;
            break;
        }
        
        e=0;
        
    }
    
    for(var i=0;i<manualdoc.length;i++){
        
        if(manualdoc[i].name===''||manualdoc[i].speciality===''||manualdoc[i].experience===''||manualdoc[i].education===''||manualdoc[i].department===''||manualdoc[i].fee===''){
            f=1;
            
            break;
        }
        f=0;
    }
    if(f||e){
        document.getElementsByClassName('submitbtnmedhospital')[0].classList.add('disabledbtn');
    }else{
        document.getElementsByClassName('submitbtnmedhospital')[0].classList.remove('disabledbtn');
    }
}

//if no sheet is uploaded then disable the submit btn 
function disablesubmitauto(){
    if(auto_file){
        document.getElementsByClassName('submitbtnmedhospital')[0].classList.remove('disabledbtn');
    }else{
        document.getElementsByClassName('submitbtnmedhospital')[0].classList.add('disabledbtn');
    }
}
//submit the  data inputted
const submit_data=(e)=>{

    e.preventDefault();
    try{
        var doc_list;
        if(add_manual){
            doc_list=manualdoc;
        }else{
            doc_list=autodoc;
        }
        const api='http://localhost:5000/api/hospital/adddoc';
        let data={org_name:sessionStorage.getItem('org_name'),org_address:sessionStorage.getItem('org_address'),doc_list:doc_list}
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
                if (res.status === 200) {
                    alert('Doctors added successfully')
            setmanualdoc([{name:'',email:'',fee:'',education:'',experience:'',speciality:'',department:'',availability:[{day:'Monday',time:''},{day:'Tuesday',time:''},{day:'Wednesday',time:''},{day:'Thursday',time:''},{day:'Friday',time:''},{day:'Saturday',time:''},{day:'Sunday',time:''}]}])
            set_manual_tab(false);
            setautodoc([{name:'',email:'',fee:'',education:'',experience:'',speciality:'',department:'',availability:[{day:'Monday',time:''},{day:'Tuesday',time:''},{day:'Wednesday',time:''},{day:'Thursday',time:''},{day:'Friday',time:''},{day:'Saturday',time:''},{day:'Sunday',time:''}]}])
                    var btn = document.getElementById('closebtn');
                    btn.click();
                }
                

                else {  alert('Problem adding doctors') }
            });
    }catch(err){
        console.log(err);
    }

}

//function to convert the arrays of data into data object format in a way it can be stored in database
function create_data_object(data,FieldsArray){
    return {
        name:matchcols(data,FieldsArray,'name'),
        email:matchcols(data,FieldsArray,'email'),
        fee:matchcols(data,FieldsArray,'fee'),
        education:matchcols(data,FieldsArray,'education'),
        speciality:matchcols(data,FieldsArray,'speciality'),
        experience:matchcols(data,FieldsArray,'experience'),
        department:matchcols(data,FieldsArray,'department'),        
        availability:matchcols(data,FieldsArray,'availability')
    }

}



//filter the keys of the data object to access the correct data to be stored
function matchcols(data,FieldsArray,Field){

    if(Field==='availability'){
        var avail=[{day:'Monday',time:matchcols(data,FieldsArray,'Monday')},
                    {day:'Tuesday',time:matchcols(data,FieldsArray,'Tuesday')},
                    {day:'Wednesday',time:matchcols(data,FieldsArray,'Wednesday')},
                    {day:'Thursday',time:matchcols(data,FieldsArray,'Thursday')},
                    {day:'Friday',time:matchcols(data,FieldsArray,'Friday')},
                    {day:'Saturday',time:matchcols(data,FieldsArray,'Saturday')},                    
                    {day:'Sunday',time:matchcols(data,FieldsArray,'Sunday')}
        ]
        return avail
    }
    else{    
        const pattern = new RegExp(Field, 'i');

        for(var f=0;f<FieldsArray.length;f++){
            if(pattern.test(FieldsArray[f])){
                var ind=FieldsArray[f];
                return data[ind]
            }
        }return ''
    }
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
        var doctors=[]
        // Iterating data to get column name and their values
        result.map((d) => {

            var data_object=create_data_object(d,FieldsArray)
            console.log('the do created',data_object)
            if (
                data_object.name!=''&&
                data_object.department!=''&&
                data_object.education!=""&&
                data_object.speciality!=''&&
                data_object.experience!=""&&
                data_object.fee!=''
                
            ){doctors.push(data_object);}
          
        });
        setautodoc(doctors)
        
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
        <div id="topbarmedshospital">
            <h1>Add Doctors</h1>
            <div id="closebtn" onClick={()=>{close(true)}} ><h2>+</h2></div>
        </div>
        <div id="addmeds_area">
            <div id="tabs_add">
                <div id="manual_add" className="idle_tabhospital" onClick={change_tab}>
                    <h2 id="manual_add">Add Manually</h2>
                </div>
                <div id="sheet_add" className="idle_tabhospital" onClick={change_tab}>
                    <h2 id="sheet_add">Upload Sheet</h2>
                </div>
            </div>

            <div id="addmedcontenthospital">
{add_manual &&
                <div id="area">
                    <div className="top_bar_add_medshospital">
                        <h3>Add Data Manually</h3>
                        <button className="submitbtnmedhospital " onClick={submit_data}>Submit</button>
                        <div><GrHelp className="icon"/></div>
                    </div>
                    <div className="add_area_meds">
                        <form>
                            <div className="super_med_divhospitaldr">
{
                            manualdoc.map((i,index)=>{

                                return(
                                    <div className="med-divhospitaldr" id={'med-divhospitaldr'+index}>
                                        <div className="medno">
                                            <h3 style={{marginLeft:'5em'}}>Doctor {index+1}</h3>
                                            <div className="closebtn" id={index+1} onClick={closebtn}><h3>+</h3></div>
                                        </div>
                                        
                                        <div className="medhospitaldr">
                                            <div className="submed">
                                                <h6 id={"nameerr"+index} className="err-hospitaldr">Name cannot begin with special characters or numbers</h6>
                                                <div className="form-fields">
                                                    <label>Name: </label>
                                                    <input className="inputm" type="text" name="name" value={i.name} onChange={changeinfo} id={index}/>
                                                </div>
                                                <h6 id={"emailerr"+index} className="err-hospitaldr">Please enter a valid email</h6>
                                                <div className="form-fields">
                                                    <label>Email: </label>
                                                    <input className="inputm" type="text" name="email" value={i.email} onChange={changeinfo} id={index}/>
                                                </div>
                                                <div className="form-fields">
                                                    <label>Education: </label>
                                                    <input className="inputm" type="text" name="education" value={i.education} onChange={changeinfo} id={index}/>
                                                </div>
                                                <div className="form-fields">
                                                    <label>Speciality: </label>
                                                    <input className="inputm" type="text" name="speciality" value={i.speciality} onChange={changeinfo} id={index}/>
                                                </div>
                                                <div className="form-fields">
                                                    <label>Experience(years): </label>
                                                    <input className="inputm" type="text" name="experience" value={i.experience} onChange={changeinfo} id={index}/>
                                                </div>
                                                <div className="form-fields">
                                                    <label>Department: </label>
                                                    <input className="inputm" type="text" name="department" value={i.department} onChange={changeinfo} id={index} />
                                                </div>
                                            </div>
                                            <div className="submed">

                                                <div className="form-fields">
                                                    <label>Fees: </label>
                                                    <input className="inputm" type="number" name="fee" value={i.fee} onChange={changeinfo} id={index} />
                                                </div>
                                                <div className="availdiv">
                                                    <div>
                                                    <label className="availabilityhead">Availability: </label>
                                                    </div>
{i.availability.map((item,ind)=>{return(
                                                    <div>
                                                    <label>{item.day}: </label>
                                                    <input className={item.day} type="text" name="availability" value={item.time} onChange={changeinfo} id={index} />
                                                    </div>
)})}

                                                </div>
                                            </div>
                                        </div>
                                    </div>

    )
})

}
                                    <div className="btndivhosdr">
                                        <button className="more-btnhospital" onClick={addmoredivs}>+</button>
                                    </div>      
                                    
                            </div>

                        </form>
                    </div>
                </div>
}

{!add_manual &&
                <div id="area">
                    <div className="top_bar_add_medshospital">
                        <h3>Add Data by Uploading Sheet</h3>
                        <button className="submitbtnmedhospital " onClick={submit_data}>Submit</button>
                        <div><GrHelp className="icon"/></div>
                        
                    </div>
                    <div className="add_area_meds">
                        <h5>Choose how you want to upload your data through just one click!</h5>
                        <h5>Uploaded file : {auto_file} </h5>
                        <div className="add_med_btns">
                            <button id="csv" className="upload_btnhospital" onClick={handle_csv}  >Upload CSV /Excel</button>
                            <input type="file" id="fileInputcsv"  name="file"></input>
                            <span>--------------------------------------or----------------------------------------</span>
                            <button id="json" className="upload_btnhospital" onClick={handle_json}>Upload JSON</button>
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
export default Adddoctors;