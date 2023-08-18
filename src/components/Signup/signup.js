import React from "react";
import DocP from '../../images/doctor1.png'
import BloodP from '../../images/blood1.png'
import HospitalP from '../../images/hospital1.png'
import PharmP from '../../images/drugs1.png'
import './signup.css';
import { useState, useEffect } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LogoP from '../../images/logo.png'

function Signup() {
    const navigate = useNavigate()
    const options = [
        { opt_titles: 'Doctor', opt_imgs: DocP },
        { opt_titles: 'BloodBank', opt_imgs: BloodP },
        { opt_titles: 'Pharmacy', opt_imgs: PharmP },
        { opt_titles: 'Hospital', opt_imgs: HospitalP }];

    const [showPassword, setShowPassword] = useState(false);
    // selected option
    const [identitytitle, setidentitytitle] = useState('');
    const [identitypic, setidentitypic] = useState('');

    //for constant dynamic changes 
    useEffect(() => {
        document.getElementById('signin_mark').classList.remove('selected_bookmark');
        document.getElementById('signup_mark').classList.add('selected_bookmark');
    })

    useEffect(() => {
        sessionStorage.clear()
    },[])

    //to show doctor specific fields
    useEffect(() => {
        if (identitytitle === 'Doctor') {
            document.getElementById('address-div').style.display = 'none';
            document.getElementById('city-div').style.display = 'none';
            document.getElementById('time-div').style.display = 'none';
            document.getElementById('edu-div').style.display = 'flex';
            document.getElementById('exp-div').style.display = 'flex';
            document.getElementById('spe-div').style.display = 'flex';
            document.getElementById('24open').style.display = 'none';
            document.getElementById('coordinates').style.display = 'none';
            document.getElementById('coordinates1').style.display = 'none';
        }
        else {
            document.getElementById('exp-div').style.display = 'none';
            document.getElementById('24open').style.display = 'flex';
            document.getElementById('edu-div').style.display = 'none';
            document.getElementById('spe-div').style.display = 'none';
            document.getElementById('address-div').style.display = 'flex';
            document.getElementById('city-div').style.display = 'flex';
            document.getElementById('time-div').style.display = 'flex';
            document.getElementById('coordinates').style.display = 'flex';
            document.getElementById('coordinates1').style.display = 'flex';
        }
    }, [identitytitle])
    //


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
        education: '',
        experience: '',
        speciality: '',
        longitude: '',
        latitude: '',
        name: '',
        phone: '',
        city: '',
        time: { open: '', close: '' },
        org: identitytitle
    });

    // to validate the form values while entering
    function handleUserInput(e) {
        
        document.getElementsByClassName('errordescription')[0].style.display = "none";

        if (!(e.target.name === 'time')) {

            setformValue({
                ...formValue,

                [e.target.name]: e.target.value

            });

        }
        else {
            let d = new Date(`2000-01-01T${e.target.value}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
            setformValue(formstate => ({ ...formstate, time: { ...formstate.time, [e.target.id]: d } }))
            alert(d)
        }

        if (e.target.name === 'email') {
            if (!validator.isEmail(e.target.value)) {
                document.getElementById('emailerr').style.display = "block";
            }
            else {
                document.getElementById('emailerr').style.display = "none";
            }
        }
        else if (e.target.name === 'password') {

            if (!(e.target.value.length > 7)) {
                document.getElementById('pwerr').textContent = "Password is too short";
                document.getElementById('pwerr').style.display = "block";
            }
            else {
                document.getElementById('pwerr').style.display = "none";
            }
        }
        else if (e.target.name === 'repw') {
            if (!(document.getElementById('pw').value === e.target.value)) {
                document.getElementById('pwerr').textContent = "Passwords dont match";
                document.getElementById('pwerr').style.display = "block";
            }
            else {
                document.getElementById('pwerr').style.display = "none";
            }
        }
        else if (e.target.name === 'name') {
            const name_expression = /^[A-Za-z]+$/;
            if ((name_expression.test(e.target.value[0]))) {
                document.getElementById('nameerr').style.display = "none";
            }
            else {
                document.getElementById('nameerr').style.display = "block";
            }
        }
        else if (e.target.name === 'speciality') {
            const name_expression = /^[A-Za-z]+$/;
            if ((name_expression.test(e.target.value[0]))) {
                document.getElementById('speerr').style.display = "none";
            }
            else {
                document.getElementById('speerr').style.display = "block";
            }
        }
        else if (e.target.name === 'education') {
            const name_expression = /^[A-Za-z]+$/;
            if ((name_expression.test(e.target.value[0]))) {
                document.getElementById('eduerr').style.display = "none";
            }
            else {
                document.getElementById('eduerr').style.display = "block";
            }
        }
    }
    // to submit the Register form
    const submitRegisterForm = async (e) => {
        e.preventDefault();
        let dataset = formValue
        try {
            fetch('http://localhost:5000/api/' + identitytitle.toLowerCase() + '/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataset)
            }).then((response) => 
              
            response.json())
            .then(json => {
                if(json.user){
                    sessionStorage.clear()
                    
                    if(identitytitle.toLowerCase()==='doctor'){
                      sessionStorage.setItem('org_name',json.user.Name); 
                      sessionStorage.setItem('email', json.user.Email); 
                      sessionStorage.setItem('phone', json.user.Phone);  
                      sessionStorage.setItem('education', json.user.Education); 
                      sessionStorage.setItem('speciality', json.user.
                      Speciality); 
                      sessionStorage.setItem('experience', json.user.Experience);
                      sessionStorage.setItem('ratings', json.user.Ratings);  
                    }
                    else{
                      if(identitytitle.toLowerCase()==='pharmacy'){
                        sessionStorage.setItem('org_name', json.user.pharmacyname); 
                      }
                      else{
                        sessionStorage.setItem('org_name', json.user.name);
                      }
                      sessionStorage.setItem('org_address', json.user.address);
                      sessionStorage.setItem('email', json.user.email); 
                      sessionStorage.setItem('phone', json.user.phone); 
                      sessionStorage.setItem('time', json.user.time);
                    }
                    sessionStorage.setItem('password','********')
                
                    document.getElementsByClassName('errordescription')[0].textContent = "";
                    document.getElementsByClassName('errordescription')[0].style.display = 'none';
                
                    alert("Sign up Success");
                    //to empty the input values after the successful submission of signup form

                    setformValue(
                        {
                            email: '',
                            password: '',
                            address: '',
                            education: '',
                            experience: '',
                            speciality: '',
                            name: '',
                            phone: '',
                            longitude: '',
                            latitude: '',
                            city: '',
                            time: { open: '', close: '' },
                            org: identitytitle
                        }

                    )
                    const rout='/'+identitytitle.toLowerCase()
                    navigate(rout)
                }
                else if (json.error === "This org already exist") {
                    document.getElementsByClassName('errordescription')[0].textContent = "This " + identitytitle + " already exist.";
                    document.getElementsByClassName('errordescription')[0].style.display = 'block';
                }

                else {
                    
                    document.getElementsByClassName('errordescription')[0].textContent = 'Some problem occurred while saving data. Please try again';
                    document.getElementsByClassName('errordescription')[0].style.display = 'block';
                }
            });
        } catch (err) {
            console.log(err);
            document.getElementsByClassName('errordescription')[0].textContent = 'Some problem occurred while saving data. Please try again'
            document.getElementsByClassName('errordescription')[0].style.display = 'block';
        }
    }
    //which option u want to sign in as
    function opt_select(event) {
        const divId = event.target.id;
        setidentitytitle(options[divId].opt_titles);
        setidentitypic(options[divId].opt_imgs);
        document.getElementsByClassName('initials')[0].style.display = "none";
        document.getElementById('authscreen').style.display = "flex";

    }
    //change between the options
    function opt_change(event) {
        const divId = event.target.id;
        setidentitytitle(options[divId].opt_titles);
        setidentitypic(options[divId].opt_imgs);
    }


    return (
        <>
            <div className="registercontainer">
                <a href="/" className="llogo">
                    <img src={LogoP} ></img>
                    <h1 className='ltitle'> DakterSaab</h1>
                </a>

                <div className="initials">
                    <h1 >Register</h1>
                    <h2>as a</h2>
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
                    <h2>Already a member?</h2>
                    <button id="login_btn" className="buttons" onClick={() => { navigate('/Login') }}>Login</button>
                </div>

                <div id="authscreen">

                    <div id="authorization_forms">
                        <h1>Register</h1>
                        <div className="as">
                            <h2>as a </h2>
                            <img src={identitypic} id="identitypic"></img>
                            <h3 id="identity">{identitytitle}</h3>
                        </div>
                        <div id="bookmarks">
                                <div id="signup_mark" className="selected_bookmark" >
                                    <h1>Register</h1>
                                </div>
                                <div id="signin_mark" onClick={() => { navigate('/Login') }}>
                                    <h1>Login</h1>
                                </div>

                            </div>
                        <div id="book_and_form">
                            
                            <div className="signupform">
                                <form>
                                    <div className="inputsdiv">
                                        <h5 className="errordescription"></h5>
                                        <h6 id="nameerr">Name cannot contain special characters or numbers</h6>
                                        <div className="form-fields">
                                            <label>Name: </label>
                                            <input className="inputf" type="text" name="name" onChange={handleUserInput} />
                                        </div>
                                        <h6 id="eduerr">Education cannot contain special characters or numbers</h6>
                                        <div className="form-fields" id="edu-div">
                                            <label>Education: </label>
                                            <input className="inputf" type="text" name="education" onChange={handleUserInput} />
                                        </div>
                                        <h6 id="speerr">Speciality cannot contain special characters or numbers</h6>
                                        <div className="form-fields" id="spe-div">
                                            <label>Speciality: </label>
                                            <input className="inputf" type="text" name="speciality" onChange={handleUserInput} />
                                        </div>
                                        <h6 id="experr">Experience cannot contain special characters or be empty</h6>
                                        <div className="form-fields" id="exp-div">
                                            <label>Experience(years): </label>
                                            <input className="inputf" type="number" name="experience" onChange={handleUserInput} />
                                        </div>
                                        <h6 id="adderr">Address cannot be empty</h6>
                                        <div className="form-fields" id="address-div">
                                            <label >Address: </label>
                                            <input className="inputf" type="text" name="address" onChange={handleUserInput} />
                                        </div>
                                        <div className="form-fields" id="city-div">
                                            <label >City: </label>
                                            <input className="inputf" type="text" name="city" onChange={handleUserInput} />
                                        </div>
                                        <div className="form-fields">
                                            <label>Phone: </label>
                                            <input className="inputf" type="number" name="phone" placeholder="3** *******" onChange={handleUserInput} />
                                        </div>
                                        
                                        <div className="form-fields">
                                            <label>Email: </label>
                                            <input className="inputf" type="email" name="email" onChange={handleUserInput} />
                                        </div>
                                        <h6 id="emailerr">Email is not valid</h6>
                                        <div className="form-fields" id="time-div">
                                            <label>Timings: </label>
                                            <input className="inputf time" type="time" name="time" id="open" onChange={handleUserInput} /><h5>to</h5>
                                            <input className="inputf time" type="time" name="time" id="close" onChange={handleUserInput} />
                                        </div>
                                        <h4 id='24open' className="opentime">If your organization is open 24/7 leave this field empty</h4>
                                        <div className="form-fields" id="coordinates">
                                            <label>Longitude: </label>
                                            <input className="inputf time" type="text" name="longitude" onChange={handleUserInput} />
                                        </div>
                                        <div className="form-fields" id="coordinates1">
                                            <label>Latitude: </label>
                                            <input className="inputf time" type="text" name="latitude" onChange={handleUserInput} />
                                        </div>
                                        <div className="form-fields">
                                            <label>Password: </label>
                                            <input className="inputf" type={showPassword ? "text" : "password"} name="password" id="pw" onChange={handleUserInput} minLength={8} />
                                            <button onClick={togglePasswordVisibility} id="showpw">
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        <h6 id='pwerr'>Passwords donot match</h6>
                                        <div className="form-fields">
                                            <label>Retype Password: </label>
                                            <input className="inputf " type="password" name="repw" id="repw" onChange={handleUserInput} />
                                        </div>
                                    </div>
                                    <div className="btndiv">
                                        <button id="signupsubmit" className="formbtn" onClick={submitRegisterForm}>Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="sideopts">
                        <div >
                            {options.map((i, index) => {
                                if (i.opt_titles !== identitytitle) {
                                    return (
                                        <div className="operation" id={index} onClick={opt_change}>
                                            <div className="opicon" id={index}>
                                                <img src={i.opt_imgs} id={index}></img>
                                            </div>
                                            <div className="optitle" id={index}>
                                                <h4 id={index}>{i.opt_titles} </h4>
                                            </div>
                                        </div>
                                    )
                                }
                            })}


                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Signup;