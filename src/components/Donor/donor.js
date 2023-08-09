import React from "react";
import './donor.css';
import Donorperson from '../../images/donor1.png'
import { useState,useEffect } from "react";
import Adddonor from "./adddonor.js";



function Donor(){
    const [close_add_view, set_add_view] = useState(true);
    const [close_info_view, set_info_view] = useState(true);
    const [displayed_list,setdisplayed_list]=useState([])
    const [searchdonor,setsearchdonor]=('')

//close the add view tab
const handle_add=(close)=>{
  set_add_view(close)
  //fetchdonors()
}

const handleSearchdonor=(e)=>{
  setsearchdonor(e.target.value.toLowerCase())
  

  if (searchdonor === '') {
    setdisplayed_list([]); // Show all doctors if search is empty
  } else {
    const filteredDonors = [].filter((donor) =>
      donor.Name.toLowerCase().includes(searchdonor)
    );
    setdisplayed_list(filteredDonors);
  }
}
return(
<>
{!close_add_view &&
<Adddonor close={handle_add}/>
}
{!close_info_view &&
    <div className="donorinfogray">
        <div id="donorinfodiv">
            <div><h1>Donor Information</h1><div id="closebtndonor"  onClick={()=>{set_info_view(true)}}><h1>+</h1></div></div>
            <div>
                <div>
                    <h1>Name: </h1>
                    <h2>Alishba Arshad</h2>
                </div>
                <div>
                    <h1>Address: </h1>
                    <h2>R 595 sector 8 North Karachi Karachi</h2>
                </div>
                <div>
                    <h1>Contact: </h1>
                    <h2>03330249895</h2>
                </div>
                <div>
                    <h1>Age: </h1>
                    <h2>32</h2>
                </div>
                <div>
                    <h1>Gender: </h1>
                    <h2>Female</h2>
                </div>
                <div>
                    <h1>Weight: </h1>
                    <h2>65 kg</h2>
                </div>
                <div>
                    <h1>HB: </h1>
                    <h2>7</h2>
                </div>
                <div>
                    <h1>Donations: </h1>
                    <h2>5</h2>
                </div>
                <div>
                    <h1>Previous Medical History: </h1>
                    <h2>Clear</h2>
                </div>
                <div>
                    <h1>BloodGroup: </h1>
                    <h2>AB+</h2>
                </div>
                <div>
                    <h1>Status: </h1>
                    <h2 className="verified">Vierified</h2>
{/*
                    <h2 className="rejectbtn">Reject</h2>
                    <h2 className="verifybtn">Verify</h2>
*/}
                </div>
            </div>
        </div>
    </div>
}
        <div id="Doctorsdashboard">
            <div className="contentarea"  >
                    <h3 className="contentareatitle">Donors</h3>
                    <hr/>
                    <div className="searchbar">

                          <input
                            type="text"
                            placeholder="Search Donors by name.."
                            value={searchdonor}
                            onChange={handleSearchdonor}
                            className='searchdonor'
                          />
                    </div>

            <div className="donorarea" >
                <div className="donordiv" onClick={()=>{set_info_view(false)}}>
                    <div>
                        <img src={Donorperson}></img>
                    </div>
                    <div>
                        <div>
                            <h1>Name: </h1>
                            <h2>Alishba Arshad</h2>
                        </div>
                        <div>
                            <h1>Address: </h1>
                            <h2>R 595 sector 8 North Karachi Karachi</h2>
                        </div>
                        <div>
                            <h1>Contact: </h1>
                            <h2>03330249895</h2>
                        </div>
                        <div>
                            <h1>BloodGroup: </h1>
                            <h2>AB+</h2>
                        </div>
                        <div>
                            <h1>Status: </h1>
                            <h2 className="verified">Vierified</h2>
                        </div>
                    </div>
                </div>

                <div className="donordiv" onClick={()=>{set_info_view(false)}}>
                    <div>
                        <img src={Donorperson}></img>
                    </div>
                    <div>
                        <div>
                            <h1>Name: </h1>
                            <h2>Fariha Mallick</h2>
                        </div>
                        <div>
                            <h1>Address: </h1>
                            <h2>Regal Apartments block B Nazimabad karachi</h2>
                        </div>
                        <div>
                            <h1>Contact: </h1>
                            <h2>03330249895</h2>
                        </div>
                        <div>
                            <h1>BloodGroup: </h1>
                            <h2>O-</h2>
                        </div>
                        <div>
                            <h1>Status: </h1>
                            <h2 className="verified">Vierified</h2>
                        </div>
                    </div>
                </div>
                <div className="donordiv" onClick={()=>{set_info_view(false)}}>
                    <div>
                        <img src={Donorperson}></img>
                    </div>
                    <div>
                        <div>
                            <h1>Name: </h1>
                            <h2>Zain Irfan</h2>
                        </div>
                        <div>
                            <h1>Address: </h1>
                            <h2>R 590 Shah Faisal COlony Karachi</h2>
                        </div>
                        <div>
                            <h1>Contact: </h1>
                            <h2>03332790395</h2>
                        </div>
                        <div>
                            <h1>BloodGroup: </h1>
                            <h2>A+</h2>
                        </div>
                        <div>
                            <h1>Status: </h1>
                            <h2 className="rejectbtn">Pending</h2>
                        </div>
                    </div>
                </div>
            </div>
        
          </div>
        </div>
</>
)
}
export default Donor;