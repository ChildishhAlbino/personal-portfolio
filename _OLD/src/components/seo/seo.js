import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, imageUrl, path, keywords }) {
  const { site, seoIcon } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        seoIcon: contentfulAsset(title: { eq: "SEO_ICON" }) {
          contentful_id
          fluid(maxWidth: 1000, toFormat: WEBP) {
            src
          }
        }
      }
    `
  )
  let pageUrl = site.siteMetadata.siteUrl + path
  let seoIconURL = imageUrl
    ? imageUrl
    : seoIcon
    ? `http:${seoIcon.fluid.src}`
    : null
  const metaDescription = description || site.siteMetadata.description
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: pageUrl,
        },
        {
          property: `og:image`,
          content: seoIconURL,
        },
        {
          property: `twitter:card`,
          content: `summary`,
        },
        {
          property: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          property: `twitter:title`,
          content: title,
        },
        {
          property: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `twitter:image`,
          content: seoIconURL,
        },
        {
          property: `author`,
          content: site.siteMetadata.author,
        },
        {
          name: `keywords`,
          property: `keywords`,
          content: keywords?.join(", "),
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  imgUrl: null,
  path: "",
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  path: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
}

export default SEO
