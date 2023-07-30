import React from "react";
import './profiledoctor.css';
import EditP from '../../images/edit1.png'
import { useState,useEffect } from "react";
import DocP from '../../images/doctor1.png'
import validator from "validator";

function Profiledoctor(){
    const [edit_view, set_edit_view] = useState(false);
    const [doctorinfo,setdoctorinfo]=useState({name:'',email:'',phone:'',education:'',speciality:'',password:'',experience:'',description:'',hospital:[{name:'',address:'',fees:""}],ratings:''})

useEffect(()=>{
    enterdetails()

},[])

function enterdetails(){
    
    var myArray = JSON.parse(sessionStorage.getItem('hospital'));
    
    setdoctorinfo({name:sessionStorage.getItem('org_name'),email:sessionStorage.getItem('email'),phone:sessionStorage.getItem('phone'),education:sessionStorage.getItem('education'),password:sessionStorage.getItem('password'),speciality:sessionStorage.getItem('speciality'),experience:sessionStorage.getItem('experience'),description:sessionStorage.getItem('description'),hospital:myArray,ratings:sessionStorage.getItem('ratings')})

}

const addhosdiv=()=>{
    var h=doctorinfo.hospital
    h.push('')
    setdoctorinfo((prev) => ({
          ...prev,
          hospital:h
    }))
}

const removehosdiv=(e)=>{

    var h=doctorinfo.hospital
    if(h.length>1)
    
    h.splice(parseInt(e.target.id), 1);
    setdoctorinfo((prev) => ({
          ...prev,
          hospital:h
    }))
}

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
                    var h=doctorinfo.hospital
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
                        sessionStorage.setItem('org_name',data.doctor.Name)
                        sessionStorage.setItem('education',data.doctor.Education)
                        sessionStorage.setItem('phone',data.doctor.Phone)
                        sessionStorage.setItem('email',data.doctor.email)
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
                                    <h1 style={{color:"#8746bd"}}>Hospitals:</h1>
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

                                <div className="hospitalinputdiv">
                                    <input value={i.name} onChange={handleinput} name="hospital" className="name" type="text" id={index} placeholder="Enter hospital name"/>
                                    <input value={i.address} onChange={handleinput} className="address" name="hospital" type="text" id={index} placeholder="Enter hospital address"/>
                                    <input value={i.fees} onChange={handleinput} className="fees" name="hospital" type="text" id={index} placeholder="fees"/>
                                </div>
                            </div>  
</>)})}
 
         
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
                            <h2>{sessionStorage.getItem('speciality')}</h2>
                            </div>
                            <div id="Experiencediv">
                            <h1>Experience (in years):</h1>
                            <h2>{sessionStorage.getItem('experience')}</h2>
                            </div>
                            <div id="Descriptiondiv">
                            <h1>Description:</h1>
                            <h2>{sessionStorage.getItem('description')}</h2>
                            </div>
                            <div id="Ratingsdiv">
                            <h1>Ratings:</h1>
                            <h2>{sessionStorage.getItem('ratings')}</h2>
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