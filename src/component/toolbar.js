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
        console.log(e.target.id[4])
        dispatch(hideShowTool(e.target.id[0],Number(e.target.id[2]),e.target.id[4]))      
    }

    const handleCross=(e)=>{
        console.log(e.target.id[4])
        dispatch(deleteTool(e.target.id[0],Number(e.target.id[2]),e.target.id[4]));
    }

    const handleUp=(e)=>{
        console.log(e.target.id[4])
        dispatch(toolUp(e.target.id[0],Number(e.target.id[2]),e.target.id[4]));
    }

    const handleDown=(e)=>{
        console.log(e.target.id[4])
        dispatch(toolDown(e.target.id[0],Number(e.target.id[2]),e.target.id[4]));
    }
   if (toolstate.tools.length){
    toollist=toolstate.tools.map((tool,index)=>{
        return(
            <div className="tool" key={[tool.toolid,index]}>    
                <label>
                    <input type="checkbox" id={[tool.ttype,tool.toolid,index]}  checked={tool.active} onChange={handlechange}/>
                    <span  style={{fontSize:"10px"}}>{tool.name}</span>
                    <button className="toolbut circle" type="button" id={[tool.ttype,tool.toolid,index]} onClick={handleCross}>X</button>
                    <button className="upbut " type="button" id={[tool.ttype,tool.toolid,index]} onClick={handleUp}></button>
                    <button className="downbut " type="button" id={[tool.ttype,tool.toolid,index]} onClick={handleDown}></button>
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

