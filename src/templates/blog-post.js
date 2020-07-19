import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import Bio from "../components/bio/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"

import './style/blog-post.scss'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const latestEdit = post.frontmatter.latestEdit
    let postDate = (
      <p>{post.frontmatter.date}</p>
    )
    if (latestEdit && latestEdit !== "") {
      postDate = (
        <div className="blog-post-date-wrapper">
          <p>{latestEdit}</p>
          <small><i>Originally posted: {post.frontmatter.date}</i></small>
        </div>
      )
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article className="blog-post-container">
          <header className="blog-post-header-wrapper">
            <div>
              <h1>{post.frontmatter.title}</h1>
              {postDate}
            </div>
            <Image className="blog-post-thumbnail"
              fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
              style={{
                maxWidth:
                  post.frontmatter.thumbnail.childImageSharp.fluid
                    .presentationWidth,
              }}
            />
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
        <nav>
          <ul className="blog-post-nav-wrapper">
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <hr />
        <footer>
          <Bio />
        </footer>
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        latestEdit
        description
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 250) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
      }
    }
  }
`
