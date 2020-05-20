import React from 'react'
import {useDispatch} from 'react-redux'
import {sceneSelect} from '../reducers/rootReducers'

export default (prop)=>{
    let sceneshow="";
    const dispatch=useDispatch();
    



    const handleClick=(e)=>{
        dispatch(sceneSelect(e.target.id.toString()))



    }
    
    let scenelist=prop.getData[1];
    let activesceneid=prop.getData[0];
    if (scenelist.length){
        sceneshow=scenelist.map(scene=>{
            if (scene.id===activesceneid){
                
            }
            return (
                <div className="scenelist column" key={scene.id} style={{"borderColor":"blue"}}>
                <img className="sceneshow" id={scene.id} src={process.env.PUBLIC_URL + scene.screenshot } alt="" style={{position:"fixed"}} onClick={handleClick}/>
                </div>
            )
        })


    }

    return(
        <div className="row">
            {sceneshow}
        </div>
    )
}