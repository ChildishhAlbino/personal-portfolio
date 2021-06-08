import React from "react"
import { graphql } from "gatsby"
import { Bio } from "../bio/bio"
import Layout from "../layout/layout"
import SEO from "../seo/seo"

import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import "./mdx-page.scss"
import Components from "../components"

class MdxPageTemplate extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const { contentfulPage } = data
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={contentfulPage.title} />
        <MDXProvider components={Components} >
          <MDXRenderer>{contentfulPage.mdx.childMdx.body}</MDXRenderer>
        </MDXProvider>
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
      title
      mdx {
        childMdx {
          body
        }
      }
    }
  }
`
