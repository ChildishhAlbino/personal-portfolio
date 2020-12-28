import React from "react"
import Navbar from "../navbar/navbar"
import PageFooter from "../page-footer/page-footer"
import "./layout.scss"

class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    return (
      <div className="layout-wrapper">
        <div className="layout-container">
          <header className="header">

            <Navbar title={title}></Navbar>

          </header>
          <main className="content-container">{children}</main>
          <PageFooter></PageFooter>
        </div>
      </div>
    )
  }
}

export default Layout
