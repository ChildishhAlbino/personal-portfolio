import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"
import Image from "gatsby-image"

import "../style/sass/index-page.scss"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} className="article-item-wrapper">
              <section>
                <header>
                  <h3>
                    <Link className="blog-post-title" to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  {this.blogPostDate(node.frontmatter)}
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </section>
              </section>
              <section>
                <Image
                  className="gatsby-image"
                  fluid={node.frontmatter.thumbnail.childImageSharp.fluid}
                  style={{
                    width:
                      node.frontmatter.thumbnail.childImageSharp.fluid
                        .presentationWidth,
                    margin: "0 auto",
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }

  blogPostDate({ latestEdit, date }) {
    if (latestEdit) {
      return (
        <small>
          {latestEdit} <small>(Originally posted: {date})</small>
        </small>
      )
    } else {
      return <small>{date}</small>
    }
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            latestEdit(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 100) {
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
`
