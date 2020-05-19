import React from 'react'
import './mainshow.css'
import Toolbar from './toolbar.js'
import Screenshow from './screenshow.js'


const Mainshow=()=>{
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
        <Screenshow/>
        </div>
        <div className="dider" id="toolbox">  
        <Toolbar />
        </div>
    </div>
    </div>
    )
}
export default Mainshow