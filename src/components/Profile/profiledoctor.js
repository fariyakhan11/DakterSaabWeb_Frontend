import React from "react";
import './profiledoctor.css';
import EditP from '../../images/edit1.png'
import { useState,useEffect } from "react";
import DocP from '../../images/doctor1.png'
import validator from "validator";

function Profiledoctor(){
    const [edit_view, set_edit_view] = useState(false);
    const [doctorinfo, setdoctorinfo] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Education: '',
        Speciality: '',
        Password: '',
        Experience: '',
        Description: '',
        Hospitals: [],
        Ratings: ''
    });

    const fetchDoctorDetails = async () => {
        const orgName = sessionStorage.getItem('org_name');
        const email = sessionStorage.getItem('email');
        const api = `http://localhost:5000/api/doctor/detail/${orgName}/${email}`;
    
        try {
          const response = await fetch(api);
          if (response.status === 200) {
            const data = await response.json();
            console.log('Fetched doctor data:', data);
            const doctorData = data.doctor;
            setdoctorinfo(doctorData);
          } else {
            console.log('Error fetching doctor details');
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        // Fetch initial data
        fetchDoctorDetails();
      }, []);
    
useEffect(()=>{
    enterdetails()

},[])

function enterdetails(){
    
    // var myArray = JSON.parse(sessionStorage.getItem('hospital'));
    
    setdoctorinfo({name:sessionStorage.getItem('org_name'),email:sessionStorage.getItem('email'),phone:sessionStorage.getItem('phone'),education:sessionStorage.getItem('education'),password:sessionStorage.getItem('password'),speciality:sessionStorage.getItem('speciality'),experience:sessionStorage.getItem('experience'),description:sessionStorage.getItem('description'),ratings:sessionStorage.getItem('ratings')})


}

const addhosdiv = () => {
    setdoctorinfo((prev) => ({
      ...prev,
      hospitals: [...prev.Hospitals, { name: "", address: "", fee: "" }],
    }));
  };
  
  const removehosdiv = (index) => {
    if (doctorinfo.Hospitals.length > 1) {
      const updatedHospitals = [...doctorinfo.Hospitals];
      updatedHospitals.splice(index, 1);
  
      setdoctorinfo((prev) => ({
        ...prev,
        hospitals: updatedHospitals,
      }));
    }
  };
  
  

useEffect(()=>{console.log(doctorinfo)},[doctorinfo])

const handleinput=(e)=>{
        if (e.target.name === 'email') {
            if (!validator.isEmail(e.target.value)) {
                document.getElementById('emailerr').style.display="block";
            }
            else { 
                document.getElementById('emailerr').style.display="none";
                setdoctorinfo((prev) => ({
                    ...prev,
                    email:e.target.value
                }))
             }
        }

        else if (e.target.name ==='name'){
            const name_expression =/^[A-Za-z]+$/;
            if((name_expression.test(e.target.value[0]))){
                document.getElementById('nameerr').style.display="none";
                    setdoctorinfo((prev) => ({
                    ...prev,
                    name:e.target.value
                }))
            }
            else{
                document.getElementById('nameerr').style.display="block";
            }
        }
        else if (e.target.name === 'password') {

            if (!(e.target.value.length > 7)) {
                document.getElementById('pwerr').textContent="Password is too short";
                document.getElementById('pwerr').style.display="block";
            }
            else {
                document.getElementById('pwerr').style.display="none";
                    setdoctorinfo((prev) => ({
                    ...prev,
                    password:e.target.value
                }))
            }
        }
        else if (e.target.name ==='education'){
            const name_expression =/^[A-Za-z]+$/;
            if((name_expression.test(e.target.value[0]))){
                document.getElementById('eduerr').style.display="none";
                    setdoctorinfo((prev) => ({
                    ...prev,
                    education:e.target.value
                }))
            }
            else{
                document.getElementById('eduerr').style.display="block";
            }
        }
        else if (e.target.name ==='speciality'){
            const name_expression =/^[A-Za-z]+$/;
            if((name_expression.test(e.target.value[0]))){
                document.getElementById('speerr').style.display="none";
                    setdoctorinfo((prev) => ({
                    ...prev,
                    speciality:e.target.value
                }))
            }
            else{
                document.getElementById('speerr').style.display="block";
            }
        }
        else if (e.target.name ==='hospital'){
            var id=parseInt(e.target.id)
            const name_expression =/^[A-Za-z]+$/;
            
                document.getElementById('hoserr').style.display="none";
                    var h=doctorinfo.Hospitals
                    h[id]=e.target.value
                    setdoctorinfo((prev) => ({
                    ...prev,
                    hospital:h
                }))

        }
        else{
            setdoctorinfo((prev) => ({
            ...prev,
            [e.target.name]:e.target.value
            }))

        }
}

const handleHospitalInput = (e, index, field) => {
    const updatedHospitals = [...doctorinfo.Hospitals];
    updatedHospitals[index][field] = e.target.value;
  
    setdoctorinfo((prev) => ({
      ...prev,
      hospital: updatedHospitals,
    }));
  };
  

const editformsubmit=()=>{
        try{
        
        const api='http://localhost:5000/api/doctor/update';
        let data={old_name:sessionStorage.getItem('org_name'),old_email:sessionStorage.getItem('email'),doctorinfo:doctorinfo}
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
                if (res.status === 200) {
                    alert('Doctor updated successfully')
                    res.json().then(data => {
                        console.log('doc is ',data.doctor)
                        setdoctorinfo(data.doctor);
                        sessionStorage.setItem('org_name',data.doctor.Name)
                        sessionStorage.setItem('education',data.doctor.Education)
                        sessionStorage.setItem('phone',data.doctor.Phone)
                        sessionStorage.setItem('email',data.doctor.Email)
                        sessionStorage.setItem('speciality',data.doctor.Speciality)
                        sessionStorage.setItem('ratings',data.doctor.Ratings)
                        sessionStorage.setItem('experience',data.doctor.Experience)
                        sessionStorage.setItem('description',data.doctor.Description)
                        sessionStorage.setItem('hospital',data.doctor.Hospitals)
                    })

                    enterdetails()
                    document.getElementById('profcancel').click()
                }
                else if (res.status === 430) { alert(res.error) }

                else {  alert('Problem updating doctor', res.error) }
            });
    }catch(err){
        console.log(err);
    }
}
return(
<>
        <div id="Profiledoctordashboard">
        
            <div className="contentarea" >
                    <h3 className="contentareatitle">My Profile</h3>
                    <hr/>

                <div id="profilediv">
                    <div>
                        <div id="boldinfodiv">
                            <div id="profimgdiv">
                                <div><img src={DocP}></img></div>
                            </div>
{edit_view&&
                            <div id="maincontentdiv">

                                <div id="Namediv">
                                    <div>
                                        <h6 id="nameerr">Name cannot contain special characters or numbers</h6>
                                        <input type='text' placeholder="Enter Name" value={doctorinfo.Name} onChange={handleinput} name="Name"/>
                                    </div>
                                </div>
                                <div id="Phonediv">
                                    <div>
                                    <   input  value={doctorinfo.Phone} onChange={handleinput} name="Phone" minLength={10} placeholder="3** *******" />
                                    </div>
                                </div>
                                <div id="Emaildiv">
                                    <div>
                                        <h6 id="emailerr">Email is not valid</h6>
                                        <input type="email" placeholder="Enter Email" value={doctorinfo.Email} onChange={handleinput} name="Email"/>
                                    </div>
                                </div>
                                <div id="Educationdiv">
                                    <div>
                                        <h6 id="eduerr">Education cannot contain special characters or numbers</h6>
                                        <input type='text' placeholder="Enter Education" value={doctorinfo.Education} onChange={handleinput} name="Education"/>
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
                                <h2>{doctorinfo.Phone}</h2>
                                </div>
                                <div id="Emaildiv">
                                <h2>{sessionStorage.getItem('email')}</h2>
                                </div>
                                <div id="Educationdiv">
                                <h2>{doctorinfo.Education}</h2>
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
                                <input value={doctorinfo.Password} onChange={handleinput} name="Password" minLength={8} type="password" placeholder="Enter password"/>
                            </div>
                            <h6 id="speerr">Speciality cannot contain special characters or numbers</h6>
                            <div id="Specialitydiv">
                                <h1>Speciality:</h1>
                                <input value={doctorinfo.Speciality} onChange={handleinput} name="Speciality" placeholder="Enter speciality" type="text"/>
                            </div>
                            <h6 id="experr">Experience cannot be empty and only contain numbers</h6>
                            <div id="Experiencediv">
                                <h1>Experience (in years):</h1>
                                <input value={doctorinfo.Experience} onChange={handleinput} name="Experience" placeholder="Enter experience" type="text"/>
                            </div>
                            <div id="Descriptiondiv">
                                <h1>Description:</h1>
                                <textarea value={doctorinfo.Description} onChange={handleinput} name="Description" placeholder="Enter description" type="text"/>
                                </div>
                            <h6 id="hoserr">Hospital Name cannot contain special characters or numbers</h6>
                            <div id="Hospitaldiv">
  <div>
    <h1 style={{ color: "#8746bd" }}>Hospitals:</h1>
  </div>
  <div>
    <div id="addhosbtn" onClick={addhosdiv}>
     
      <h4>Add Hospitals</h4>
    </div>
  </div>
</div>
{doctorinfo.Hospitals.map((hospital, index) => {
  return (
    <div key={index} id="Hospitaldiv">
      <div>
        {doctorinfo.Hospitals.length > 1 && (
          <div className="removehosbtn" onClick={() => removehosdiv(index)}>
            <div>
              <h5>+</h5>
            </div>
          </div>
        )}
      </div>
      <div className="hospitalinputdiv">
        <input
          value={hospital.name}
          onChange={(e) => handleHospitalInput(e, index, "name")}
          className="name"
          type="text"
          placeholder="Enter hospital name"
        />
        <input
          value={hospital.address}
          onChange={(e) => handleHospitalInput(e, index, "address")}
          className="address"
          type="text"
          placeholder="Enter hospital address"
        />
        <input
          value={hospital.fee}
          onChange={(e) => handleHospitalInput(e, index, "fee")}
          className="fee"
          type="text"
          placeholder="Fees"
        />
      </div>
    </div>
  );
})}

                          
         
                        </div>
}
{!edit_view&&
                        <div id="profinfodiv">
                            <div id="Passworddiv">
                            <h1>Password:</h1>
                            <h2>{sessionStorage.getItem('password')}</h2>
                            </div>
                            <div id="Specialitydiv">
                            <h1>Speciality:</h1>
                            <h2>{doctorinfo.Speciality}</h2>
                            </div>
                            <div id="Experiencediv">
                            <h1>Experience:</h1>
                            <h2>{doctorinfo.Experience} Years</h2>
                            </div>
                            <div id="Descriptiondiv">
                            <h1>Description:</h1>
                            <h2 className="Description">{doctorinfo.Description}</h2>
                            </div>
                            <div id="Ratingsdiv">
                            <h1>Ratings:</h1>
                            <h2>{doctorinfo.Ratings} Stars</h2>
                            </div>
                            <div id="Hospitaldiv">
                           
  <h1 style={{ color: "#8746bd" }}>Hospitals:</h1>
  <div className="hospital-list">
    {doctorinfo.Hospitals ? (
      doctorinfo.Hospitals.map((hospital, index) => (
        <div className="hospital-card" key={index}>
          <h2>{hospital.name}</h2>
          <p className="hospital-details">Address: {hospital.address}</p>
          <p className="hospital-details">Fee: {hospital.fee}</p>
          {/* <h3 className="availability-title">Availability:</h3>
          <ul className="availability-list">
            {hospital.avaliblity.map((availability, availIndex) => (
              <li className="availability-item" key={availIndex}>
                <p>{availability.day}</p>
                <ul className="time-list">
                  {availability.time.map((time, timeIndex) => (
                    <li key={timeIndex}>{time}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul> */}
        </div>
      ))
    ) : (
      <p>Loading hospitals...</p>
    )}
  </div>


  

</div>


          
                        </div>
}
                    </div>
{edit_view&&
                    <div>

                        <button id="profcancel" onClick={()=>{set_edit_view(false)}}>Cancel</button>
                        <button onClick={editformsubmit}>Submit</button>
                    </div>
}
                </div>
            </div>

        </div>
</>
)
}
export default Profiledoctor;