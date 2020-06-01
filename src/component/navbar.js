import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar=()=>{
    return(
        <nav className="nav-wrapper green darken-3"style={{ height:"10px","lineHeight":"10px",width:"100%"}}>
            <div className="container"></div>
            <div className="brand-logo left" style={{"fontSize":"10px"}}>Canvas</div>
            <ul className="right" >
                <li ><NavLink className="but" to="/" >Stream</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/room">Room</NavLink></li>

            </ul> 
            
        </nav>
    )
}

export default Navbar