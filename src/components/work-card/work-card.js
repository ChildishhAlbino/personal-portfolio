import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { formatDateToLocalTime } from "../../utils/date-utils"
import Image from "gatsby-image"

import "./work-card.scss"

const WorkCard = ({
  data: {
    startDate,
    endDate,
    role,
    workplace,
    thumbnailDarkMode,
    thumbnailLightMode,
    body: { raw },
  },
}) => {
  const rawEndDate = endDate
  let endDateLabel = "Present"
  if (rawEndDate && rawEndDate !== startDate) {
    endDateLabel = formatDateToLocalTime(rawEndDate)
  }
  let parsed = JSON.parse(raw)
  return (
    <div className="job-container">
      <div className="position-wrapper">
        <div className="position-container">
          <h2>{workplace}</h2>
          <p>{role}</p>
          <small>
            <i>
              {formatDateToLocalTime(startDate)} - {endDateLabel}
            </i>
          </small>
        </div>
        <div className="job-image">
          <Image
            className="light-mode-exclusive"
            fluid={thumbnailLightMode.fluid}
            imgStyle={{
              objectFit: "contain",
            }}
          />
          <Image
            className="dark-mode-exclusive"
            fluid={thumbnailDarkMode.fluid}
            imgStyle={{
              objectFit: "contain",
            }}
          />
        </div>
      </div>
      <div>{documentToReactComponents(parsed)}</div>
    </div>
  )
}

export default WorkCard
