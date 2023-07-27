import React from "react";
import './profilepharmacy.css';
import PharmP from '../../images/drugs1.png'
import { useState,useEffect } from "react";


function Profilepharmacy(){

return(
<>
        <div id="Profilepharmacydashboard">
            <div className="contentarea" >
                    <h3 className="contentareatitle">My Profile</h3>
                    <hr/>

                <div id="profilediv">
                    <div>
                        <div id="boldinfodiv">
                            <div id="profimgdiv">
                                <div><img src={PharmP}></img></div>
                            </div>
{edit_view&&
                            <div id="maincontentdiv">

                                <div id="Namediv">
                                    <div>
                                        <h6 id="nameerr">Name cannot contain special characters or numbers</h6>
                                        <input type='text' placeholder="Enter Name" value={doctorinfo.name} onChange={handleinput} name="name"/>
                                    </div>
                                </div>
                                <div id="Phonediv">
                                    <div>
                                    <   input  value={doctorinfo.phone} onChange={handleinput} name="phone" type="number" minLength={10} placeholder="3** *******" />
                                    </div>
                                </div>
                                <div id="Emaildiv">
                                    <div>
                                        <h6 id="emailerr">Email is not valid</h6>
                                        <input type="email" placeholder="Enter Email" value={doctorinfo.email} onChange={handleinput} name="email"/>
                                    </div>
                                </div>
                                <div id="Educationdiv">
                                    <div>
                                        <h6 id="eduerr">Education cannot contain special characters or numbers</h6>
                                        <input type='text' placeholder="Enter Education" value={doctorinfo.education} onChange={handleinput} name="education"/>
                                    </div>
                                </div>
                            </div>
}
{!edit_view&&
                            <div id="maincontentdiv">
                                <div id="Namediv">
                                <h2>{sessionStorage.getItem('org_name')}</h2>
                                </div>
                                <div id="Phonediv">
                                <h2>{sessionStorage.getItem('phone')}</h2>
                                </div>
                                <div id="Emaildiv">
                                <h2>{sessionStorage.getItem('email')}</h2>
                                </div>
                                <div id="Educationdiv">
                                <h2>{sessionStorage.getItem('Education')}</h2>
                                </div>
                            </div>
}
                            <div id="editsection">
                                <div id="editstock" className="stockoperation" onClick={()=>{set_edit_view(true)}}>
                                    <div id="editMedicines" className="stockopiconmedicine">
                                    <img src={EditP}></img>
                                    </div>
                                    <div className="stockoptitle"><h4>Edit Information</h4></div>
                                </div>
                            </div>
                        </div>
{edit_view&&
                        <div id="profinfodiv">
                            <h6 id='pwerr'>Password is too short</h6>
                            <div id="Passworddiv">
                                <h1>Password:</h1>
                                <input value={doctorinfo.password} onChange={handleinput} name="password" minLength={8} type="password" placeholder="Enter password"/>
                            </div>
                            <h6 id="speerr">Speciality cannot contain special characters or numbers</h6>
                            <div id="Specialitydiv">
                                <h1>Speciality:</h1>
                                <input value={doctorinfo.speciality} onChange={handleinput} name="speciality" placeholder="Enter speciality" type="text"/>
                            </div>
                            <h6 id="experr">Experience cannot be empty and only contain numbers</h6>
                            <div id="Experiencediv">
                                <h1>Experience (in years):</h1>
                                <input value={doctorinfo.experience} onChange={handleinput} name="experience" placeholder="Enter experience" type="text"/>
                            </div>
                            <div id="Descriptiondiv">
                                <h1>Description:</h1>
                                <textarea value={doctorinfo.description} onChange={handleinput} name="description" placeholder="Enter description" type="text"/>
                                </div>
                            <h6 id="hoserr">Hospital Name cannot contain special characters or numbers</h6>
                            <div id="Hospitaldiv">
                                <div>
                                    <h1>Hospitals:</h1>
                                </div>
                                <div>
                                    <div id="addhosbtn" onClick={addhosdiv}><div><h5>+</h5></div><h4>Add Hospitals</h4></div>
                                </div>
                            </div>
{doctorinfo.hospital.map((i,index)=>{return(<>
                            <div id="Hospitaldiv">

                                <div>
{doctorinfo.hospital.length>1&&
                                    <div className="removehosbtn" id={index} onClick={removehosdiv}><div id={index} ><h5 id={index} >+</h5></div></div>     
}                               
                                </div>

                                <div>
                                    <input value={i} onChange={handleinput} name="hospital" type="text" id={index} placeholder="Enter hospital name"/>
                                </div>
                            </div>  
</>)})}
 
         
                        </div>
}
{!edit_view&&
                        <div id="profinfodiv">
                            <div id="Passworddiv">
                            <h1>Password:</h1>
                            <h2>{sessionStorage.getItem('org_name')}</h2>
                            </div>
                            <div id="Specialitydiv">
                            <h1>Speciality:</h1>
                            <h2>{sessionStorage.getItem('org_name')}</h2>
                            </div>
                            <div id="Experiencediv">
                            <h1>Experience (in years):</h1>
                            <h2>{sessionStorage.getItem('org_name')}</h2>
                            </div>
                            <div id="Descriptiondiv">
                            <h1>Description:</h1>
                            <h2>{sessionStorage.getItem('org_name')}</h2>
                            </div>
                            <div id="Ratingsdiv">
                            <h1>Ratings:</h1>
                            <h2>{sessionStorage.getItem('org_name')}</h2>
                            </div>
                            <div id="Hospitaldiv">
                            <h1>Hospitals:</h1>
                            <h2>{sessionStorage.getItem('hospital')}</h2>
                            </div>
          
                        </div>
}
                    </div>
{edit_view&&
                    <div>

                        <button onClick={()=>{set_edit_view(false)}}>Cancel</button>
                        <button onClick={editformsubmit}>Submit</button>
                    </div>
}
                </div>
            </div>
        </div>
</>
)
}
export default Profilepharmacy;