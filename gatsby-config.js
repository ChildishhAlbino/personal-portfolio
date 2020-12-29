require("dotenv").config()

// HANDLE NETLIFY ENV
let token = process.env.CONTENTFUL_ACCESS_TOKEN
const context = process.env.CONTEXT
if (context && (context == "branch-deploy" || context == "deploy-preview")) {
  let branchName = process.env.HEAD
  console.log(branchName)
  switch (branchName) {
    case "develop":
      token = process.env.CONTENTFUL_DRAFT_ACCESS_TOKEN
  }
}

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
      options: {
        spaceId: `jl3v3y1i6iha`,
        accessToken: token,
      },
    },
    {
      resolve: "gatsby-plugin-buildtime-timezone",
      options: {
        tz: "Australia/Sydney",
        format: "LLLL",
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
