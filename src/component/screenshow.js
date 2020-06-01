import React ,{useCallback,useEffect}from 'react'
import Rectangle from './itemcreator/itemcreator.js' 
import Itemloader from './itemcreator/itemloader.js'
import { useDispatch} from 'react-redux'
import {adjustTool} from '../reducers/rootReducers'



export default(props)=>{  
    const dispatch=useDispatch();
    let dragging=props.sceneContent.dragging;
    let resizing=props.sceneContent.resizing;
    let pinned=props.sceneContent.pinned;
    let sceneToolList=props.sceneContent.tools;
    let toollist=props.getData; 

    console.log(sceneToolList);



    


    const handledown=useCallback(({target})=>{
        let focus={};
        console.log("indexscreenshow:",target.id[4])
        if (target.classList.contains("toolshow")){
            focus=sceneToolList[target.id[4]];
            focus.focus=true;
            console.log(sceneToolList[target.id[4]])
            if (!focus.pinned){
            dispatch(adjustTool(target.id[0],target.id[2],focus,false,true,false,target.id[4]))
            }
           
    };
    if (target.classList.contains("resize")){
        focus=sceneToolList[target.id[4]];
        focus.focus=true;
        console.log(sceneToolList[target.id[4]])
        if (!focus.pinned) {
            dispatch(adjustTool(target.id[0], target.id[2], focus, true, false, false, target.id[4]))
        }


    };
    }
    
    
    ,[sceneToolList,dispatch]);


    const handleup= useCallback(({target}) => {
        if (target.classList.contains("toolshow") ||target.classList.contains("resize") ){
            let focus={};
            focus=sceneToolList[target.id[4]];
            focus.focus=true;
        if (dragging || resizing){
            dispatch(adjustTool(target.id[0],target.id[2],focus,false,false,false,target.id[4]))
        }
    }
        
          },[dispatch,dragging,resizing,sceneToolList])

    
    const handlemove=useCallback(
        ({target,clientX,clientY})=>{
            let focus={};
            let [x,y,width,height]=[0,0,0,0]
            if (target.classList.contains("toolshow")||target.classList.contains("resize")){
            focus=sceneToolList[target.id[4]];
            [x,y,width,height]=[focus.coords.x,focus.coords.y,focus.coords.width,focus.coords.height]
            }
            /*
            for (let item in sceneToolList){
                if (sceneToolList[item].ttype===target.id[0] && sceneToolList[item].toolid.toString()===target.id[2].toString()){
                    focus=sceneToolList[item];
                    [x,y,width,height]=[focus.coords.x,focus.coords.y,focus.coords.width,focus.coords.height]
                }
            }
            */
            if (dragging && target.classList.contains("toolshow")&&focus.focus){
                focus.coords={x:Math.round((clientX-30-(width/3))/10)*10,y:Math.round((clientY-83-(height/3))/10)*10,width:width,height:height}
                dispatch(adjustTool(target.id[0],target.id[2],focus,false,true,false,target.id[4]))  
            }  
            
            if (resizing && target.classList.contains("resize")){
                focus.coords={x:x,y:y,width:Math.round((clientX-x)/10)*10,height:Math.round((clientY-y-53)/10)*10}
                dispatch(adjustTool(target.id[0],target.id[2],focus,true,false,false,target.id[4]))  
            }
            
          
        }
        
        ,
        [dragging,sceneToolList,resizing,dispatch]
    );
    
    
    

    

    
   
        useEffect(() => {
            window.addEventListener("mousemove", handlemove);
            window.addEventListener("mouseup", handleup);
        
            return () => {
              window.removeEventListener("mousemove", handlemove);
              window.removeEventListener("mouseup", handleup);
            };
          }, [handlemove, handleup]);


///<img id={[tool.ttype,tool.toolid]}  className="toolshow" src={process.env.PUBLIC_URL + tool.url } alt="" onMouseDown={handledown} onMouseUp={handleup}  onMouseMove={null}/>
let toolshow="";
if (toollist.length){
    toolshow=toollist.map((tool,index)=>{
        let media=null;
        let zdex=0;
        let opacity=0;
        if(typeof (tool.media) !=="undefined"){
            media=tool.media
            console.log(tool.media)
        }
        if (!tool.active){
            zdex=-1
            opacity=0
        }
        else{
            zdex=tool.zdex
            opacity=tool.opacity
        }
            
            return (
    <Rectangle 
      key={[tool.ttype,tool.toolid,index]}
      dragging={dragging}
      resizing={resizing}
      onMouseDown={handledown}
      width={tool.coords.width} height={tool.coords.height}
      x={tool.coords.x}
      y={tool.coords.y}
      zdex={zdex}
      opacity={opacity}
    >
    <Itemloader
        id={[tool.ttype,tool.toolid]}
        tool={tool}
        media={media}
        index={index}
    />
    </Rectangle>
            )
        }
    )

    
}


    
return (
    <div>
    <div id="screenshowbarrier"></div>
    {toolshow}
    </div>
)        
}

