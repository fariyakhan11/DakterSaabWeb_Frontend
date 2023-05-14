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
//locations for the organizations
    const [hospitalbranches, setbranches] = useState('');

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
        password: '',
        branch: '',
        name: '',
        org:identitytitle
    });

// to validate the form values while entering
    function handleUserInput(e) {
        console.log("the form values are ",formValue)
      
        setformValue({
                ...formValue,
                [e.target.name]: e.target.value
        });
        if (e.target.name === "name") {
          let api = (
            "http://localhost:5000/api/"+{identitytitle}+"/branch/" + e.target.value
          ).toString();
          try {
            console.log(e.target.value)
            fetch(api)
              .then((response) => response.json()) // get response, convert to json
              .then((json) => {
                setbranches(json.branches);
                document.getElementById('branch_notice').style.display='none'
              });
          }
          catch (err) {
            console.log("error in requesting branches information", err);
            setbranches("");
            document.getElementById('branch_notice').textContent="No such "+{identitytitle}+"exist";
          }
        }
       
    }
//signin form submission
    const SignIn = (e) => {
        e.preventDefault();
        if (formValue.name === "") {
          document.getElementById("err").innerHTML = "Name cannot be empty";
        } else if (formValue.password === "") {
          document.getElementById("err").innerHTML =
            "Please enter your password";
        } 
        else if(formValue.branch===''){
          document.getElementById("err").innerHTML =
            "Please select your location";
        }
        else {
          
          console.log("the info is ", formValue);
          try {
            fetch("http://localhost:5000/api/login/user/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formValue),
            })
              .then((response) => response.json())
              .then((json) => {
                document.getElementById("errorstatus").innerHTML = json.error;
                if (!json.error) {
                  setformValue({
                    name: "",
                    branch: "",
                    password: "",
                    org: identitytitle,
                  });
                  document.getElementById("errorstatus").innerHTML = "";
                  console.log(json.user);

                }
              });
          } catch (err) {
            console.log(err);
          }
        }
    };



//which option u want to sign in as
    function opt_select(event) {
        const divId = event.target.id;
        setidentitytitle(options[divId].opt_titles);
        setidentitypic(options[divId].opt_imgs);
        document.getElementById('branch_notice').textContent="Enter your organization name to search for locations.";
        
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
                                          <h6 id="branch_notice">Enter your organization name to search for locations.</h6>
                                          {hospitalbranches && (
                                              <div className="labeldiv">
                                                {hospitalbranches.map((element, index) => {
                                                  return (
                                                    <div className='radiobtn'>
                                                      <input className='radiobtn' type="radio" key={index} id={index} name="branch" value={element}  />
                                                      <label htmlFor={index}>{element}</label>
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            )}
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
                                      <button id="signupsubmit" className="formbtn" onClick={SignIn}>Sign In</button>
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