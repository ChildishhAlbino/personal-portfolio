import React from "react"
import { Link } from "gatsby"
import Switch from "react-switch"
import Navbar from "../navbar/navbar"
import PageFooter from "../page-footer/page-footer"
import "./layout.scss"

class Layout extends React.Component {
  state = {
    theme: null,
  }

  componentDidMount() {
    this.setState({ theme: window.__theme })
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme })
    }
  }

  render() {
    const { title, children } = this.props
    return (
      <div className="layout-wrapper">
        <div className="layout-container">
          <header className="header">
            <h1>
              <Link to={`/`}>{title}</Link>
            </h1>
            <Navbar></Navbar>
            <div className="toggle-container">
              {
                // conditional block that eliminates the flickering bug
                this.state.theme !== null ? (
                  <Switch
                    checked={this.state.theme === "dark"}
                    onChange={checked =>
                      window.__setPreferredTheme(checked ? "dark" : "light")
                    }
                    checkedIcon={
                      <span aria-label="moon" role="img" className="toggle-icon">
                        🌑
                      </span>
                    }
                    uncheckedIcon={
                      <span aria-label="sun" role="img" className="toggle-icon">
                        🌞
                    </span>
                    }
                    offColor="#ff145a"
                    onColor="#a0a5ff"
                    height={28}
                    width={56}
                    handleDiameter={20}
                    aria-label="dark-mode-toggle"
                    role="dark mode toggle button"
                  />
                )
                  : (
                    <div style={{ height: "28px" }} />
                  )}
            </div>
          </header>
          <main>{children}</main>
          <PageFooter></PageFooter>
        </div>
      </div>
    )
  }
}

export default Layout
