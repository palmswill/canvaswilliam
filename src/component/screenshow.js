import React from 'react'



export default(props)=>{   
    let toollist=[];
    const toolstate=({
        tools:props.getData
    })
    
   if (toolstate.tools.length){
    toollist=toolstate.tools.map(tool=>{
        return(
            <div className="toolshow" key={tool.toolid} style={tool.css}>    
                    <img className="toolshow" src={process.env.PUBLIC_URL + tool.url } alt="" />     
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

