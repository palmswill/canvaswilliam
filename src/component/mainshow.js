import React, {useEffect,useRef} from 'react'
import './mainshow.css'
import Navbar from './navbar';
import Toolbar from './toolbar.js'
import Screenshow from './screenshow.js'
import getlist from './gettooolload.js'
import Scenelist from './scenelist.js'





const Mainshow=()=>{
    const [scenelist,toolList,sceneContent]=getlist();


    const stream=()=>{
        const url = 'http://localhost:3000/room';
        window.open(url, '_blank');
    }
    let height=useRef();
    let width=useRef();
    useEffect(() => {
        height.current=document.getElementById("screenshowbarrier").offsetHeight
        width.current=document.getElementById("screenshowbarrier").offsetWidth

        console.log(height.current,width.current)
        
    }, [])
    

    return(
    <div >
    <Navbar />
    <div className="dider" id="top">
        <div className="dider" id="sceneslot">
        <Scenelist getData={scenelist}/>
        </div>
        <div className="dider" id="videooptslot">
        <button style={{fontSize:"5px",position:'absolute', top:"2px"}} onClick={stream}>Start</button>
        </div>
        <div className="dider" id="liveslot"></div>
    </div>
    <div className="dider" id="midop">
        <div className="dider" id="canvas">
        <Screenshow getData={toolList} sceneContent={sceneContent}/>
        </div>
        <div className="dider" id="toolbox">  
        <Toolbar getData={toolList}/>
        </div>
    </div>
    </div>
    )
}
export default Mainshow