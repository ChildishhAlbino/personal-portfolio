import { PostAggregation } from '@/types/post'
import PostThumbnail from '@/components/post-thumbnail'
import Link from 'next/link'

export function PostAggregationItem({ item }: { item: PostAggregation }) {
    const topKeywords = item.keywords.slice(0, 5)
    const totalKeywords = topKeywords.length
    const thumbnailProps = {
        ...item.thumbnail,
        fixedMaxHeight: 800,
    }
    return (
        <>
            <div
                className='grid w-full border-b-2 border-light border-opacity-30 pb-4 mobile:grid-cols-1 mobile:gap-y-8 mobile:text-center desktop:grid-cols-[2fr,_5fr] desktop:gap-x-4 desktop:text-left'>
                <PostThumbnail {...thumbnailProps} />
                <span>
                    <Link
                        href={`/posts/${item?.slug}`}
                        className='text-res-title-sm text-text underline'
                    >
                        <h1>{item?.title}</h1>
                    </Link>
                    <div className='flex flex-col gap-1'>
                        <i className='break-words'>{item?.description}</i>
                        <br />
                        <pre className='text-sm'>
                            {item?.publicationDate} <small>UTC+11</small>
                        </pre>
                        <span
                            className='flex flex-wrap gap-4 text-sm mobile:justify-center mobile:self-center desktop:self-start'>
                            {topKeywords.map((keyword, index) => {
                                const suffix =
                                    index < totalKeywords - 1 ? ',' : ''
                                return (
                                    <i
                                        className='cursor-pointer text-text-darker underline'
                                        key={`${keyword}_${index}`}
                                    >
                                        #{keyword}
                                        {suffix}
                                    </i>
                                )
                            })}
                        </span>
                    </div>
                </span>
            </div>
        </>
    )
}