import React ,{useState,useCallback,useEffect}from 'react'
import Rectangle from './itemcreator/itemcreator.js' 


export default(props)=>{   
    let toollist=props.getData;
    const inistate={};
    for (let index in toollist){
        let stkey=(toollist[index].ttype+toollist[index].toolid)
        inistate[stkey]=[0,0]
    }
    inistate.dragging=false
    
    

    const [state,setstate]=useState(inistate)
  
    
   console.log(state.dragging) 
    const handledown=useCallback(()=>{
        setstate(prevState=>({
            ...prevState,
            dragging:true
        }));
    },[]);
    
    const handlemove=useCallback(
        ({target,clientX,clientY})=>{
            if (state.dragging && target.className==="toolshow"){
                let tkey=target.id[0].toString()+target.id[2].toString();
                    setstate(prevState=>({...prevState,
                        [tkey]:[Math.round((clientX-24)/10)*10,Math.round((clientY-83)/10)*10]


                    }))  /// eg. {p1:[34,59], p2:[54,54],dragging:true}                
            }},
        [state]
    );
    
    
    

    

    const handleup= useCallback(() => {
        if (state.dragging) {
            setstate(prevState => ({
              ...prevState,
              dragging: false
            }));}
          },[state.dragging])
   
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
    toolshow=toollist.map(tool=>{
        if (tool.active){
            let stkey=(tool.ttype.toString()+tool.toolid.toString())
            return (
    <Rectangle 
      key={[tool.ttype,tool.toolid]}
      dragging={state.dragging}
      onMouseDown={handledown}
      width={0} length={0}
      x={state[stkey][0]}
      y={state[stkey][1]}
    >
    <img id={[tool.ttype,tool.toolid]} className="toolshow" src={process.env.PUBLIC_URL + tool.url } alt=""/>
    </Rectangle>
            )

        }
    })


    console.log(toolshow)
    
}


    
return (
    <div>
    {toolshow}
    </div>
)        
}

