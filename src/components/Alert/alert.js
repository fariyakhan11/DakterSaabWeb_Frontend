import React from "react";
import './alert.css'

function Alert(props,{msg}){

const closediv=(e)=>{
document.getElementById('alertarea').style.display='none'

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

        <div id="contentareaalert">
            <h2>{props.alert}</h2>
            <button>OK</button>
        </div>
    </div>
</div>
</>

)

}
export default Alert;