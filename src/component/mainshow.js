import React from 'react'
import './mainshow.css'
import Toolbar from './toolbar.js'
import Screenshow from './screenshow.js'
import getlist from './gettooolload.js'
import Scenelist from './scenelist.js'





const Mainshow=()=>{
    const [scenelist,toolList]=getlist();

    

    return(
    <div >
    <div className="dider" id="top">
        <div className="dider" id="sceneslot">
        <Scenelist getData={scenelist}/>
        </div>
        <div className="dider" id="videooptslot"></div>
        <div className="dider" id="liveslot"></div>
    </div>
    <div className="dider" id="midop">
        <div className="dider" id="canvas">
        <Screenshow getData={toolList}/>
        </div>
        <div className="dider" id="toolbox">  
        <Toolbar getData={toolList}/>
        </div>
    </div>
    </div>
    )
}
export default Mainshow