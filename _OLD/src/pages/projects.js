import React from "react"
import { graphql } from "gatsby"
import { Bio } from "../components/bio/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"

class ProjectsPage extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Projects" />
                <h1>Projects</h1>
                <small>Work in Progress...</small>
                <hr />
                <Bio />
            </Layout>
        )
    }
}

export default ProjectsPage

export const pageQuery = graphql`
query {
    site {
        siteMetadata {
            title
        }
    }
}
`