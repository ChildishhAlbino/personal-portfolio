import React from "react"
import { Link } from "gatsby"

import './navbar.scss'

const NavBar = () => {
    return (
        <div className="navbar-container">
            <Link className="navbar-item" activeClassName="active-navbar-item" to="/work"><b>Work</b></Link>
            <Link className="navbar-item" activeClassName="active-navbar-item" to="/about"><b>About</b></Link>
            <Link className="navbar-item" activeClassName="active-navbar-item" to="/links"><b>Links</b></Link>
        </div>
    )
}

export default NavBar
