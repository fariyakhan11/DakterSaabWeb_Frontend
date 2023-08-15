import React from "react";
import './alert.css'
import { useNavigate } from "react-router-dom";
function Alert(props){

const navigate=useNavigate();

const closediv=(e)=>{
document.getElementById('alertarea').style.display='none'

}

const submitok=()=>{
    if(props.alert=="Are you sure you want to logout?"){
        sessionStorage.clear();
        navigate('/')
    }

}
return(
<>
<div id="alertarea">
    <div id="alertcontainer">
        <div id="topalertbar">
            <h1>Alert</h1>
            <div id="closealert" onClick={closediv}>
                <h2>+</h2>
            </div>
        </div>

        <div id="contentareaalert" >
            <h2>{props.alert}</h2>
            <button onClick={submitok}>OK</button>
        </div>
    </div>
</div>
</>

)

}
export default Alert;