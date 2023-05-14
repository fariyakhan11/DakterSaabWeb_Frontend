import React from "react";
import './medicines.css';
import { useState } from "react";
import { useEffect } from "react";
import {GrHelp} from "react-icons/gr";

function Addmedicines({close}){
    
//Method in which the data shall be entered by default Manual so true otherwise false   
    const [add_manual, set_manual_tab]=useState(true);
    
    useEffect(()=>{
        document.getElementById('manual_add').classList.add('active_tab');
    },[])
//change the method the data is entered
    const change_tab=(e)=>{
        
            let x=document.getElementsByClassName('active_tab')[0];
            if(x){
                x.classList.remove('active_tab');
                x.classList.add('idle_tab');
            }
   
            let f=e.target.id;
            document.getElementById(f).classList.add('active_tab');
            document.getElementById(f).classList.remove('idle_tab');
            if(e.target.id==='manual_add'){
                set_manual_tab(true);
            }
            else{
                set_manual_tab(false);
            }
    }

    
return(
<>
<div className="grayarea">
    <div id="addmed_container">
        <div id="topbarmeds">
            <h1>Add Medicines</h1>
            <div id="closebtn" onClick={()=>{close(true)}} ><h2>+</h2></div>
        </div>
        <div id="addmeds_area">
            <div id="tabs_add">
                <div id="manual_add" className="idle_tab" onClick={change_tab}>
                    <h2 id="manual_add">Add Manually</h2>
                </div>
                <div id="sheet_add" className="idle_tab" onClick={change_tab}>
                    <h2 id="sheet_add">Upload Sheet</h2>
                </div>
            </div>

            <div id="addmedcontent">
{add_manual &&
                <div id="area">
                    <div className="top_bar_add_meds">
                        <h3>Add Data Manually</h3>
                        <div><GrHelp className="icon"/></div>
                    </div>
                    <div className="add_area_meds">
                        <form>
                            <div className="med-div">
                                <div id><h3>Medicine 1</h3></div>
                                
                                <div className="med">
                                    <h6 id="nameerr">Name cannot contain special characters or numbers</h6>
                                    <div className="form-fields">
                                        <label>Name: </label>
                                        <input className="inputf" type="text" name="name"  />
                                    </div>
                                    <h6 id="nameerr">Name cannot contain special characters or numbers</h6>
                                    <div className="form-fields">
                                        <label>Price: </label>
                                        <input className="inputf" type="text" name="name"  />
                                    </div>
                                    <h6 id="nameerr">Name cannot contain special characters or numbers</h6>
                                    <div className="form-fields">
                                        <label>Quantity: </label>
                                        <input className="inputf" type="text" name="name"  />
                                    </div>
                                    <h6 id="nameerr">Name cannot contain special characters or numbers</h6>
                                    <div className="form-fields">
                                        <label>Category: </label>
                                        <input className="inputf" type="text" name="name"  />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
}
{!add_manual &&
                <div id="area">
                    <div className="top_bar_add_meds">
                        <h3>Add Data by Uploading Sheet</h3>
                        <div><GrHelp className="icon"/></div>
                        
                    </div>
                    <div className="add_area_meds">
                        <h5>Choose how you want to upload your data through just one click!</h5>
                        <div className="add_med_btns">
                            <button id="excel" className="upload_btn">Upload Excel</button>
                            <span>------------------------------------------or--------------------------------------------<hr/></span>
                            <button id="csv" className="upload_btn">Upload CSV</button>
                            <span>------------------------------------------or--------------------------------------------<hr/></span>
                            <button id="json" className="upload_btn">Upload JSON</button>
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
export default Addmedicines;