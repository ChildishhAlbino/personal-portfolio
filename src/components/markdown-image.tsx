import Image from 'next/image'

export function MarkdownImage({
    imageDetails,
    fixedMaxHeight,
    src,
    alt,
    className,
}: MarkdownImageProps) {
    const blurSrc = imageDetails.base64

    const { width, height, src: detailsSrc } = imageDetails.img
    const aspectRatio = width / height
    const actualWidth = fixedMaxHeight * aspectRatio

    const loader = () => {
        return detailsSrc
    }

    const style = {
        maxHeight: `${fixedMaxHeight}px`,
    } as any
    return (
        <Image
            width={actualWidth}
            height={fixedMaxHeight}
            style={style}
            className={`${className} drop-shadow-sm`}
            src={src}
            loader={loader}
            blurDataURL={blurSrc}
            alt={alt}
            placeholder='blur'
            quality='100'
        />
    )
}
interface MarkdownImageProps {
    imageDetails: any
    src: string
    alt: string
    fixedMaxHeight: number
    className: string
}
MarkdownImage.defaultProps = {
    fixedMaxHeight: 300,
    className: '',
}
