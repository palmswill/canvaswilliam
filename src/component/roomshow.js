import React ,{useCallback,useEffect,useState,useRef}from 'react'
import Rectangle from './itemcreator/itemcreator.js' 
import Itemloader from './itemcreator/itemloader.js'
import { useDispatch} from 'react-redux'
import {adjustTool} from '../reducers/rootReducers'

import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";


const RoomShow =(props)=>{

    let dragging=props.sceneContent.dragging;
    let resizing=props.sceneContent.resizing;
    let pinned=props.sceneContent.pinned;
    let sceneToolList=props.sceneContent.tools;
    let toollist=props.getData; 
    console.log(sceneToolList);



    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();


    useEffect(() => {
        socket.current = io.connect("/");
        /*
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
          
        })*/
        

        socket.current.on("yourID", (id) => {
            setYourID(id);
          })
          socket.current.on("allUsers", (users) => {
            setUsers(users);
          })
      
          socket.current.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
          })
        }, []);



        function callPeer(id) {
            const peer = new Peer({
              initiator: true,
              trickle: false,
              config: {
        
                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    }
                ]
            },
              stream: stream,
            });
        
            peer.on("signal", data => {
              socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
            })
        
            peer.on("stream", stream => {
              if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
              }
            });
        
            socket.current.on("callAccepted", signal => {
              setCallAccepted(true);
              peer.signal(signal);
            })
        
          }

          function acceptCall() {
            setCallAccepted(true);
            const peer = new Peer({
              initiator: false,
              trickle: false,
              stream: stream,
            });
            peer.on("signal", data => {
              socket.current.emit("acceptCall", { signal: data, to: caller })
            })
        
            peer.on("stream", stream => {
              partnerVideo.current.srcObject = stream;
            });
        
            peer.signal(callerSignal);
          }




    let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video playsInline ref={partnerVideo} autoPlay />
    );
  }


  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    )
  }





        


    
    


    

///<img id={[tool.ttype,tool.toolid]}  className="toolshow" src={process.env.PUBLIC_URL + tool.url } alt="" onMouseDown={handledown} onMouseUp={handleup}  onMouseMove={null}/>
let toolshow="";
if (toollist.length){
    toolshow=toollist.map((tool,index)=>{
        let zdex=0;
        let opacity=0;
        let vid=null
        if (!tool.active){
            zdex=-1
            opacity=0
        }
        if (tool.active){
            zdex=tool.zdex
            opacity=tool.opacity
        }

        if (tool.type==="patcamera"){
            vid=PartnerVideo

        }
        if (tool.type==="camera"){
            vid=PartnerVideo

        }

        for (let parameter in tool.coords){
            if (typeof (tool.coords[parameter])==="number"){
            tool.coords[parameter]=tool.coords[parameter]*1.2265625
            console.log( tool.coords[parameter])
            }
        }
            
            return (
    <Rectangle 
      key={[tool.ttype,tool.toolid,index]}
      dragging={dragging}
      resizing={resizing}
      onMouseDown={null}
      width={tool.coords.width} height={tool.coords.height}
      x={tool.coords.x}
      y={tool.coords.y}
      zdex={zdex}
      opacity={opacity}
    >
    <Itemloader
        id={[tool.ttype,tool.toolid]}
        tool={tool}
        index={index}
        patvid={vid}
    />
    </Rectangle>
            )
        }
    )

    
}


    
return (
    <div>
    {toolshow}
    {Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          return (
            <button onClick={() => callPeer(key)}>Call {key}</button>
          );
        })}
    {incomingCall}
    </div>
)        
}


export default RoomShow