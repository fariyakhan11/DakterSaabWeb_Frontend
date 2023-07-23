import React from "react";
import './newsandreports.css';
import Complaints from '../../images/chat.png'
import News from '../../images/newspaper.png'
import Requests from '../../images/request.png'
import { useState,useEffect } from "react";
import { Label } from "reactstrap";


function Newsandreports(){

const [entryform ,setentryform]=useState({form_no:'',form_date:'',form_type:'',name:'',form_title:'',form_description:'',form_department:'',resolution_description:'',resolution_date:'',resolver_name:''})

const [CNRlist ,setCNRlist ]=useState([
    {form_no:'9092',form_date:'',form_type:'Complaint',name:'',form_title:'',form_description:'',form_department:'',resolution_description:'',resolution_date:'',resolver_name:''},
    {form_no:'647',form_date:'',form_type:'News',name:'',form_title:'',form_description:'',form_department:'',resolution_description:'',resolution_date:'',resolver_name:''},
    {form_no:'23',form_date:'',form_type:'Request',name:'',form_title:'',form_description:'',form_department:'',resolution_description:'',resolution_date:'',resolver_name:''}
    ])
const [resolution_window,set_resolution_window]=useState(false)

useEffect(()=>{
    setentryform({form_no:'',form_date:generatenowdate(),form_type:'',name:'',form_title:'',form_description:'',form_department:'',resolution_description:'',resolution_date:generatenowdate(),resolver_name:''})

},[])

function generatenowdate(){
    var datenow=new Date();
    datenow=datenow.getDate()+'/'+datenow.getMonth()+'/'+datenow.getFullYear()
    return datenow
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
    setentryform({form_no:CNRlist[id].form_no,form_date:CNRlist[id].form_date,form_type:CNRlist[id].form_type,entree_namename:CNRlist[id].entree_name,form_title:CNRlist[id].form_title,form_description:CNRlist[id].form_description,form_department:CNRlist[id].form_department,resolution_description:CNRlist[id].resolution_description,resolution_date:CNRlist[id].resolver_name!=''?CNRlist[id].resolution_date:generatenowdate(),resolver_name:CNRlist[id].resolver_name})
    set_resolution_window(true)
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
                    <h3 className="contentareatitle">Complaints, News and Requests</h3>
                    <hr/>

                <div id="NRC">
                    <div>
                        <div>
                            <div id="searchoptions">
                                <div id="name-options" className="options_cont">
                                    <select >
                                        <option value='' disabled selected>Name</option>
                                        <option>All</option>
                                        <option>Sara</option>
                                        <option>Farooq</option>
                                    </select>
                                </div>
                                <div id="dep-options" className="options_cont">
                                    <select >
                                        <option value='' disabled selected>Department</option>
                                        <option>All</option>
                                        <option>Sara</option>
                                        <option>Farooq</option>
                                    </select>
                                </div>
                                <div id="date-options" className="options_cont">
                                    <select >
                                        <option value='' disabled selected>Date</option>
                                        <option>All</option>
{[...Array(31).keys()].map((num) => num + 1).map((i,index)=>{
                                        return(
                                            <option id={index} value={index}>{i}</option>
                                        )
})}

                                    </select>
                                </div>
                                <div id="date-options" className="options_cont">
                                    <select >
                                        <option value='' disabled selected> Month</option>
                                        <option>All</option>
{['January','February','March','April','May','June','July','August','September','October','November','December'].map((i,index)=>{
                                        return(
                                            <option id={index} value={index}>{i}</option>
                                        )


})}

                                    </select>
                                </div>
                                <div id="date-options" className="options_cont">
                                    <select >
                                        <option value='' disabled selected>Year</option>
                                        <option>All</option>
{[...Array(2034-1990+1).keys()].map((num) => num + 1990).map((i,index)=>{
                                        return(
                                            <option id={index} value={index}>{i}</option>
                                        )


})}
                                    </select>
                                </div>
                            </div>
                                
                                
                                <div className="bookdiv6">
                                    <div id="CNRstats">
{CNRlist.map((i,index)=>{return(
                                        <div className={i.form_type=='Complaint'?"complaintstats":i.form_type=='News'?'newstats':'requeststats'} id={index} onClick={show_details_and_resolution} >
                                            <img src={i.form_type=='Complaint'?Complaints:i.form_type=='News'?News:Requests}id={index}></img>
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
                                <div><img src={Complaints}></img></div>
                                <div><img src={Requests}></img></div>
                                <div><img src={News}></img></div>
                            </div>
                            <div id="NRC_formArea">
                                <h1>Entry Form</h1>
                                <div id="NRC_formAreaFormContainer">
                                    <div id="form_identification">
                                        <div>
                                        <label>Form Number</label>
                                        <h2>#{entryform.form_no}</h2>
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
                                            <option value='Complaint'>Complaint</option>
                                            <option value='Request'>Request</option>
                                            <option value='News'>News</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Department </label>
                                        <select value={entryform.form_department} onChange={handleentryformvalue} id="form_department">
                                            <option value='Complaint'>Complaint</option>
                                            <option value='Request'>Request</option>
                                            <option value='News'>News</option>
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
                                        <button>Submit</button>
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