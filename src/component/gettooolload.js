import {useSelector} from 'react-redux'



////prepare loading list for screenshow and toolbar.js
export default ()=>{
    var activeuserid=useSelector((state)=>state.users.findIndex(user=>user.id===Number(state.activeaccount)))
    var activesceneid=useSelector((state)=>state.users[activeuserid].scenetoollist.findIndex(scene=>scene.id===state.users[activeuserid].activescene))
    ///console.log(useSelector((state)=>state.users[activeuserid].scenetoollist[0]),activesceneid)
    var activetoollist=useSelector((state)=>state.users[activeuserid].scenetoollist[activesceneid].tools)
    var ptoollist=useSelector((state)=>state.users[state.users.findIndex(user=>user.id===Number(state.activeaccount))].ptooldata);

    let toollist=[];
    for (let activei in activetoollist){
        for (let tooli in ptoollist){
            
            if (activetoollist[activei].toolid===ptoollist[tooli].toolid){
                toollist.push({...activetoollist[activei],...ptoollist[tooli]})
            }
        }
    }
    
    toollist=JSON.parse(JSON.stringify(toollist))
    for (let tool in toollist){
        if (toollist[tool].active){
        toollist[tool].css.opacity=toollist[tool].opacity
        }
        else {
            toollist[tool].css.opacity=0

        }

    }


    function quickSortF(arr) {
        // Base case
        if (!arr.length) return []
    
        const [head, ...tail] = arr,
              
              left = tail.filter( e => e.zdex < head.zdex),
              right = tail.filter( e => e.zdex >= head.zdex)
    
           return quickSortF(left).concat(head, quickSortF(right))           
    
    }



    return quickSortF(toollist)

    
}