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
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1000, maxHeight: 1000) {
            ...GatsbyImageSharpFluid
            presentationWidth
          }
        }
      }
      site {
        siteMetadata {
          author
          description
          social {
            twitter
          }
        }
      }
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blurb/"}} limit: 1) {
        edges {
          node {
            html
            fileAbsolutePath
            fields {
              slug
            }
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
          }
    }
      }
    }
  `)
  const { frontmatter, html } = data.allMarkdownRemark.edges[0].node
  console.log(frontmatter)
  console.log(html)
  const { author, description, social } = data.site.siteMetadata
  return (
    <div className="bio-container">
      <Image
        className="bio-gatsby-image"
        fluid={frontmatter.thumbnail.childImageSharp.fluid}
        alt={author}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  )
}

export default Bio
