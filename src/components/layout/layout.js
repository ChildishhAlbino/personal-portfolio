import React from "react"
import { Link } from "gatsby"

import "./layout.scss"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={`/`}>{title}</Link>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link to={`/`}>{title}</Link>
        </h3>
      )
    }
    return (
      <div className="layout-wrapper">
        <div className="layout-container">
          <header className="header">
            <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
            {header}
          </header>
          <main>{children}</main>
          <footer>
            {new Date().getFullYear()}, Built with
            {` `}
            <b>
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </b>
          </footer>
        </div>
      </div>
    )
  }
}

export default Layout
