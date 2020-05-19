import React from 'react'
import {useSelector} from 'react-redux'
import getlist from './gettooolload'


export default()=>{   
    let toollist=[];
    const toolstate=({
        tools:getlist()
    })
    
    console.log(useSelector((state)=>state.users[0].scenetoollist[0].tools))
    
   if (toolstate.tools.length){
    toollist=toolstate.tools.map(tool=>{
        return(
            <div className="toolshow" key={tool.toolid} style={tool.css}>    
                <label>
                    <img className="toolshow" src={process.env.PUBLIC_URL + tool.url } alt="" /> 
                </label>          
            </div>
        )
    })
    }
return (
    <div>
        {toollist}
    </div>
)        
}

