import React, { useState, useEffect } from 'react'
import './mainshow.css'
import Toolbar from './toolbar.js'
import Screenshow from './screenshow.js'


const Mainshow=()=>{
    const [toolbardata, settoolbardata] = useState("");
    useEffect(()=>{
    }
    )
    return(
    <div >
    <div className="dider" id="top">
        <div className="dider" id="iconslot"></div>
        <div className="dider" id="sceneslot"></div>
        <div className="dider" id="videooptslot"></div>
        <div className="dider" id="liveslot"></div>
    </div>
    <div className="dider" id="midop">
        <div className="dider" id="canvas">
        </div>
        <div className="dider" id="toolbox">  
        <Toolbar passToolData={settoolbardata}/>
        </div>
    </div>
    </div>
    )
}
export default Mainshow