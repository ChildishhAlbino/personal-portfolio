import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Switch from "react-switch"
import Navbar from "../navbar/navbar"
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
            <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
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
                  />
                )
                  : (
                    <div style={{ height: "24px" }} />
                  )}
            </div>
          </header>
          <main>{children}</main>
          <footer>
            <StaticQuery
              query={graphql`
                query {
                  site {
                    buildTimeZone
                  }
                }
              `}
              render={data => (
                <div>
                  <small>
                    Last built: <i>{data.site.buildTimeZone}</i> with{" "}
                    <b>
                      <a href="https://www.gatsbyjs.org">Gatsby</a>
                    </b>
                  </small>
                </div>
              )}
            />
          </footer>
        </div>
      </div>
    )
  }
}

export default Layout
