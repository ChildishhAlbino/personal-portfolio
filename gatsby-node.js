const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/components/blog-post/blog-post.js`)
  const result = await graphql(
    `
      {
        allContentfulPost(sort: { fields: latestEdit, order: DESC }) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allContentfulPost.edges
  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    let slug = node.slug
    createPage({
      path: slug,
      component: blogPost,
      context: {
        slug: slug,
        previous,
        next,
      },
    })
  })
}
