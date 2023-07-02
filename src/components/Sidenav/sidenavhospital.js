import React from "react";
import './sidenavhospital.css'
import HospitalP from '../../images/hospital1.png'
import {AiOutlineHome} from "react-icons/ai";
import {BiBuildings} from "react-icons/bi";
import { useState ,useEffect} from "react";
import {TbStethoscope} from "react-icons/tb";
import {BiExpand,BiCollapse} from "react-icons/bi";
import {MdOutlineFeedback} from "react-icons/md";

function Sidenavhospital({msg }){
    const [expanded,setexpanded]=useState(true);
    
    useEffect(() => {
        sessionStorage.setItem('current_tab', 'Home');
        let elements=document.querySelectorAll('.Home');
        elements.forEach(e => {
            e.classList.add('selectedtab');
        });
        msg({expanded:expanded,tab:sessionStorage.getItem('current_tab')})
    },[])

    useEffect(()=>{
        let select_tab="."+sessionStorage.getItem('current_tab')
        let sel=document.querySelectorAll(select_tab);
        sel.forEach(s => {
            s.classList.add('selectedtab');
        });
        msg({expanded:expanded,tab:sessionStorage.getItem('current_tab')})
    })

    const expandhandler=()=>{
        if(expanded){
            setexpanded(false)
            msg({expanded:false,tab:sessionStorage.getItem('current_tab')})

        }
        else{
            setexpanded(true)
            msg({expanded:true,tab:sessionStorage.getItem('current_tab')})
        }
    }

    const selectedtab=(e)=>{
        if(e.target.id){
            sessionStorage.setItem('current_tab', e.target.id);
            let active=document.querySelectorAll('.selectedtab');
            active.forEach(a=>{
                a.classList.remove('selectedtab');
            })
            
            let sel=document.querySelectorAll("."+sessionStorage.getItem('current_tab'));
            sel.forEach(s => {
                s.classList.add('selectedtab');
            });
            msg({expanded:expanded,tab:sessionStorage.getItem('current_tab')})
        }
    }
    
   
return(
<>
{expanded &&
<div id="sidenavcontainerhospital">
    <div className="organizationLogo">
        <img className="orglogo" src={HospitalP}></img>
        <h3 className="orgname">ABC Hospital</h3>
        <p>03302777040</p>
        <p>R145 sector 7 North Karachi , Karachi</p>
        <p>abcpharma@gmail.com</p>
    </div>
    
    <div className="tabscontainer">
        
        <div className="tabsdiv Home "  onClick={selectedtab} id="Home">
            <AiOutlineHome className="tabsicon" id="Home"/>
            <h4 className="tabsnamehospital" id="Home">Home</h4>
        </div>
        <div className="tabsdiv Doctors "  onClick={selectedtab} id="Doctors">
            <TbStethoscope className="tabsicon" id="Doctors"/>
            <h4 className="tabsnamehospital" id="Doctors">Doctors</h4>
        </div>
        <div className="tabsdiv Departments" id="Departments" onClick={selectedtab}>
            <BiBuildings className="tabsicon" id="Departments"/>
            <h4 className="tabsnamehospital" id="Departments">Departments</h4>
        </div>
        <div className="tabsdiv News" id="News" onClick={selectedtab}>
            <MdOutlineFeedback className="tabsicon" id="News"/>
            <h4 className="tabsnamehospital" id="News">Complaints News and Requests</h4>
        </div>
 

    </div>

<BiCollapse id="collapsebtn" onClick={expandhandler}/>
</div>
 }



{!expanded && 
<div id="sidecollapsedcontainerhospital">
<img className="orglogo" src={HospitalP}></img>
<div className="tabsrow">
<div className="tabscollapsed Home " onClick={selectedtab} id="Home">
<AiOutlineHome className="tabsicon" id="Home"/>
</div>
<div className="tabscollapsed Doctors" onClick={selectedtab} id="Doctors">
<TbStethoscope className="tabsicon" id="Doctors"/>
</div>
<div className="tabscollapsed Departments" onClick={selectedtab} id="Departments">
 <BiBuildings className="tabsicon" id="Departments"/>
</div>
<div className="tabscollapsed News" onClick={selectedtab} id="News">
<MdOutlineFeedback className="tabsicon" id="News"/>
</div>
</div>

<BiExpand id="expandbtn" onClick={expandhandler}/>
</div>
}



</>
)
}

export default Sidenavhospital;