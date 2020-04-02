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
                <div className="page-header">
                    <h1>WORK HISTORY</h1>
                    <hr />
                </div>
                {jobs.map(({ node }, index) => {
                    console.log(node.frontmatter)
                    return (
                        <div key={node.frontmatter.workplace} className="job-container">
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
                                    className="job-image light-mode-exclusive"
                                    fluid={node.frontmatter.thumbnail_lm.childImageSharp.fluid}
                                    style={{
                                        width:
                                            node.frontmatter.thumbnail_lm.childImageSharp.fluid
                                                .presentationWidth
                                    }}
                                />
                                <Image
                                    className="job-image dark-mode-exclusive"
                                    fluid={node.frontmatter.thumbnail_dm.childImageSharp.fluid}
                                    style={{
                                        width:
                                            node.frontmatter.thumbnail_dm.childImageSharp.fluid
                                                .presentationWidth
                                    }}
                                />
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: node.html,
                                }}
                            />
                        </div>
                    );
                })}
                <footer>
                    <hr />
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
                thumbnail_dm {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                            }
                        }
                    }
                thumbnail_lm {
                    childImageSharp {
                        fluid {
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