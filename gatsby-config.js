require("dotenv").config()

// HANDLE NETLIFY ENV VARS FOR DRAFT CONTENT
let options = {
  spaceId: `jl3v3y1i6iha`,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}
const context = process.env.CONTEXT
if (context && (context == "branch-deploy" || context == "deploy-preview")) {
  let branchName = process.env.HEAD
  switch (branchName) {
    case "develop":
      options.accessToken = process.env.CONTENTFUL_DRAFT_ACCESS_TOKEN
      options.host = `preview.contentful.com`
  }
}
//

module.exports = {
  siteMetadata: {
    title: `ChildishhAlbino`,
    author: `Connor Williams`,
    description: `This is a blog for my ideas and a portfolio for the ones I make!`,
    siteUrl: `https://www.childishhalbino.com`,
    social: {
      twitter: `childishhalbino`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: options,
    },
    {
      resolve: "gatsby-plugin-buildtime-timezone",
      options: {
        tz: "Australia/Sydney",
      },
    },
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-sass`,
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
  ],
}
