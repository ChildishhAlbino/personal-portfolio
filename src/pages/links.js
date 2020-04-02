import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"

class LinksPage extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="All posts" />
                <Bio />
                <hr />
            </Layout>
        )
    }
}

export default LinksPage

export const pageQuery = graphql`
query {
    site {
        siteMetadata {
            title
        }
    }
}
`