import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"
import Bio from "../components/bio/bio"
import WorkCard from "../components/work-card/work-card"

class WorkPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const jobs = data.allContentfulJob.edges
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Work" />
        <div className="page-header">
          <div className="page-header-container">
            <h1>Work History</h1>
          </div>
          <hr />
        </div>
        <div className="job-wrapper">
          {jobs.map(({ node }, index) => {
            return <WorkCard key={node.id} data={node} />
          })}
        </div>
        <hr className="not-print" />
        <footer>
          <Bio />
        </footer>
      </Layout>
    )
  }
}

export default WorkPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulJob {
      edges {
        node {
          id
          workplace
          role
          startDate
          endDate
          thumbnailDarkMode {
            fluid(maxHeight: 150, toFormat: WEBP) {
              ...GatsbyContentfulFluid
            }
          }
          thumbnailLightMode {
            fluid(maxHeight: 150, toFormat: WEBP) {
              ...GatsbyContentfulFluid
            }
          }
          body {
            raw
          }
        }
      }
    }
  }
`
