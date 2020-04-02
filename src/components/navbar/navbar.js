import React from "react"
import { Link } from "gatsby"

import './navbar.scss'

const NavBar = () => {
    return (
        <div className="navbar-container">
            <Link className="navbar-item" to="/work"><b>Work</b></Link>
            {/* <Link className="navbar-item" to="/work"><b>Links</b></Link> */}
            {/* <Link className="navbar-item" to="/work"><b>About</b></Link> */}
        </div>
    )
}

export default NavBar
