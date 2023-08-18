import React from "react";
import './login.css'
import DocP from '../../images/doctor1.png'
import BloodP from '../../images/blood1.png'
import HospitalP from '../../images/hospital1.png'
import PharmP from '../../images/drugs1.png'
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LogoP from '../../images/logo.png'

function Login() {
  const navigate = useNavigate();
  const options = [
    { opt_titles: 'Doctor', opt_imgs: DocP },
    { opt_titles: 'BloodBank', opt_imgs: BloodP },
    { opt_titles: 'Pharmacy', opt_imgs: PharmP },
    { opt_titles: 'Hospital', opt_imgs: HospitalP }];

  const [showPassword, setShowPassword] = useState(false);
  // selected option for login
  const [identitytitle, setidentitytitle] = useState('');
  const [identitypic, setidentitypic] = useState('');
  //locations for the organizations
  const [hospitalbranches, setbranches] = useState('');
  //to set the initial identity title and empty the input fields
  useEffect(() => {
    setidentitypic(DocP)
    setidentitytitle('Doctor')
    document.getElementById('name-div').style.display = 'none';
    document.getElementById('branch-div').style.display = 'none';
    document.getElementById('email-div').style.display = 'flex';
    setformValue({
      password: '',
      branch: '',
      name: '',
      email: '',
      org: identitytitle
    })
    emptyfields()
  }, [])
  //for constant dynamic changes 
  useEffect(() => {
    document.getElementById('signin_mark').classList.add('selected_bookmark');
    document.getElementById('signup_mark').classList.remove('selected_bookmark');
    if (formValue.name === '') { document.getElementById('branch_notice').textContent = "Enter your organization name to search for locations."; }
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
    email: '',
    org: identitytitle
  });

  // to validate the form values while entering
  function handleUserInput(e) {
    console.log("the form values are ", formValue)
    document.getElementById("nameerr").style.display = 'none';
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
    if (e.target.name === "name") {

      let api = (
        "http://localhost:5000/api/" + identitytitle.toLowerCase() + "/branch/" + e.target.value
      ).toString();
      try {

        fetch(api)
          .then((response) => response.json())// get response, convert to json
          .then((json) => {
            setbranches(json.branch);
            if (json.branch) {
              document.getElementById('branch_notice').textContent = ''
            }
            else {
              document.getElementById('branch_notice').textContent = 'No branches found'
            }
          });
      }
      catch (err) {
        console.log("error in requesting branches information", err);
        setbranches("");
        document.getElementById('branch_notice').textContent = "No such " + { identitytitle } + " exist";
      }
    }


  }
  //signin form submission
  const SignIn = (e) => {
    e.preventDefault();
    if (formValue.name === "" && identitytitle != 'Doctor') {
      alert('hi')
      document.getElementById("nameerr").textContent = "Name cannot be empty";
      document.getElementById("nameerr").style.display = 'flex';
    } else if (formValue.password === "") {
      document.getElementById("nameerr").textContent = "Please enter your password";
      document.getElementById("nameerr").style.display = 'flex';
    }
    else if (formValue.branch === '' && identitytitle != "Doctor") {
      document.getElementById("nameerr").textContent = "Please select your location";
      document.getElementById("nameerr").style.display = 'flex';
    }
    else if (formValue.email === '' && identitytitle === "Doctor") {
      document.getElementById("nameerr").textContent = "Email cannot be empty";
      document.getElementById("nameerr").style.display = 'flex';
    }
    else {
      document.getElementById("nameerr").style.display = 'none';
      console.log("the info is ", formValue);
      try {
        fetch("http://localhost:5000/api/" + identitytitle.toLowerCase() + '/login/', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValue),
        })
          .then((response) => {
                if(response.status===200){alert('Login success')}
                response.json()})
          .then((json) => {
            document.getElementById("nameerr").innerHTML = json.error;
            document.getElementById("nameerr").style.display = 'flex';
            if (!json.error) {
              emptyfields();
              document.getElementById("nameerr").innerHTML = "";
              document.getElementById("nameerr").style.display = 'none';
              console.log(json.user)

            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  //to empty the input values after the successful submission of signup form
  function emptyfields() {
    var inputf = document.getElementsByClassName('inputf')
    for (var i = 0; i < inputf.length; i++) {
      inputf[i].value = '';
    }
    setbranches('');
    document.getElementById('branch_notice').textContent = "Enter your organization name to search for locations.";
  }

  //which option u want to sign in as
  function opt_select(event) {
    const divId = event.target.id;
    const selectedTitle = options[divId].opt_titles;
    const selectedPic = options[divId].opt_imgs;

    setidentitytitle(prevTitle => {
      if (prevTitle === selectedTitle) {
        return prevTitle; // If the title is already selected, no need to update
      }
      emptyfields()
      return selectedTitle;
    });

    setidentitypic(prevPic => {
      if (prevPic === selectedPic) {
        return prevPic; // If the pic is already selected, no need to update
      }
      emptyfields()
      return selectedPic;
    });



    if (selectedTitle === 'Doctor') {
      document.getElementById('name-div').style.display = 'none';
      document.getElementById('branch-div').style.display = 'none';
      document.getElementById('email-div').style.display = 'flex';
    } else {
      document.getElementById('name-div').style.display = 'flex';
      document.getElementById('branch-div').style.display = 'flex';
      document.getElementById('email-div').style.display = 'none';
    }
  }

  //forget password
  const forget_password = () => {
    alert('We sent a code to your email. Use it as a temporary password')
  }
  return (
    <>
      <div id="logincontainer">
        <a href="/" className="llogo">
          <img src={LogoP}></img>
          <h1 className='ltitle'> DakterSaab</h1>
        </a>

        <div id="login_forms">
          <h1>Login</h1>
          <div className="optcont">
            {options.map((i, index) => {
              return (
                <div className="optdivs" id={index} onClick={opt_select}>
                  <img src={i.opt_imgs} id={index}></img>
                  <h3 id={index}>{i.opt_titles}</h3>
                </div>
              )
            })}
          </div>
          <div id="login_and_form">
            <div id="bookmarks_login">
              <div id="signin_mark">
                <h1>Login</h1>
              </div>
              <div id="signup_mark" onClick={() => { navigate('/Signup') }}>
                <h1>Register</h1>
              </div>
            </div>
            <div className="loginform">
              <div className="login_type_container">
                <img src={identitypic} id="identitypic"></img>
                <h3 id="identity">{identitytitle}</h3>
              </div>
              <form id="login_form" >
                <div className="inputsdiv">
                  <h6 id="nameerr">Name cannot contain special characters or numbers</h6>

                  <div className="form-fields" id='name-div'>
                    <label>Name: </label>
                    <input className="inputf" type="text" name="name" onChange={handleUserInput} />
                  </div>

                  <h6 id="emailerr">Please enter a valid email</h6>

                  <div className="form-fields" id='email-div'>
                    <label>Email:</label>
                    <input className="inputf" type="text" name="email" onChange={handleUserInput} />
                  </div>

                  <div className="form-fields" id='branch-div'>
                    <label>Branches: </label>
                    <h6 id="branch_notice">Enter your organization name to search for locations.</h6>
                    {hospitalbranches && (
                      <div className="labeldiv">
                        {hospitalbranches.map((element, index) => {
                          return (
                            <div className='radiobtn'>

                              <input className='radiobtn' type="radio" key={index} id={index + 'b'} name="branch" value={element} onChange={handleUserInput} checked={formValue.branch === element} />
                              <label htmlFor={index + 'b'} className="radio-btn-label-branch">{element}</label>
                              <br />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="form-fields">
                    <label>Password: </label>
                    <input className="inputf" type={showPassword ? "text" : "password"} name="password" id="pw" onChange={handleUserInput} />
                    <button onClick={togglePasswordVisibility} id="showpw">
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  <div className='fplink'>
                    <a href="" className='fplink' onClick={forget_password}>Forgot password?</a>
                  </div>
                </div>
              </form>
              <div className="btndiv">
                <button id="signupsubmit" className="formbtn" onClick={SignIn}>Login</button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default Login