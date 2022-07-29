const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/components/blog-post/blog-post.js`)
  const mdxPage = path.resolve(`./src/components/mdx-page/mdx-page.js`)

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

  const pages = await graphql(
    `
    {
      allContentfulPage {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `)
  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allContentfulPost.edges
  createPageFromContentfulPosts(posts, createPage, blogPost)

  createPageFromContentfulPages(pages.data.allContentfulPage.edges, createPage, mdxPage)
}

function createPageFromContentfulPosts(posts, createPage, blogPostTemplate) {
  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    let slug = node.slug
    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {
        slug: slug,
        previous,
        next,
      },
    })
  })
}


function createPageFromContentfulPages(pages, createPage, template) {
  pages.forEach(({ node }, index) => {
    const { slug, title } = node
    const actualSlug = slug === "index" ? "" : `${slug}/`
    createPage({
      path: `/${actualSlug}`,
      component: template,
      context: {
        title
      },
    })
  })
}