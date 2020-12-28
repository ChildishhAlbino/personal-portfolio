import React from "react"
import { Link } from "gatsby"
import Switch from "react-switch"
import { FaMoon, FaSun } from "react-icons/fa"
import "./navbar.scss"

class NavBar extends React.Component {
  state = {
    theme: null,
  }

  componentDidMount() {
    this.setState({ theme: window.__theme, ...this.props })
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme })
    }
  }
  render() {
    return (
      <div className="navbar-wrapper">
        <h1>
          <Link className="header-title" to={`/`}>
            {this.state.title}
          </Link>
        </h1>
        <div className="navbar-container">
          <Link
            className="navbar-item"
            activeClassName="active-navbar-item"
            to="/work"
          >
            <b>Work</b>
          </Link>
          <Link
            className="navbar-item"
            activeClassName="active-navbar-item"
            to="/about"
          >
            <b>About</b>
          </Link>
          <Link
            className="navbar-item"
            activeClassName="active-navbar-item"
            to="/projects"
          >
            <b>Projects</b>
          </Link>
        </div>
        <div className="toggle-container">
          {// conditional block that eliminates the flickering bug
          this.state.theme !== null ? (
            <Switch
              checked={this.state.theme === "dark"}
              onChange={checked =>
                window.__setPreferredTheme(checked ? "dark" : "light")
              }
              checkedIcon={
                <div className="toggle-icon">
                  <FaMoon></FaMoon>
                </div>
              }
              uncheckedIcon={
                <div className="toggle-icon">
                  <FaSun></FaSun>
                </div>
              }
              offColor="#ff145a"
              onColor="#a0a5ff"
              height={28}
              width={56}
              handleDiameter={20}
              aria-label="dark-mode-toggle"
              role="dark mode toggle button"
            />
          ) : (
            <div style={{ height: "28px" }} />
          )}
        </div>
      </div>
    )
  }
}

export default NavBar
