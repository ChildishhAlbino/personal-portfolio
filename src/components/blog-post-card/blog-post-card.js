import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { formatDateToLocalTime } from "../../utils/date-utils"

import "./blog-post-card.scss"

const BlogPostCard = ({ post }) => {
  const {
    title,
    description,
    slug,
    publicationDate,
    latestEdit,
    postThumbnail,
  } = post
  const pageTitle = title || slug
  return (
    <div className="blog-post-card-wrapper">
      <div>
        <div>
          <h3>
            <Link className="blog-post-title" to={slug}>
              {pageTitle}
            </Link>
          </h3>
          <p>{description}</p>
        </div>
        <div>
          <p>{blogPostDate({ latestEdit, publicationDate })}</p>
        </div>
      </div>
      <div className="blog-post-card-thumbnail">
        <Image
          className="post-thumbnail"
          fluid={postThumbnail?.fluid}
          imgStyle={{ objectFit: "contain", objectPosition: "right center" }}
          objectPosition="right center"
        />
      </div>
    </div>
  )
}

export default BlogPostCard

const blogPostDate = ({ latestEdit, publicationDate }) => {
  if (latestEdit !== publicationDate) {
    return (
      <small>
        {formatDateToLocalTime(latestEdit)}
        <br />
        <small>
          (Originally posted: {formatDateToLocalTime(publicationDate)})
        </small>
      </small>
    )
  } else {
    return <small>{formatDateToLocalTime(publicationDate)}</small>
  }
}
