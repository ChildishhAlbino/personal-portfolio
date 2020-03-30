import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"
import Image from "gatsby-image"
import Bio from "../components/bio/bio"

import '../style/sass/work-page.scss'

class WorkPage extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const jobs = data.allMarkdownRemark.edges
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="Work" />
                <h1>WORK HISTORY</h1>
                <hr />
                {jobs.map(({ node }, index) => {
                    let refs = node.frontmatter.references
                    return (
                        <div className="job-container">
                            {/* Only puts the hr if we have more than 1 item */}
                            {index > 0 && (
                                <hr></hr>
                            )}
                            <div className="position-wrapper">
                                <div className="position-container">
                                    <h2>{node.frontmatter.workplace}</h2>
                                    <p>{node.frontmatter.position}</p>
                                    <small><i>{node.frontmatter.start_date} - {node.frontmatter.end_date}</i></small>
                                </div>
                                <Image
                                    className="job-image"
                                    fluid={node.frontmatter.thumbnail.childImageSharp.fluid}
                                    style={{
                                        width:
                                            node.frontmatter.thumbnail.childImageSharp.fluid
                                                .presentationWidth
                                    }}
                                />
                            </div>
                            <br></br>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: node.html,
                                }}
                            />
                        </div>
                    );
                })}
                <hr />
                <footer>
                    <Bio />
                </footer>
            </Layout>
        )
    }
}

export default WorkPage


export const pageQuery = graphql`
query {
    site {
        siteMetadata {
        title
        }
    }
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/work/"}}) {
    edges {
        node {
            html
            frontmatter {
                workplace
                position
                start_date
                end_date
                thumbnail {
                    childImageSharp {
                    fluid (maxWidth: 500 maxHeight: 200) {
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