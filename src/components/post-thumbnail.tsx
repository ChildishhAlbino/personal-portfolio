import Image from 'next/image'

export default function PostThumbnail({
    url,
    width,
    height,
    details,
    style,
    className,
    fixedHeight,
}: ThumbnailProps) {
    const aspectRatio = width / height
    const actualWidth = fixedHeight * aspectRatio

    return (
        <Image
            src={url}
            width={actualWidth}
            height={fixedHeight}
            style={{
                margin: '0 auto',
                // fixes the spacing inconsistencies
                ...(style || {}),
            }}
            className={className}
            blurDataURL={details.base64}
            placeholder='blur'
            priority={true}
            alt={'Thumbnail for this post'}
        />
    )
}

PostThumbnail.defaultProps = {
    className: null,
    style: null,
    fixedHeight: 300,
}

interface ThumbnailProps {
    url: string
    width: number
    height: number
    details?: any
    style?: object
    className?: string
    fixedHeight: number
}
