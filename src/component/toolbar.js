import React,{ useState, useEffect } from 'react'
import {connect} from 'react-redux'



const Toolbar=(props)=>{
    var toollist="";
    const [toolstate, toolchange]=useState({
        tools:props.tools
    })
    const handlechange=(e)=>{
        let toolorder=0;        
        toolstate.tools.map(tool=>{
            if (tool.id.toString() === e.target.id){    
                let toolmirror=tool;                
                toolmirror.active=e.target.checked;
                let toolstatemirror=toolstate.tools;
                toolstatemirror[toolorder]=toolmirror;
                toolchange({tools:toolstatemirror})
                
            }   
        toolorder++
        return ""}
            )
    }

    const handleclick=(e)=>{
        ///let toolorder=0;        
        toolstate.tools.map(tool=>{
            if (tool.id.toString() === e.target.id){
                props.deleteTool(tool.ptoolid)  
                /*                
                let toolstatemirror=toolstate.tools;
                toolstatemirror.splice(toolorder,1)
                toolchange({tools:toolstatemirror})
                */
            }   
            ///toolorder++
        return ""}
            )
    }


    useEffect(()=>{
    props.passToolData(toolstate)
    
    })


   if (toolstate.tools.length){
    toollist=toolstate.tools.map(tool=>{
        return(
            <div className="tool" key={tool.id}>    
                <label>
                    <input type="checkbox" id={tool.id} defaultChecked onChange={handlechange}/>
                    <span  style={{fontSize:"10px"}}>{tool.name}</span>
                    <button className="toolbut circle" type="button" id={tool.id} onClick={handleclick}>X</button>
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
    
const mapStateToProps=(state)=>{
    console.log(state.users)
    const activeuser=state.users.filter(user=>{return user.id===1})
    const activescenetool=activeuser[0].scenetoollist[0];    
    const ptooldata=activeuser[0].ptooldata;
    let tools=[];
    for (let item in activescenetool){
        for (let ptool in ptooldata){
            if(activescenetool[item].toolid === ptooldata[ptool].ptoolid){
            ptooldata[ptool]["active"]=activescenetool[item]["active"]
            ptooldata[ptool]["id"]=(tools.length+1)
            tools.push(ptooldata[ptool]);
            } 
        }
    }
    return{
        tools:tools
    }


}

const mapDispatchToProps = (dispatch) =>{
    return{
        deleteTool: (id) =>{dispatch({type:'DELETE_TOOL',id:id})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Toolbar);
