import React, { cloneElement } from "react";
import './newsandreports.css';
import Complaints from '../../images/chat.png'
import News from '../../images/newspaper.png'
import Requests from '../../images/request.png'
import { useState,useEffect } from "react";
import { Label } from "reactstrap";
import All from '../../images/all.png'

function Newsandreports(){

    const [entryform ,setentryform]=useState({form_no:'',form_date:'',form_type:'',entree_name:'',form_title:'',form_description:'',form_department:'',resolution_description:'',resolution_date:'',resolver_name:''})
    const [department_list,setdepartment_list]=useState([]);
    const [CNRlist ,setCNRlist ]=useState([
    //    {form_no:'',form_date:'',form_type:'',name:'',form_title:'',form_description:'',form_department:'',resolution_description:'',resolution_date:'',resolver_name:''},
   ])
    const [resolution_window,set_resolution_window]=useState(false)
    const [fetched_list,setfetched_list]=useState([])

useEffect(()=>{
    setentryform({form_no:'',form_date:generatenowdate(),form_type:'',entree_name:'',form_title:'',form_description:'',form_department:'',resolution_description:'',resolution_date:generatenowdate(),resolver_name:''})
    fetchforms()
    fetchdepartments()
    
},[])

function generatenowdate(){
    var datenow=new Date();
    datenow=datenow.getDate()+'/'+datenow.getMonth()+'/'+datenow.getFullYear()
    return datenow
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

const handleentryformvalue = (e) => {
  setentryform((prevform) => ({ ...prevform, [e.target.id]: e.target.value }));
 
};
useEffect(() => {
  console.log(entryform);
}, [entryform]);

const close_resolution_area=()=>{
    setentryform({form_no:'',form_date:generatenowdate(),form_type:'',entree_name:'',form_title:'',form_description:'',form_department:'',resolution_description:'',resolution_date:generatenowdate(),resolver_name:''})
    set_resolution_window(false)
}

const show_details_and_resolution=(e)=>{
    var id=e.target.id
    setentryform({form_no:CNRlist[id].form_no,form_date:CNRlist[id].form_date,form_type:CNRlist[id].form_type,entree_name:CNRlist[id].name,form_title:CNRlist[id].form_title,form_description:CNRlist[id].form_description,form_department:CNRlist[id].form_department,resolution_description:CNRlist[id].resolution_description,resolution_date:CNRlist[id].resolver_name!=''?CNRlist[id].resolution_date:generatenowdate(),resolver_name:CNRlist[id].resolver_name})
    set_resolution_window(true)
}

const filterNCR = (e) => {
  if (e.target.id === 'All') {
    setCNRlist(fetched_list)
    document.getElementsByClassName('selectedformtype')[0].classList.remove('selectedformtype');
    document.getElementsByClassName(e.target.id+'div')[0].classList.add('selectedformtype');
  } else {
    var filteredForms = fetched_list.filter((o) => o.formtype === e.target.id);
    setCNRlist(filteredForms);
    document.getElementsByClassName('selectedformtype')[0].classList.remove('selectedformtype');
    document.getElementsByClassName(e.target.id+'div')[0].classList.add('selectedformtype');
    
  }
};

const filterbydate=(e)=>{
    if (e.target.value === '') {
        setCNRlist(fetched_list)
      } else {
        var filteredForms = fetched_list.filter((o) => o.form_date.split('/')[0] === e.target.value);
        setCNRlist(filteredForms);
      } 
}

const filterbydep=(e)=>{
    if (e.target.value === '') {
        setCNRlist(fetched_list)
      } else {
        var filteredForms = fetched_list.filter((o) => o.form_department === e.target.value);
        setCNRlist(filteredForms);
      } 

}

const filterbymonth =(e)=>{
    if (e.target.value === '') {
        setCNRlist(fetched_list)
      } else {
        var filteredForms = fetched_list.filter((o) => o.form_date.split('/')[1] === e.target.value);
        setCNRlist(filteredForms);
      } 
}

const filterbyyear =(e)=>{
    if (e.target.value === '') {
        setCNRlist(fetched_list)
      } else {
        var filteredForms = fetched_list.filter((o) => o.form_date.split('/')[2] === e.target.value);
        setCNRlist(filteredForms);
      } 
}

const filterbyname =(e)=>{
    if (e.target.value === '') {
        setCNRlist(fetched_list)
      } else {
        var filteredForms = fetched_list.filter((o) => o.entree_name === e.target.value);
        setCNRlist(filteredForms);
      } 
}

//fetch orders from the database
function fetchforms(){
    try{
        const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        const api='http://localhost:5000/api/hospital/getforms/'+params;
        fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json()) // get response, convert to json
        .then((json) => {
        if(json.forms){
            console.log(json.forms)
          setCNRlist(json.forms);
          setfetched_list(json.forms);

          const formNumbers = fetched_list.map(item => item.form_no); // Extract form_no values
        
          setentryform((prevform) => ({ ...prevform, ['form_no']: Math.max(...formNumbers) }));

        }else{
            setentryform((prevform) => ({ ...prevform, ['form_no']: 1 }));
            setCNRlist([]);setfetched_list([])}
        if(json.error){console.log(json.error)}
      });
    }catch(err){
      console.log(err)
    }
}

const submitNCRform=(e)=>{
    
    
    alert(entryform.form_date,entryform.form_department,entryform.form_no,entryform.form_type,entryform.form_title)
    
        try{
            alert('ok')    
            const api='http://localhost:5000/api/hospital/storeforms';
            let data={org_name:sessionStorage.getItem('org_name'),org_address:sessionStorage.getItem('org_address'),depinfo:entryform}
            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => {
                    if (res.status === 200) {
                        alert('Form added successfully')
                        setentryform({form_no:'',form_date:generatenowdate(),form_type:'',entree_name:'',form_title:'',form_description:'',form_department:'',resolution_description:'',resolution_date:'',resolver_name:''})
                        fetchforms()
                    }
                    
    
                    else {  alert('Problem adding forms') }
                });
        }catch(err){
            console.log(err);
        }      
    

}
return(
<>
        <div id="Newsandreportsdashboard">
{resolution_window && 
            <div id="detailandresolutiongrayarea">
                <div id="detailandresolution">
                    <div id='detailandresolutiontopheader'>
                        <h2>Details and Resolution</h2>
                        <div id="closealert" onClick={close_resolution_area}  >
                            <h2>+</h2>
                        </div>
                    </div>
                    <div id="detailandresolutioncontent">
                        <div id="entry-form-det">
                            <div id="form-des-det">
                                <div>
                                    <Label>Form Number</Label>
                                    <h2>#{entryform.form_no}</h2>
                                </div>
                                <div>
                                    <Label>Form Type</Label>
                                    <h2>{entryform.form_type}</h2>
                                </div>
                                <div>
                                    <Label>Entry Form Date</Label>
                                    <h2>{entryform.form_date}</h2>
                                </div>
                            </div>
                            <div>
                                <Label>Name of Person filling the entry form</Label>
                                <h2>{entryform.entree_name}</h2>
                            </div>
                            <div>
                                <Label>Title</Label>
                                <h2>{entryform.form_title}</h2>
                            </div>
                            <div>
                                <Label>Description</Label>
                                <h2>{entryform.form_description}</h2>
                            </div>
                        </div>
                        <hr></hr>
                        <div id="ResolutionForm">
                            <div>
                                <div>
                                    <h1>Resolution Form</h1>
                                </div>
                                <div>
                                    <label>Date</label>
                                    <h2 id="form_date">{entryform.resolution_date}</h2>
                                </div>
                                <div>
                                    <label>Name </label>
                                    <input type="text" placeholder="Your Name" value={entryform.resolver_name} onChange={handleentryformvalue} id="name"></input>
                                </div>
                                <div>
                                    <label>Description </label>
                                    <input type="textarea" value={entryform.resolution_description} onChange={handleentryformvalue} id="form_description"></input>
                                </div>
                                <div>
                                    <button>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
            <div className="contentarea" >
                    <h3 className="contentareatitle">Complaints and Requests</h3>
                    <hr/>

                <div id="NRC">
                    <div>
                        <div>
                            <div id="searchoptions">

                                <div id="dep-options" className="options_cont">
                                    

                                    <select  name="department" id="depinputdiv" onChange={filterbydep}>
                                        <option key='' value='' >
                                            Department
                                        </option>
                                        {department_list.map((department) => (
                                        <option key={department.name} value={department.name}>
                                            {department.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <div id="date-options" className="options_cont">
                                    <select onChange={filterbydate} >
                                        <option value='' >Date</option>
                                        <option>All</option>
{[...Array(31).keys()].map((num) => num + 1).map((i,index)=>{
                                        return(
                                            <option id={index} value={i}>{i}</option>
                                        )
})}

                                    </select>
                                </div>
                                <div id="date-options" className="options_cont">
                                    <select onChange={filterbymonth}>
                                        <option value='' > Month</option>
                                        <option>All</option>
{['January','February','March','April','May','June','July','August','September','October','November','December'].map((i,index)=>{
                                        return(
                                            <option id={index} value={index+1}>{i}</option>
                                        )


})}

                                    </select>
                                </div>
                                <div id="date-options" className="options_cont">
                                    <select onChange={filterbyyear}>
                                        <option value='' >Year</option>
                                        <option>All</option>
{[...Array(2034-1990+1).keys()].map((num) => num + 1990).map((i,index)=>{
                                        return(
                                            <option id={index} value={i}>{i}</option>
                                        )


})}
                                    </select>
                                </div>
                            </div>
                                
                                
                                <div className="bookdiv6">
                                    <div id="CNRstats">
{CNRlist.map((i,index)=>{return(
                                        <div className={i.form_type=='Complaint'?"complaintstats":'requeststats'} id={index} onClick={show_details_and_resolution} >
                                            <img src={i.form_type=='Complaint'?Complaints:Requests}id={index}></img>
                                            <div id={index}>
                                                <h3 id={index} >{i.form_type}</h3>
                                                <h2 id={index} >{i.form_title}</h2>
                                            </div>
                                            <div className="depnamestats" id={index}>
                                                <h4 id={index}>{i.form_department+' Department'}</h4>
                                                <h4 id={index}>{i.form_date}</h4>
                                                <h4 id={index}>{i.entree_name}</h4>
                                            </div>
                                        </div>
)})}


                                    </div>
                                </div>
                            
                        </div>



                        <div id="NRC_secondDiv">
                            <div id="filterbaricons">
                                <div id='All' className="Alldiv selectedformtype" onClick={filterNCR}><img src={All} id='All'></img></div>
                                <div id='Complaint' className="Complaintdiv" onClick={filterNCR}><img src={Complaints} id='Complaint'></img></div>

                                <div id="Request" className="Requestdiv" onClick={filterNCR}><img src={News} id="Requests"></img></div>
                            </div>
                            <div id="NRC_formArea">
                                <h1>Entry Form</h1>
                                <div id="NRC_formAreaFormContainer">
                                    <div id="form_identification">
                                        <div>
                                        <label>Form Number</label>
                                        <h2>{'#'+entryform.form_no}</h2>
                                        </div>
                                        <div>
                                        <label>Date</label>
                                        <h2 id="form_date">{entryform.form_date}</h2>
                                        </div>
                                    </div>
                                    <div id="null_values_alert" className="null_values_alert_hide">
                                        <h1 id="null_values">Please fill in all the fields</h1>
                                    </div>
                                    <div>
                                        <label>Form Type </label>
                                        <select value={entryform.form_type} onChange={handleentryformvalue} id="form_type">
                                            <option value='' disabled>Select form type</option>
                                            <option value='Complaint'>Complaint</option>
                                            <option value='Request'>Request</option>

                                        </select>
                                    </div>
                                    <div>
                                        <label>Department </label>
                                        <select value={entryform.form_department} onChange={handleentryformvalue} id="form_department">
                                            <option key='' value=''>
                                            
                                            </option>                                        
                                            {department_list.map((department) => (
                                            <option key={department.name} value={department.name}>
                                                {department.name}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label>Name </label>
                                        <input type="text" placeholder="Your Name" value={entryform.entree_name} onChange={handleentryformvalue} id="entree_name"></input>
                                    </div>
                                    <div>
                                        <label>Title </label>
                                        <input type="text" value={entryform.form_title} onChange={handleentryformvalue} id="form_title"></input>
                                    </div>
                                    <div>
                                        <label>Description </label>
                                        <input type="textarea" value={entryform.form_description} onChange={handleentryformvalue} id="form_description"></input>
                                    </div>
                                    <div>
                                        <button onClick={submitNCRform}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
   
                </div>
            
        </div>
</>
)
}
export default Newsandreports;