import {useSelector} from 'react-redux'



////prepare loading list for screenshow and toolbar.js
const Getlist = ()=>{
    console.log("sceneloaded");
    var activeuserid=useSelector((state)=>state.users.findIndex(user=>user.id===state.activeaccount))
    var activesceneid=useSelector((state)=>state.users[activeuserid].scenetoollist.findIndex(scene=>scene.id===state.users[activeuserid].activescene))
    var activetoollist=useSelector((state)=>state.users[activeuserid].scenetoollist[activesceneid].tools)
    var activescenecontent=useSelector((state)=>state.users[activeuserid].scenetoollist[activesceneid])

    var ptoollist=useSelector((state)=>state.users[state.users.findIndex(user=>user.id===state.activeaccount)].ptooldata);
    /// call up active scenes
    const activescenelist=useSelector((state)=>state.users[activeuserid].scenelist)
    /// arrange the activetools to pair with corresponding data 
    let toollist=[];
    for (let activei in activetoollist){
        for (let tooli in ptoollist){
            
            if (activetoollist[activei].toolid===ptoollist[tooli].toolid){
                toollist.push({...activetoollist[activei],...ptoollist[tooli]})
            }
        }
    }


    ///check if item needs to be showed and turn on/off
    toollist=JSON.parse(JSON.stringify(toollist))
    console.log(activetoollist)

   


    return [[activesceneid,activescenelist],toollist,activescenecontent]

    
}


export default Getlist