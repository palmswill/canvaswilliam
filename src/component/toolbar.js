import React from 'react'
import { useDispatch} from 'react-redux'
import {deleteTool,hideShowTool} from '../reducers/rootReducers'
import getlist from './gettooolload'





export default()=>{      
    let toollist=[];

    const dispatch=useDispatch();
    const toolstate=({
        tools:getlist()
    })

    console.log(toolstate.tools)
    const handlechange=(e)=>{
        dispatch(hideShowTool(e.target.id[0],Number(e.target.id[2])))      
    }

    const handleclick=(e)=>{
        console.log(e.target.id[0],e.target.id[2]);
        dispatch(deleteTool(e.target.id[0],Number(e.target.id[2])));
    }
   if (toolstate.tools.length){
    toollist=toolstate.tools.map(tool=>{
        return(
            <div className="tool" key={tool.toolid}>    
                <label>
                    <input type="checkbox" id={[tool.ttype,tool.toolid]}  checked={tool.active} onChange={handlechange}/>
                    <span  style={{fontSize:"10px"}}>{tool.name}</span>
                    <button className="toolbut circle" type="button" id={[tool.ttype,tool.toolid]} onClick={handleclick}>X</button>
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

