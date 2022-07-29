import React from "react"
import Image from "gatsby-image"

const ImageWrapper = ({ image: { fluid }, className }) => {
  if (fluid) {
    let maxWidth = fluid.sizes.split(", ")[1]
    return (
      <Image
        fluid={fluid}
        imgStyle={{
          sizes: fluid.sizes,
        }}
        style={{ maxWidth: maxWidth }}
        className={className}
      />
    )
  } else {
    return null
  }
}

export default ImageWrapper

ImageWrapper.defaultProps = {
  image: {},
}
