import React from "react"
import { Link } from "gatsby"
import { formatDateToLocalTime } from "../../utils/date-utils"
import ImageWrapper from "../image-wrapper/image-wrapper"

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
      <div className="blog-post-title">
        <div>
          <h3>
            <Link to={slug}>{pageTitle}</Link>
          </h3>
          <p>{description}</p>
        </div>
        <div>
          <p>{blogPostDate({ latestEdit, publicationDate })}</p>
        </div>
      </div>
      <ImageWrapper className="post-thumbnail" image={postThumbnail} />
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
