import React from 'react'
import './mainshow.css'
import Toolbar from './toolbar.js'
import Screenshow from './screenshow.js'
import getlist from './gettooolload.js'
import Scenelist from './scenelist.js'





const Mainshow=()=>{
    const [scenelist,toolList]=getlist();

    
    const inistate={};
    for (let index in toolList){
        let stkey=(toolList[index].ttype+toolList[index].toolid)
        inistate[stkey]=[0,0,120,120,false]
    }
    inistate.dragging=false
    inistate.resize=false

    

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
        <Screenshow getData={toolList} ini={inistate}/>
        </div>
        <div className="dider" id="toolbox">  
        <Toolbar getData={toolList}/>
        </div>
    </div>
    </div>
    )
}
export default Mainshow