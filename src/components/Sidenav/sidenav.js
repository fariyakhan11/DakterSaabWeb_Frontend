import React from "react";
import './sidenav.css'
import PharmP from '../../images/drugs1.png'
import {AiOutlineHome} from "react-icons/ai";
import {GiMedicines} from "react-icons/gi";
import {FiPackage} from "react-icons/fi";
import {BiPurchaseTag,BiExpand,BiCollapse} from "react-icons/bi";
import { useState ,useEffect} from "react";


function Sidenav({msg }){
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
<div id="sidenavcontainer">
    <div className="organizationLogo">
        <img className="orglogo" src={PharmP}></img>
        <h3 className="orgname">ABC Pharma</h3>
        <p>03302777040</p>
        <p>R145 sector 7 North Karachi , Karachi</p>
        <p>abcpharma@gmail.com</p>
    </div>
    
    <div className="tabscontainer">
        
        <div className="tabsdiv Home "  onClick={selectedtab} id="Home">
            <AiOutlineHome className="tabsicon" id="Home"/>
            <h4 className="tabsname" id="Home">Home</h4>
        </div>
        <div className="tabsdiv Transactions "  onClick={selectedtab} id="Transactions">
            <BiPurchaseTag className="tabsicon" id="Transactions"/>
            <h4 className="tabsname" id="Transactions">Transactions</h4>
        </div>
        <div className="tabsdiv Orders" id="Orders" onClick={selectedtab}>
            <FiPackage className="tabsicon" id="Orders"/>
            <h4 className="tabsname" id="Orders">Orders</h4>
        </div>
 
        <div className="tabsdiv Medicines" id="Medicines" onClick={selectedtab}>
            <GiMedicines className="tabsicon" id="Medicines"/>
            <h4 className="tabsname" id="Medicines">Medicines</h4>
        </div>
    </div>

<BiCollapse id="collapsebtn" onClick={expandhandler}/>
</div>
 }



{!expanded && 
<div id="sidecollapsedcontainer">
<img className="orglogo" src={PharmP}></img>
<div className="tabsrow">
<div className="tabscollapsed Home " onClick={selectedtab} id="Home">
<AiOutlineHome className="tabsicon" id="Home"/>
</div>
<div className="tabscollapsed Transactions" onClick={selectedtab} id="Transactions">
<BiPurchaseTag className="tabsicon" id="Transactions"/>
</div>
<div className="tabscollapsed Orders" onClick={selectedtab} id="Orders">
 <FiPackage className="tabsicon" id="Orders"/>
</div>
<div className="tabscollapsed Medicines" onClick={selectedtab} id="Medicines">
<GiMedicines className="tabsicon" id="Medicines"/>
</div>
</div>

<BiExpand id="expandbtn" onClick={expandhandler}/>
</div>
}



</>
)
}

export default Sidenav;