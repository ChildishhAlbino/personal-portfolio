require("dotenv").config()

const { NODE_ENV, CONTEXT, HEAD, PRODUCTION_URL, PREVIEW_SITE_URL } = process.env

let siteUrl = PRODUCTION_URL
// HANDLE NETLIFY ENV VARS FOR DRAFT CONTENT
let options = {
  spaceId: `jl3v3y1i6iha`,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}
if (CONTEXT && (CONTEXT == "branch-deploy" || CONTEXT == "deploy-preview")) {
  // git branch name
  switch (HEAD) {
    case "develop":
      options.accessToken = process.env.CONTENTFUL_DRAFT_ACCESS_TOKEN
      options.host = `preview.contentful.com`
      siteUrl = PREVIEW_SITE_URL
  }
}
//

module.exports = {
  siteMetadata: {
    title: `ChildishhAlbino`,
    author: `Connor Williams`,
    description: `This is a blog for my ideas and a portfolio for the ones I make!`,
    siteUrl: siteUrl,
    social: {
      twitter: `childishhalbino`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: options,
    },
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-buildtime-timezone",
      options: {
        tz: "Australia/Sydney",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          "gatsby-remark-unwrap-images",
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 700,
              linkImagesToOriginal: false,
              showCaptions: true,
              withWebp: true,
              backgroundColor: null
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
        ],
      },
    },
    `gatsby-plugin-force-trailing-slashes`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => (CONTEXT ? CONTEXT : NODE_ENV),
        env: {
          production: {
            policy: [{ userAgent: "*" }],
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `childishhalbino.com`,
        short_name: `ChilidishhAlbino`,
        start_url: `/`,
        background_color: `#303030`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/icon.jpg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: siteUrl,
      },
    },
    `gatsby-plugin-styled-components`
  ],
}
