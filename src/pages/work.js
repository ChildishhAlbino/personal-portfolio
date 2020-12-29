import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"
import Image from "gatsby-image"
import Bio from "../components/bio/bio"
import { FiPrinter } from "react-icons/fi"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { formatDateToLocalTime } from "../utils/date-utils"

import "./work.scss"

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
          {jobs.map(
            (
              {
                node: {
                  id,
                  startDate,
                  endDate,
                  role,
                  workplace,
                  thumbnailDarkMode,
                  thumbnailLightMode,
                  body: { raw },
                },
              },
              index
            ) => {
              const rawEndDate = endDate
              let endDateLabel = "Present"
              if (rawEndDate && rawEndDate !== startDate) {
                endDateLabel = formatDateToLocalTime(rawEndDate)
              }
              let parsed = JSON.parse(raw)
              return (
                <div key={id} className="job-container">
                  {/* Only puts the hr if we have more than 1 item */}
                  {index > 0 && <hr></hr>}
                  <div className="position-wrapper">
                    <div className="position-container">
                      <h2>{workplace}</h2>
                      <p>{role}</p>
                      <small>
                        <i>
                          {formatDateToLocalTime(startDate)} - {endDateLabel}
                        </i>
                      </small>
                    </div>
                    <Image
                      className="job-image light-mode-exclusive"
                      fluid={thumbnailLightMode.fluid}
                    />
                    <Image
                      className="job-image dark-mode-exclusive"
                      fluid={thumbnailDarkMode.fluid}
                    />
                  </div>
                  <div>{documentToReactComponents(parsed)}</div>
                </div>
              )
            }
          )}
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
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid
            }
          }
          thumbnailLightMode {
            fluid(maxWidth: 500) {
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
