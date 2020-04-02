import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import Switch from "react-switch"
import Navbar from '../navbar/navbar'
import "./layout.scss"

class Layout extends React.Component {

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
            <ThemeToggler>
              {({ theme, toggleTheme }) => (
                <div className="toggle-container">
                  <Switch
                    checked={theme === "dark"}
                    onChange={checked => toggleTheme(checked ? "dark" : "light")}
                    checkedIcon={<span aria-label="moon" role="img" className="toggle-icon">🌑</span>}
                    uncheckedIcon={<span aria-label="sun" role="img" className="toggle-icon">🌞</span>}
                    offColor="#ff145a"
                    onColor="#a0a5ff"
                    height={28}
                    width={56}
                    handleDiameter={20}
                  />
                </div>
              )}
            </ThemeToggler>
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
                  <p>Last built: <i>{data.site.buildTimeZone}</i> with <b><a href="https://www.gatsbyjs.org">Gatsby</a></b></p>
                </div>
              )}
            />

          </footer>
        </div>
      </div >
    )
  }
}

export default Layout
