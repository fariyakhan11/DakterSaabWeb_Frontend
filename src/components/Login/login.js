import React from "react";
import './login.css'
import DocP from '../../images/doctor1.png'
import BloodP from '../../images/blood1.png'
import HospitalP from '../../images/hospital1.png'
import PharmP from '../../images/drugs1.png'
import { useState , useEffect } from "react";
import validator from "validator";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login(){

    const options=[
        {opt_titles:'Doctor',opt_imgs:DocP},
        {opt_titles:'Blood Bank',opt_imgs:BloodP},
        {opt_titles:'Pharmacy',opt_imgs:PharmP},
        {opt_titles:'Hospital',opt_imgs:HospitalP}];

    const [showPassword, setShowPassword] = useState(false);
// selected option for login
    const [identitytitle, setidentitytitle] = useState('');
    const [identitypic, setidentitypic] = useState('');

//for constant dynamic changes 
    useEffect(()=>{
        document.getElementById('signin_mark').classList.add('selected_bookmark');
        document.getElementById('signup_mark').classList.remove('selected_bookmark');
        if(identitypic===''){
            document.getElementsByClassName('login_type_container')[0].style.display='none';
        }
        else{
            document.getElementsByClassName('login_type_container')[0].style.display='flex';
        }
    })
//to show the value of the password input
    const togglePasswordVisibility = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword);
    };

//values being entered in the signup form

    const [formValue, setformValue] = React.useState({
        email: '',
        password: '',
        address: '',
        name: '',
        phone: '',
        city: '',
        timings: { open: '', close: '' }
    });

// to validate the form values while entering
    function handleUserInput(e) {
        console.log("the form values are ",formValue)
      
        setformValue(formstate => ({ ...formstate, timings: { ...formstate.timings, [e.target.id]: e.target.value } }))   
       
    }
// to submit the Register form
    const submitRegisterForm = async (e) => {
        e.preventDefault();
        let dataset=formValue
        try {
            fetch('http://localhost:5000/api/'+identitytitle+'/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataset)
            }).then(res => {
                    if (res.status === 200) {
                        document.getElementsByClassName('errordescription').style.display="none";
                        alert("you master key has been sent to you by email")
                    }
                    else if (res.status === 430) { document.getElementsByClassName('errordescription').style.display="block"; }

                    else { console.log("error in sending data", res.data) }
                });
            } catch (err) { console.log(err); }
        }
//which option u want to sign in as
    function opt_select(event) {
        const divId = event.target.id;
        setidentitytitle(options[divId].opt_titles);
        setidentitypic(options[divId].opt_imgs);
        
        
    }
return(
<>
  <div id="logincontainer">
        <div id="login_screen">  

          <div id="login_forms">
          
              <h1>Sign In with us </h1>
              <div className="optcont">
                  {options.map((i,index)=>{
                      return(
                      <div className="optdivs" id={index}  onClick={opt_select}>
                          <img src={i.opt_imgs} id={index}></img>
                          <h3 id={index}>{i.opt_titles }</h3>
                                  
                      </div>
                          )
                      })}
              </div>
              <div id="login_and_form">    
                      <div id="bookmarks_login">
                          <div id="signin_mark">
                              <h1>Sign In</h1>
                          </div>
                              <div id="signup_mark">
                              <h1>Sign Up</h1>
                          </div>
                      </div>                
                          <div className="loginform">
                              <div className="login_type_container">
                                  
                                  <img src={identitypic} id="identitypic"></img>
                                  <h3 id="identity">{identitytitle}</h3>
                              </div> 
                              <form style={{paddingTop:'1em'}} id="login_form" >
                                  <div className="inputsdiv">

                                      <h6 id="err">Name cannot contain special characters or numbers</h6>
                                      <div className="form-fields">
                                          <label>Name: </label>
                                          <input className="inputf" type="text" name="name" onChange={handleUserInput} />
                                      </div>
                                      
                                      <div className="form-fields">
                                          <label>Branches: </label>
                                          <h6>Enter your organization name to search for locations.</h6>
                                      </div>
                                      <div className="form-fields">
                                          <label>Password: </label>
                                          <input className="inputf" type={showPassword ? "text" : "password"} name="password" id="pw" onChange={handleUserInput}/>
                                          <button onClick={togglePasswordVisibility} id="showpw">
                                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                                          </button>
                                      </div>
                                      <div className='fplink'>
                                          <a href="" className='fplink' >Forgot password?</a>
                                      </div>
                                  </div>
                                  <div className="btndiv">
                                      <button id="signupsubmit" className="formbtn" onClick={submitRegisterForm}>Sign In</button>
                                  </div>
                              </form>
                          </div>
              </div>
        </div>
     
    </div>

  </div>
</>
)
}

export default Login