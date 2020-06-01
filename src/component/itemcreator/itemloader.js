import React,{useState,useEffect,useRef}from 'react'
///import { useDispatch} from 'react-redux'
///import {loadMedia} from '../../reducers/rootReducers'



const CAPTURE_OPTIONS = {
    audio: false,
    video: { 
        width: {ideal:1280},
        height:{ideal:720}
     },
};
///
function useUserMedia(requestedMedia) {
    const [mediaStream, setMediaStream] = useState(null);
  
    useEffect(() => {
      async function enableStream() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
          setMediaStream(stream);
        } 
        catch(err) {
        }
      }
  
      if (!mediaStream) {
        enableStream();
      } else {
        return function cleanup() {
          mediaStream.getTracks().forEach(track => {
            track.stop();
          });
        }
      }
    }, [mediaStream, requestedMedia]);
  
    return mediaStream;
  }

function Camera(tool,index) {
    const videoRef = useRef();
    const mediaStream = useUserMedia(CAPTURE_OPTIONS);
    ///const dispatch=useDispatch();
    
  
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
    }
  
    function handleCanPlay() {
      videoRef.current.play();
    }
  
    return (
      <div className="loader">
      <div className="resize cover" id={[tool.ttype,tool.toolid,index]} style={{zIndex:"4",opacity:"1"}} />
      <div className="toolshow cover" id={[tool.ttype,tool.toolid,index]} style={{zIndex:"3",opacity:"0"}} />
      <video id={[tool.ttype,tool.toolid,index]} ref={videoRef} className="toolshow" onCanPlay={handleCanPlay} autoPlay playsInline />
      </div>
    );
  }
  

///



  function useUserScreen(requestedMedia) {
    const [mediaStream, setMediaStream] = useState(null);
  
    useEffect(() => {
      async function enableStream() {
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia(requestedMedia);
          setMediaStream(stream);
        } catch(err) {
          // Removed for brevity
        }
      }
  
      if (!mediaStream) {
        enableStream();
      } else {
        return function cleanup() {
          mediaStream.getTracks().forEach(track => {
            track.stop();
          });
        }
      }
    }, [mediaStream, requestedMedia]);
  
    return mediaStream;
  }

  function Screen(tool,index) {
    const videoRef = useRef();
    const mediaStream = useUserScreen(CAPTURE_OPTIONS);
  
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream;
    }

    function handleCanPlay() {
      videoRef.current.play();
      
    }
    
  
    return (
      <div className="loader">
      <div className="resize cover" id={[tool.ttype,tool.toolid,index]} style={{zIndex:"4",opacity:"1"}} ></div>
      <div className="toolshow cover" id={[tool.ttype,tool.toolid,index]} style={{zIndex:"3",opacity:"0"}} ></div>
      <video id={[tool.ttype,tool.toolid,index]} ref={videoRef} className="toolshow" onCanPlay={handleCanPlay} autoPlay playsInline  />
      </div>
    );
  }






  export default (props)=>{
      const tool=props.tool;
      const index=props.index;
      const media=props.media;

        if (tool.type==="img"){
            return(
                <div className="loader">
                <div className="resize cover" id={[tool.ttype,tool.toolid,index]} style={{zIndex:"4",opacity:"1"}} ></div>
                <div className="toolshow cover" id={[tool.ttype,tool.toolid,index]} style={{zIndex:"3",opacity:"0"}} ></div>
                <img id={[tool.ttype,tool.toolid,index]} className="toolshow" src={process.env.PUBLIC_URL + tool.url } style={{ width:"100%", height:"100%" ,left:"0%", top:"0%", zIndex:"-1",opacity:"1"}} alt=""/>
                </div>
            )
        }

        if (tool.type==="screen"){
            if (tool.active){
            return Screen(tool,index)
            }
            else 
            return ""
        }


        if (tool.type==="camera"){
            return Camera(tool,index,media)
        }


        if(tool.type==="patcamera"){
          if (typeof (props.vid)!=="undefined"){
          return (
          <div className="loader">
      <div className="resize cover" id={[tool.ttype,tool.toolid,index]} style={{zIndex:"4",opacity:"1"}} ></div>
      <div className="toolshow cover" id={[tool.ttype,tool.toolid,index]} style={{zIndex:"3",opacity:"1",top:"0px"}} ></div>
      {props.vid}
      </div> 
          )
          }
          else{
            return (
              <div className="loader">
          <div className="resize cover" id={[tool.ttype,tool.toolid,index]} style={{zIndex:"4",opacity:"1"}} ></div>
          <div className="toolshow cover" id={[tool.ttype,tool.toolid,index]} style={{zIndex:"3",opacity:"1",top:"0px"}} ></div>
          </div> 
              )

          }
        }

        return ("")




  }