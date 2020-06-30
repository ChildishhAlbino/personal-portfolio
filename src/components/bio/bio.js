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
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  )
}

export default Bio
