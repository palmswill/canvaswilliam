import React ,{useState,useCallback,useEffect,useMemo}from 'react'
import Rectangle from './itemcreator/itemcreator.js' 


export default(props)=>{  
    let toollist=props.getData; 
    const inistate = useMemo(() => {
        console.log("memoed")
        var inistate = {};
        for (let index in toollist) {
            let stkey = (toollist[index].ttype + toollist[index].toolid)
            inistate[stkey] = [0, 0, 120, 120, false]
        }
        inistate.dragging=false
        inistate.resize=false
        return inistate
    }, [toollist])
    console.log(inistate)

    const[state, setstate]=useState(inistate)

    useEffect(()=>{
        console.log(1);
        setstate(inistate);
    },[inistate]);
    /*
    const inistate={};
    for (let index in toollist){
        let stkey=(toollist[index].ttype+toollist[index].toolid)
        inistate[stkey]=[0,0,120,120,false]
    }
    inistate.dragging=false
    inistate.resize=false
    console.log("ini:",inistate)
    */
   /*
    console.log(props.ini)
    const [prevstate,setprevstate]=useState(null);
    if (props.ini !== prevstate){
        console.log("changed")
        setstate(props.ini)
        setprevstate(props.ini)
        }
    console.log("state:",state)
    */
  
    const handledown=useCallback(({target})=>{
        if (target.className==="toolshow"){
            let tkey=target.id[0].toString()+target.id[2].toString();
        setstate(prevState=>({   
            ...prevState,
            [tkey]:[prevState[tkey][0],prevState[tkey][1],prevState[tkey][2],prevState[tkey][3],true],
            dragging:true,
            resize:false
        }))};

    

    if (target.className==="resize"){
        setstate(prevState=>({
            ...prevState,
            dragging:false,
            resize:true
        }))};
    }
    
    
    ,[]);
    
    const handlemove=useCallback(
        ({target,clientX,clientY})=>{
            if (state.dragging && target.className==="toolshow"){
                let tkey=target.id[0].toString()+target.id[2].toString();
                const[width,height]=[state[tkey][2],state[tkey][3]]
                if (state[tkey][4]){///&& (clientX-30-(width/3))>=0 && clientY-83-(height/5)>=0){
                    setstate(prevState=>({...prevState,
                        [tkey]:[Math.round((clientX-30-(width/3))/10)*10,Math.round((clientY-83-(height/5))/10)*10,prevState[tkey][2],prevState[tkey][3],prevState[tkey][4]]
                    })
                    )  /// eg. {p1:[34,59,60,60], p2:[54,54,60,60],dragging:true,resize:false,focus:true}                
                    console.log(state[tkey])
                }
                }
            if (state.resize && target.className==="resize"){
                let tkey=target.id[0].toString()+target.id[2].toString();
                const[x,y,width,height]=[state[tkey][0],state[tkey][1],state[tkey][2],state[tkey][3]]
                    let movex=clientX-x-width+10
                    let movey=clientY-y-height-53

                    setstate(prevState=>({...prevState,
                        [tkey]:[prevState[tkey][0],prevState[tkey][1],Math.round((prevState[tkey][2]+movex)/10)*10,Math.round((prevState[tkey][3]+movey)/10)*10,prevState[tkey][4]]


                    }))
                    console.log(state[tkey],movex,movey)  /// eg. {p1:[34,59,60,60], p2:[54,54,60,60],dragging:false,resize:true}                
            }
        },
        [state]
    );
    
    
    

    

    const handleup= useCallback(({target}) => {
        if (target.className==="toolshow" ||target.className==="resize" ){
        let tkey=target.id[0].toString()+target.id[2].toString();
        if (state.dragging) {
            setstate(prevState => ({
              ...prevState,
              [tkey]:[prevState[tkey][0],prevState[tkey][1],prevState[tkey][2],prevState[tkey][3],false],
              dragging: false,
            }));}
        if (state.resize){setstate(prevState => ({
            ...prevState,
            resize: false,
          }));}
        }
          },[state])
   
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
      width={state[stkey][2]} height={state[stkey][3]}
      x={state[stkey][0]}
      y={state[stkey][1]}
      zdex={tool.zdex}
    >
    <img id={[tool.ttype,tool.toolid]} className="toolshow" src={process.env.PUBLIC_URL + tool.url } alt=""/>
    <img id={[tool.ttype,tool.toolid]} className="resize" src={`${process.env.PUBLIC_URL}./resize.png` } style={{ width:"40%", height:"40%" ,left:"60%", top:"60%", opacity:"0"}} alt=""/>
    </Rectangle>
            )
        }
        return ""
    })

    
}


    
return (
    <div>
    {toolshow}
    </div>
)        
}

