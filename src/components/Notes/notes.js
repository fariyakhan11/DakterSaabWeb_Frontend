import React, { useState , useEffect } from "react";
import './notes.css'
import NotesImg from '../../images/notes.png';


function Notes({overtab}){

const [note_title,setnote_title]=useState('')
const [old_note_title,setold_note_title]=useState('')
const [note_content,setnote_content]=useState('')
const [update_note,setupdate_note]=useState(false);
const [saved_notes,setsaved_notes]=useState([]);
const [notes, setnotes]=useState([{name:'',content:''}])
const [viewmode,setviewmode]=useState(true)
const [selected_note,setselected_note]=useState([])

const closenotediv=()=>{
    overtab(false)
}

//display all the notes from the database
function fetch_saved_notes(){
        try {
            const params=sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
            const api='http://localhost:5000/api/note/getnotes/'+params;
            fetch(api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => response.json()) // get response, convert to json
            .then((json) => {
            console.log('this is recieve',json.notes)
            if(json.notes){
            setsaved_notes(json.notes);
            }else{setsaved_notes([])}
          });
            } catch (err) { console.log(err); }
}

//run these operations on loading
useEffect(() => {
    console.log(note_title,old_note_title)
    fetch_saved_notes();
    setnote_content('');
    setnote_title('');
    setold_note_title('');
    setupdate_note(false);
},[])

//close the notes display
function closenote(){
    document.getElementById('notesdisplay').style.display='none'
    setnote_content('');
    setnote_title('');
    setold_note_title('');
    setupdate_note(false);
}

//save the note into the database
const savenote=(e)=>{
        e.preventDefault();
        let data;
        if(!update_note){
            var api='http://localhost:5000/api/note/savenewnote'
            data={org_name:sessionStorage.getItem('org_name'),org_address:sessionStorage.getItem('org_address'),title:note_title,content:note_content}
        }
        else{
            var api='http://localhost:5000/api/note/updatenote'
            data={org_name:sessionStorage.getItem('org_name'),org_address:sessionStorage.getItem('org_address'),title:note_title,old_title:old_note_title,content:note_content}
        }


        try {
            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => {
                    if (res.status === 200) {
                        if(!update_note){
                            alert("Note successfully created")}
                        else{
                            alert("Note successfully updated")
                        }
                        fetch_saved_notes();
                        closenote()
                    }
                    else if (res.status === 430) { alert('note already exist') }

                    else {  alert('Problem creating note', res.data) }
                });
            } catch (err) { console.log(err); }

}

//open the note display
const open_note=(e)=>{
        try{
            var params=saved_notes[e.target.id]+"/"+sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
            fetch('http://localhost:5000/api/note/open/'+params,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res=>res.json())
            .then(json=>{
                setnote_title(json.notes.title);
                setnote_content(json.notes.content);
                setold_note_title(json.notes.title);
                
            })
        }catch(err){
            console.log(err)
        }
        setupdate_note(true);
        document.getElementById('notesdisplay').style.display='flex';

}

useEffect(() => {
  console.log(note_title, old_note_title);
}, [note_title, old_note_title]);

//add to the selected notes array when the delete mode is on
const select_delete = (event) => {
  event.preventDefault();
  let id = parseInt(event.target.id);
  let check = document.getElementById('cbd' + id);
  check.checked = !check.checked;

  if (check.checked) {
    document.getElementById('cb' + id).style.display = 'block';
    setselected_note((prevState) => [...prevState, check.value]);
  } else {
    document.getElementById('cb' + id).style.display = 'none';
    setselected_note((prevState) => prevState.filter((item) => item !== check.value));
  }  
};

useEffect(() => {
  console.log(selected_note);
}, [selected_note]);

const deletemodeon=(e)=>{
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
        setselected_note([])
        var cb=document.getElementsByClassName('checkbox-selected')
        for(var c=0;c<cb.length;c++){
            cb[c].style.display='none';
        }
    }
    setviewmode(!viewmode)
}

const delete_selected=(e)=>{
    e.preventDefault();
    try{
        var params=selected_note+'/'+sessionStorage.getItem('org_name')+'/'+sessionStorage.getItem('org_address')
        fetch('http://localhost:5000/api/note/del/'+params,{
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'}
        }).then(res=>{

            res.json();
            console.log("the response is ",res);
            setselected_note([])
            var cb=document.getElementsByClassName('checkbox-selected')
            for(var c=0;c<cb.length;c++){
                cb[c].style.display='none';
            }
            if(res.status===200){
                fetch_saved_notes()    
                alert('notes deleted successfully')
            }
                
            }
        )

    }catch(err){
        console.log(err)
    }
}
return(
<>
        <div id="Notesdashboard">
                    <div className="contentarea">
                    <h3 className="contentareatitle">Notes</h3>
                    <hr/>
                    <div id="hiddendiv">
                      <h2  onClick={delete_selected}>Delete</h2>
                      <h2 onClick={deletemodeon}>Cancel</h2>
                    </div>
                    <div className="infomeds">
                      <div className="medscontainer">

{
                        saved_notes.map((i,index)=>{
                        return(
                          <div className="notesdiv" onClick={viewmode?open_note:select_delete} id={index} key={index}>
                            <div className="topareanote" id={index}>
                                <div className="noteimg"id={index}>
                                  <img  src={NotesImg} id={index}></img>
                                </div>
                                <div className="sideareamed" id={index}>
                                    <div className="checkbox-outline" id={'co'+index}>
                                        <div className="checkbox-selected" id={'cb'+index}></div>
                                    </div>
                                    <input type="checkbox" value={i} name="selected-delete" id={'cbd'+index} className="selectedcbd"/>
                                </div>
                            </div>
                            <h4 className="Notestitle" id={index}>{i}</h4>
                          </div>

                        )})
}


                      </div>
                    </div>    
                    </div>

                    <div className="controlbtns">
                        <div className="closetabbtn" onClick={closenotediv}><h3>+</h3></div>
                        <div id="addstock" className="stockoperation">
                            <div id="addMedicines" className="stockopiconmedicine" onClick={()=>{document.getElementById('notesdisplay').style.display='flex';setnote_title('Untitled')}}>
                            <h4>+</h4>
                            </div>
                            <div className="stockoptitle"><h4>Create New Note</h4></div>
                        </div>
                        <div id="delstock" className="stockoperation" onClick={deletemodeon}>
                            <div id="delMedicines"  className="stockopiconmedicine" onClick={deletemodeon} >
                            <h4>+</h4>
                            </div>
                            <div className="stockoptitle" id="deletetitle"> 
                            <h4 >Delete Notes</h4>
                            </div>

                        </div>
                    </div>
                    <div id="notesdisplay">
                        <div id="closebtn" onClick={closenote}><h2>+</h2></div>
                        <div className="notesdisplay">
                            <div className="topnotebar">
                                <input type='text' value={note_title} id="notetitle" onChange={(e)=>{
                                                                                                        setnote_title(e.target.value)}}/>   
                            </div><hr/>
                            <div className="notearea">
                                <textarea id="notecontent" value={note_content} onChange={(e)=>{setnote_content(e.target.value)}}></textarea>
                            </div><hr/>
                            <div className="bottomnotebar">
                                {/*<button id="imguploadbtn">Upload Image</button>*/}
                                <button id="savebtn" onClick={savenote}>Save Note</button>
                            </div>
                            
                        </div>
                    </div>


        </div>
      </>
)
}
export default Notes;