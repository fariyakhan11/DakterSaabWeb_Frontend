import React, { useState } from "react";
import './notes.css'
import NotesImg from '../../images/notes.png';
function Notes(){

const [note_title,setnote_title]=useState('Untitled')
const [note_content,setnote_content]=useState('')

const closenote=()=>{
    document.getElementById('notesdisplay').style.display='none'
    setnote_content('');
    setnote_title('Untitled');
}
return(
<>
        <div id="Notesdashboard">
                    <div className="contentarea">
                    <h3 className="contentareatitle">Notes</h3>
                    <hr/>
                    <div className="infomeds">
                      <div className="medscontainer">
                          <div className="notesdiv">
                            <div className="topareanote">
                                <div className="noteimg">
                                  <img  src={NotesImg}></img>
                                </div>
                                <div className="sideareamed"></div>
                            </div>
                            <h4 className="Notestitle">Notes 1</h4>
                          </div>
                          <div className="notesdiv">
                              
                          </div>
                          <div className="notesdiv">
                              
                          </div>
                          <div className="notesdiv">
                              
                          </div>
                          <div className="notesdiv">
                              
                          </div>
                          <div className="notesdiv">
                              
                          </div>
                          <div className="notesdiv">
                              
                          </div>
                      </div>
                    </div>    
                    </div>

                    <div className="controlbtns">
                        <div id="addstock" className="stockoperation">
                            <div id="addMedicines" className="stockopicon" onClick={()=>{document.getElementById('notesdisplay').style.display='flex'}}>
                            <h4>+</h4>
                            </div>
                            <div className="stockoptitle"><h4>Create New Note</h4></div>
                        </div>
                        <div id="delstock" className="stockoperation">
                            <div id="delMedicines"  className="stockopicon">
                            <h4 >+</h4>
                            </div>
                            <div className="stockoptitle"> 
                            <h4>Delete Selected Notes</h4>
                            </div>
                        </div>
                    </div>
                    <div id="notesdisplay">
                        <div id="closebtn" onClick={closenote}><h2>+</h2></div>
                        <div className="notesdisplay">
                            <div className="topnotebar">
                                <input type='text' value={note_title} id="notetitle"onChange={(e)=>{setnote_title(e.target.value)}}/>   
                            </div><hr/>
                            <div className="notearea">
                                <textarea id="notecontent" value={note_content} onChange={(e)=>{setnote_content(e.target.value)}}></textarea>
                            </div><hr/>
                            <div className="bottomnotebar">
                                <button id="imguploadbtn">Upload Image</button>
                                <button id="savebtn">Save Note</button>
                            </div>
                            
                        </div>
                    </div>


        </div>
      </>
)
}
export default Notes;