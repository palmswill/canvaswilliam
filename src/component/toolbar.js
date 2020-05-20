import React from 'react'
import { useDispatch} from 'react-redux'
import {deleteTool,hideShowTool,toolUp,toolDown} from '../reducers/rootReducers'



export default(props)=>{      
    let toollist=[];
    const dispatch=useDispatch();

    const toolstate=({
        tools:props.getData
    })

    const handlechange=(e)=>{
        dispatch(hideShowTool(e.target.id[0],Number(e.target.id[2])))      
    }

    const handleCross=(e)=>{
        
        dispatch(deleteTool(e.target.id[0],Number(e.target.id[2])));
    }

    const handleUp=(e)=>{
        
        dispatch(toolUp(e.target.id[0],Number(e.target.id[2])));
    }

    const handleDown=(e)=>{
        
        dispatch(toolDown(e.target.id[0],Number(e.target.id[2])));
    }
   if (toolstate.tools.length){
    toollist=toolstate.tools.map(tool=>{
        return(
            <div className="tool" key={tool.toolid}>    
                <label>
                    <input type="checkbox" id={[tool.ttype,tool.toolid]}  checked={tool.active} onChange={handlechange}/>
                    <span  style={{fontSize:"10px"}}>{tool.name}</span>
                    <button className="toolbut circle" type="button" id={[tool.ttype,tool.toolid]} onClick={handleCross}>X</button>
                    <button className="upbut " type="button" id={[tool.ttype,tool.toolid]} onClick={handleUp}></button>
                    <button className="downbut " type="button" id={[tool.ttype,tool.toolid]} onClick={handleDown}></button>
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

