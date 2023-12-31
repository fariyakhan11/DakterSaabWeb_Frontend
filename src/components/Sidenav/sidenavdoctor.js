import React from "react";
import './sidenavdoctor.css'
import DocP from '../../images/doctor1.png'
import { AiOutlineHome, AiOutlineBook } from "react-icons/ai";
import { BiExpand, BiCollapse } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { useState, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { MdSchedule } from "react-icons/md";
import Alert from '../Alert/alert';
function Sidenavdoctor({ msg }) {
    const [expanded, setexpanded] = useState(true);
    const [logoutalert, setlogoutalert] = useState(false)
    useEffect(() => {
        sessionStorage.setItem('current_tab', 'Home');
        let elements = document.querySelectorAll('.Home');
        elements.forEach(e => {
            e.classList.add('selectedtab');
        });
        msg({ expanded: expanded, tab: sessionStorage.getItem('current_tab') })
    }, [])

    useEffect(() => {
        let select_tab = "." + sessionStorage.getItem('current_tab')
        let sel = document.querySelectorAll(select_tab);
        sel.forEach(s => {
            s.classList.add('selectedtab');
        });
        msg({ expanded: expanded, tab: sessionStorage.getItem('current_tab') })
    })

    const expandhandler = () => {
        if (expanded) {
            setexpanded(false)
            msg({ expanded: false, tab: sessionStorage.getItem('current_tab') })

        }
        else {
            setexpanded(true)
            msg({ expanded: true, tab: sessionStorage.getItem('current_tab') })
        }
    }

    const selectedtab = (e) => {
        if (e.target.id) {
            sessionStorage.setItem('current_tab', e.target.id);
            let active = document.querySelectorAll('.selectedtab');
            active.forEach(a => {
                a.classList.remove('selectedtab');
            })

            let sel = document.querySelectorAll("." + sessionStorage.getItem('current_tab'));
            sel.forEach(s => {
                s.classList.add('selectedtab');
            });
            msg({ expanded: expanded, tab: sessionStorage.getItem('current_tab') })
        }
    }


    return (
        <>
            {logoutalert &&
                <Alert alert="Are you sure you want to logout?" />
            }
            {expanded &&
                <div id="sidenavcontainerdoctor">
                    <div className="organizationLogo">
                        <img className="orglogo" src={DocP}></img>
                        <h3 className="orgname">{sessionStorage.getItem('org_name')}</h3>
                        <p>{sessionStorage.getItem('phone')}</p>
                        <p>{sessionStorage.getItem('email')}</p>
                    </div>

                    <div className="tabscontainer">

                        <div className="tabsdiv Home " onClick={selectedtab} id="Home">
                            <AiOutlineHome className="tabsicon" id="Home" />
                            <h4 className="tabsnamedoctor" id="Home">Home</h4>
                        </div>
                        <div className="tabsdiv Appointments " onClick={selectedtab} id="Appointments">
                            <AiOutlineBook className="tabsicon" id="Appointments" />
                            <h4 className="tabsnamedoctor" id="Appointments">Appointments</h4>
                        </div>
                        <div className="tabsdiv Schedule" id="Schedule" onClick={selectedtab}>
                            <MdSchedule className="tabsicon" id="Schedule" />
                            <h4 className="tabsnamedoctor" id="Schedule">Schedule</h4>
                        </div>
                        <div className="tabsdiv Profile" id="Profile" onClick={selectedtab}>
                            <BsPerson className="tabsicon" id="Profile" />
                            <h4 className="tabsnamedoctor" id="Profile">Profile</h4>
                        </div>
                        <div className="tabsdiv Logout" id="Logout" onClick={() => { setlogoutalert(true) }}>
                            <FiLogOut className="tabsicon" id="Logout" />
                            <h4 className="tabsnamedoctor" id="Logout">Logout</h4>
                        </div>
                        <div className="collapsecontainer">
                            <BiCollapse className="collapsebtn" onClick={expandhandler} />
                        </div>
                    </div>


                </div>
            }



            {!expanded &&
                <div id="sidecollapsedcontainerdoctor">
                    <img className="orglogo" src={DocP}></img>
                    <div className="tabsrow">
                        <div className="tabscollapsed Home " onClick={selectedtab} id="Home">
                            <AiOutlineHome className="tabsicon" id="Home" />
                        </div>
                        <div className="tabscollapsed Appointments" onClick={selectedtab} id="Appointments">
                            <AiOutlineBook className="tabsicon" id="Appointments" />
                        </div>
                        <div className="tabscollapsed Schedule" onClick={selectedtab} id="Schedule">
                            <MdSchedule className="tabsicon" id="Schedule" />
                        </div>
                        <div className="tabscollapsed Profile" onClick={selectedtab} id="Profile">
                            <BsPerson className="tabsicon" id="Profile" />
                        </div>
                        <div className="tabscollapsed Profile" onClick={selectedtab} id="Profile">
                            <BiUser className="tabsicon" id="Profile" />
                        </div>
                        <div className="tabscollapsed Logout" onClick={() => { setlogoutalert(true) }} id="Logout">
                            <FiLogOut className="tabsicon" id="Logout" />
                        </div>
                        <div className="tabscollapsed">
                            <BiExpand id="expandbtn" onClick={expandhandler} />
                        </div>
                    </div>

                </div>
            }



        </>
    )
}

export default Sidenavdoctor;