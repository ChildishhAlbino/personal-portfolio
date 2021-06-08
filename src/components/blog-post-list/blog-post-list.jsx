import React from "react"
import { StaticQuery, graphql } from "gatsby"
import BlogPostCard from "../blog-post-card/blog-post-card"

import "./blog-post-list.scss"

const BlogPostList = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulPost(sort: { fields: latestEdit, order: DESC }) {
            edges {
              node {
                id
                slug
                publicationDate
                latestEdit
                title
                description
                postThumbnail: thumbnail {
                  fluid(maxHeight: 200, toFormat: WEBP, quality: 100) {
                    ...GatsbyContentfulFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const posts = data.allContentfulPost.edges
        return (
          <>
            {posts.map(({ node }) => {
              return <BlogPostCard key={node.id} post={node}></BlogPostCard>
            })}
          </>
        )
      }}
    />
  )
}

export { BlogPostList }

export default { BlogPostList }
