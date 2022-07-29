import React from "react"
import { graphql } from "gatsby"
import { Bio } from "../components/bio/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"
import { BlogPostList } from "../components/blog-post-list/blog-post-list"


class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <hr />
        <BlogPostList></BlogPostList>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
