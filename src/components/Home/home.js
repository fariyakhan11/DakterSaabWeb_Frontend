import React, { useRef } from "react";
import HospitalP from '../../images/hospital1.png'
import BloodP from '../../images/blood1.png'
import DocP from '../../images/doctor1.png'
import PharmP from '../../images/medicine.png'
import Footer from "../Footer/footer";
import About from "../About/about";
import Creator from "../Creators/Creator";
import AppP from '../../images/appP.png'
import '../../fonts/fonts.css'
import './home.css';
import PlayP from '../../images/playstore.png'
import Navbar from './../Navbar/navbar';
import drgrp from '../../images/doctorgrp.png'
import { useNavigate } from 'react-router-dom';


function Home() {
  const aboutSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const homeSectionRef = useRef(null);
  const downloadSectionRef = useRef(null);
  const navigate = useNavigate();

  function scrollToSection(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>

      <div id="home_container">
        <Navbar
          scrollToAbout={() => scrollToSection(aboutSectionRef)}
          scrollToContact={() => scrollToSection(contactSectionRef)}
          scrollToHome={() => scrollToSection(homeSectionRef)}
          scrollToDownload={() => scrollToSection(downloadSectionRef)}
        />
        <div className="main">
          <div className="headingdiv">
            <div className="heading">
<<<<<<< HEAD
              <h3 className="mainheading">Your Health <br />is Our Priority</h3>
=======
            <h3 className="mainheading">Your Health <br />is Our Priority</h3>
>>>>>>> 4c9885f4e6296afa81100d8d5289eb3a63328f59
              <h4>Set up, manage and reach out your healing<br /> hands to the community </h4>
              <p>Elevate your healthcare experience with our platform, providing a
                <br /> seamless registration process for doctors, hospitals, blood banks, and pharmacies.
                <br />Join a connected network dedicated to delivering efficient and 
                <br />comprehensive medical services.
              </p>
              <div className="btnsdiv" ref={homeSectionRef}>
                <button onClick={() => { navigate('/Login') }}>Login</button>
                <h5>OR</h5>
                <button onClick={() => { navigate('/Signup') }}>Register</button>
              </div>
            </div>
            <div>
              <img src={drgrp} className="docimg" ></img>
            </div>
          </div>

          <div className="modules" id="bottomarealanding">
            <div className="module1">
              <img src={HospitalP} />
              <h4>Hospitals</h4>
              <h5>Cater Appointments , Manage Departments Doctors and Services </h5></div>
            <div className="module1">
              <img src={BloodP} />
              <h4>Blood Banks</h4>
              <h5>Help provide people with instant desired blood services</h5></div>

            <div className="module1">
              <img src={PharmP} />
              <h4>Pharmacies</h4>
              <h5>Manage medicine inventory and help people book medicines online</h5></div>
            <div className="module1">
              <img src={DocP} />
              <h4>Doctors</h4>
              <h5>Manage your clinic appointments and schedule over the internet</h5></div>
          </div>
        </div>

        <div ref={aboutSectionRef}>
          <About />
        </div>

        <div id="processContainer">
          <h2 className="homeheading" >How Dakter Saab Web Works</h2>
          <div id="worksdiv">
            <div id="work1">
              <h2>1</h2>
              <p>Register with us and fill out forms<br />Provide your data for complete signup</p>
            </div>
            <div id="work2">
              <h2>2</h2>
              <p>Manage your data, confirm and fulfill user's appointment made through daktersaab app</p>
            </div>
            <div id="work3">
              <h2>3</h2>
              <p>Generate reports and dashboards to analyze performance and profitability</p>
            </div>
          </div>

        </div>
        <div id="downloadcontainer" ref={downloadSectionRef}>
          <h2 className="homeheading">Download App</h2>
          <div id="appdiv">
            <div className="dbtndiv">
              <h3>Search Find & Book<br />At One Tap</h3>
              <h4>All your desired doctors, bloodbanks,<br />hospitals and pharmacies at one place. </h4>
              <button><img src={PlayP}></img></button>
            </div>
            <img src={AppP} className="mobimg"></img>
          </div>

        </div>
        <div ref={contactSectionRef}>
          <Creator />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;