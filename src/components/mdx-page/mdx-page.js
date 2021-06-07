import React from "react"
import { graphql } from "gatsby"
import Bio from "../bio/bio"
import Layout from "../layout/layout"
import SEO from "../seo/seo"

import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import "./mdx-page.scss"

class MdxPageTemplate extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const { contentfulPage } = data
    console.log(contentfulPage)
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About Me" />
        <div className="markdown-content">
          <MDXProvider>
            <MDXRenderer>{contentfulPage.mdx.childMdx.body}</MDXRenderer>
          </MDXProvider>
        </div>
        <hr />
        <Bio />
      </Layout>
    )
  }
}

export default MdxPageTemplate

export const pageQuery = graphql`
  query PageByTitle($title: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPage(title: { eq: $title}) {
      contentful_id
      mdx {
        childMdx {
          body
        }
      }
    }
  }
`
