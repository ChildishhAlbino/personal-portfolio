/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import "./bio.scss"

const Bio = () => {
  const data = useStaticQuery(graphql`
  query {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blurb/"}}) {
        edges {
          node {
            frontmatter{
              title
                thumbnail {
                  childImageSharp {
                    fluid(maxWidth: 1000, maxHeight: 1000) {
                      ...GatsbyImageSharpFluid
                      presentationWidth
                    }
                  }
                }
            }
            html
          }
    }
  }
}
  `)

  const { frontmatter, html } = data.allMarkdownRemark.edges[0].node
  return (
    <div className="bio-container">
      <Image
        className="bio-gatsby-image"
        fluid={frontmatter.thumbnail.childImageSharp.fluid}
        alt="Me"
      />
      <div className="not-print"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
      <div className="print-only">
        <div>
          <h1>Connor Williams:</h1>
          <hr></hr>
          <p>Junior Software Engineer located in Sydney.</p>
          <p>Young, eager, and motivated to learn.</p>
        </div>
        <div>
          <p>
            <span role="img" aria-label="resume-emoji">👦 21 years old</span>
          </p>
          <p><span role="img" aria-label="resume-emoji">👷‍♀️ Diligent worker</span></p>
          <p><span role="img" aria-label="resume-emoji">⚡ Quick learner</span></p>
          <p><span role="img" aria-label="resume-emoji">🦅 Eye for detail</span></p>
        </div>
        <div>
          <h2>Contact:</h2>
          <hr></hr>
          <i>Email:</i>
          <p>connorandrewwilliams.work@gmail.com</p>
          <i>Mobile:</i>
          <p>+61468323181</p>
          <i>Twitter:</i>
          <p>@childishhalbino</p>
        </div>
      </div>
    </div >
  )
}

export default Bio
