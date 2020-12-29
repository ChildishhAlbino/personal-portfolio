import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import Bio from "../bio/bio"
import Layout from "../layout/layout"
import SEO from "../seo/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { formatDateToLocalTime } from "../../utils/date-utils"
import { BLOCKS } from "@contentful/rich-text-types"

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa"

import "./blog-post.scss"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulPost
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    console.log(previous)
    const {
      title,
      description,
      publicationDate,
      latestEdit,
      postThumbnail,
      body: { raw, references },
      keywords,
    } = post
    let parsed = JSON.parse(raw)

    let postDate = <p>{formatDateToLocalTime(publicationDate)}</p>
    if (latestEdit !== publicationDate) {
      postDate = (
        <div className="blog-post-date-wrapper">
          <p>{formatDateToLocalTime(latestEdit)}</p>
          <small>
            <i>Originally posted: {formatDateToLocalTime(publicationDate)}</i>
          </small>
        </div>
      )
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={title} description={description || post.excerpt} />
        <article className="blog-post-container">
          <header className="blog-post-header-wrapper">
            <div>
              <h1>{title}</h1>
              <i>{description}</i>
              {postDate}
            </div>
            <div className="blog-post-thumbnail">
              <Image
                fluid={postThumbnail.fluid}
                imgStyle={{
                  objectFit: "contain",
                }}
                className="post-thumbnail"
              />
            </div>
          </header>
          <hr></hr>
          <section>
            {documentToReactComponents(parsed, {
              renderNode: {
                [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
                  let asset = references.find(asset => {
                    return asset.contentful_id === node.data.target.sys.id
                  })
                  return (
                    <Image
                      fluid={asset.fluid}
                      imgStyle={{
                        objectFit: "contain",
                      }}
                      className="embedded-image"
                    />
                  )
                },
              },
            })}
          </section>
        </article>
        <nav>
          <ul className="blog-post-nav-wrapper">
            <li>
              {previous && (
                <Link to={`/${previous.slug}`} rel="prev">
                  <p>
                    <FaArrowAltCircleLeft /> {previous.title}
                  </p>
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={`/${next.slug}`} rel="next">
                  <p>
                    {next.title} <FaArrowAltCircleRight />
                  </p>
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <hr />
        <Bio />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(slug: { eq: $slug }) {
      id
      publicationDate
      latestEdit
      title
      description
      body {
        raw
        references {
          fluid(maxHeight: 500) {
            ...GatsbyContentfulFluid
          }
          contentful_id
        }
      }
      keywords
      postThumbnail: thumbnail {
        fluid(maxWidth: 2048) {
          ...GatsbyContentfulFluid
        }
      }
      seoThumbnail: thumbnail {
        fluid(maxWidth: 500) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
