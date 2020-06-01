import React from 'react';
import Roomshow from './roomshow'
import getlist from './gettooolload'


const Room =()=>{

const [scenelist,toolList,sceneContent]=getlist();



return(
<div id="showpage">
<div className="side"></div>
<Roomshow getData={toolList} sceneContent={sceneContent} ></Roomshow>
<div className="side"></div>
</div>)




}



export default Room