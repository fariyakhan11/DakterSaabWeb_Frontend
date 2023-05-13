import React from "react";
import DocP from '../../images/doctor1.png'
import BloodP from '../../images/blood1.png'
import HospitalP from '../../images/hospital1.png'
import PharmP from '../../images/drugs1.png'
import UsersP from '../../images/user.png'
import DonorP from '../../images/donor.png'
import './partners.css'

function Partner(){
return(
<>
        <div id="partnerContainer">
        <h2>Our Valued Partners</h2>
        <div className="Partnerlist">
            <div className="PartnerDiv">
                <img src={DocP}></img>
                <h3 className="PartnerName">Doctor</h3>
                <p className="Partner Description"></p>
            </div>

            <div className="PartnerDiv">
                <img src={BloodP}></img>
                <h3 className="PartnerName">Blood Bank</h3>
                <p className="Partner Description"></p>
            </div>

            <div className="PartnerDiv">
                <img src={PharmP}></img>
                <h3 className="PartnerName">Pharmacy</h3>
                <p className="Partner Description"></p>
            </div>

            <div className="PartnerDiv">
                <img src={DonorP}></img>
                <h3 className="PartnerName">Donor</h3>
                <p className="Partner Description"></p>
            </div>

            <div className="PartnerDiv">
                <img src={HospitalP}></img>
                <h3 className="PartnerName">Hospital</h3>
                <p className="Partner Description"></p>
            </div>

            <div className="PartnerDiv">
                <img src={UsersP}></img>
                <h3 className="PartnerName">User</h3>
                <p className="Partner Description"></p>
            </div>
        </div>
        </div>
</>
)
}

export default Partner;