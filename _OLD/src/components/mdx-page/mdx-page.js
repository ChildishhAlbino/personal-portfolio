import React from "react"
import { graphql } from "gatsby"
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
    const { title, mdx, styling } = contentfulPage
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={title} />
        <MDXProvider components={Components} >
          {styling.styling !== "NULL" && (<style>
            {styling.styling}
          </style>)}
          <MDXRenderer>{mdx.childMdx.body}</MDXRenderer>
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
      styling {
        styling
      }
    }
  }
`
