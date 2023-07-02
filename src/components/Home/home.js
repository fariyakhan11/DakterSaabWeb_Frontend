import React , { useRef } from "react";
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

function Home() {
  const aboutSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const homeSectionRef = useRef(null);
  const downloadSectionRef = useRef(null);
  
function scrollToSection(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
<>

    <div id="home_container">
        <div className="MAIN">
        <Navbar 
          scrollToAbout={() => scrollToSection(aboutSectionRef)}
          scrollToContact={() => scrollToSection(contactSectionRef)}
          scrollToHome={() => scrollToSection(homeSectionRef)}
          scrollToDownload={() => scrollToSection(downloadSectionRef)}
        />
        <div className="contrast">

            <div id="displayarealanding" ref={homeSectionRef}>
                <h2>DAKTERSAAB</h2>
                <h3>Provide the best of your Organization</h3>
                <h4>Set up , manage and reach out your healing hands to the community </h4>
                <div id="landingbtndiv">
                    <button>Login</button>
                    <h5>OR</h5>
                    <button>Signup</button>
                </div>
            </div>
            <div id="bottomarealanding">
                <div><img src={HospitalP}/><h4>Hospitals</h4><h5>Cater Appointments , Manage Departments Doctors and Services </h5></div>
                <div><img src={BloodP}/><h4>Blood Banks</h4><h5>Help provide people with instant desired blood services</h5></div>
                <div><img src={PharmP}/><h4>Pharmacies</h4><h5>Manage medicine inventory and help people book medicines online</h5></div>
                <div><img src={DocP}/><h4>Doctors</h4><h5>Manage your clinic appointments and schedule over the internet</h5></div>
            </div>


        </div>


        </div>
        <div ref={aboutSectionRef}>
          <About />
        </div>
        

        <div id="processContainer">
        <h2>How Dakter Saab Web Works</h2>
        <div id="worksdiv">
          <div id="work1">
            <h2>1</h2>
            <p>Register with us and fill out forms<br/>Provide your data for complete signup</p>
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
        <div id="processContainer" ref={downloadSectionRef}>
        <h2>DakterSaab App</h2>
        <div id="appdiv">
        <div>
          <h3>Search Find & Book</h3>
          <h3>At One Tap</h3>
          <h4>All your desired doctors , bloodbanks , hospitals and pharmacies at one place. </h4>
          <button><img src={PlayP}></img>Download App</button>
        </div>
        <img src={AppP}></img>
        </div>
        
        </div>
        <div ref={contactSectionRef}>
          <Creator />
        </div>
        
        <Footer/>
    </div>
</>
  );
}

export default Home;