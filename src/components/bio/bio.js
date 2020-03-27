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
    }
  `)

  const { author, description, social } = data.site.siteMetadata
  return (
    <div className="bio-container">
      <Image
        className="bio-gatsby-image"
        fluid={data.avatar.childImageSharp.fluid}
        alt={author}
      />
      <p>
        Hi - I'm <strong>{author}</strong>! I'm a junior backend developer
        currently working for GROW. {description}{" "}
        <small>Currently a WIP.</small>
        <br />
        <a href={`https://twitter.com/${social.twitter}`}>
          Feel free to follow my Twitter!
        </a>
      </p>
    </div>
  )
}

export default Bio
