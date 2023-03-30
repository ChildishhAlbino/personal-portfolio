import Image from 'next/image'

type FlexibleImageProps = {
  src: string
  alt: string
  className?: string
  height?: number
  aspectRatio: 'SQUARE' | 'RECTANGLE'
}

const aspectRatioFunctions = {
  SQUARE: (height: number) => height,
  RECTANGLE: (height: number) => (height / 9) * 16,
}

export function FlexibleImage({
  src,
  alt,
  className,
  height,
  aspectRatio,
}: FlexibleImageProps) {
  const blurSrc = `${src}?h=900&q=1`
  const loader = ({ src, width, quality }: any) => {
    return `${src}?h=${height || 900}&q=${quality}`
  }
  const width = height
    ? aspectRatioFunctions[aspectRatio || 'RECTANGLE'](height)
    : null
  return (
    <Image
      className={className || ''}
      width={width || 1600}
      height={height || 900}
      style={{
        margin: 0,
      }}
      src={src}
      loader={loader}
      blurDataURL={blurSrc}
      loading={'lazy'}
      alt={alt}
      placeholder='blur'
      quality='100'
    />
  )
}
