import React from "react";
import Pic1 from '../../images/pic1.png'
import Pic2 from '../../images/pic2.png'
import './about.css'

function About(){
return(
<div style={{width:'100%'}}>
    <div id="AboutContainer">
        <h2>About DakterSaab</h2>
        <table>
            <tr><td>
                <p style={{padding:'1.5em',lineHeight: '1.8em'}}>Doctor Saab is a comprehensive healthcare app that helps patients find and connect with the right healthcare providers. The mobile app offers features such as searching for nearby doctors based on their specialties, filtering results based on prices and feedback, booking appointments, and searching for nearby blood banks, blood donors, and medicines. The web app serves as a platform for healthcare institutions to register and provide their contact information for patients to connect with them easily.</p></td><td><img src={Pic2} style={{width:'60%'}}></img></td></tr>
            <tr><td><img src={Pic1} style={{width:'80%'}}></img></td>
            <td><p>Doctor Saab aims to bridge the gap between patients and healthcare providers, making it easier for patients to find the right care and for healthcare providers to reach more patients. The app provides a user-friendly and comprehensive solution to revolutionize the way people access healthcare, by enabling patients to find suitable healthcare providers and enabling healthcare providers to manage their data more efficiently. </p></td></tr>
        </table>
    </div>
</div>
)
}

export default About;