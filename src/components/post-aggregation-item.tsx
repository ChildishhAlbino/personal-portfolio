import { PostAggregation, SlugAggregation } from '@/types/post'
import PostThumbnail from '@/components/post-thumbnail'
import Link from 'next/link'

import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/utils/api'
import { DateTime } from 'luxon'

function formatPublicationDate(post: PostAggregation){
    const { publicationDate } = post
    const newPublicationDate = DateTime.fromISO(publicationDate)
        .setLocale('au')
        .toLocaleString(DateTime.DATE_FULL)

    return {
        ...post,
        publicationDate: newPublicationDate,
    }
}

export function DynamicPostAggregationItem({ slug }: { slug: SlugAggregation }) {

    const postQuery = api.contentful.getPostAggregationBySlug.useQuery({slug: slug.slug})

    const { data, isLoading, error } = postQuery

    if (isLoading) {
        return <LoadingPostAggregationItem/>
    }

    if(!data || error){
        throw error || Error("Whoops!")
    }

    const [rawPost] = data.posts
    if(!rawPost){
        throw Error("Somehow no posts were returned...")
    }
    const item = formatPublicationDate(rawPost)
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

export function LoadingPostAggregationItem() {
    return (
        <>
            <div
                className='grid w-full border-b-2 border-light border-opacity-30 pb-4 mobile:grid-cols-1 mobile:gap-y-4 desktop:grid-cols-[2fr,_5fr] desktop:gap-x-4'>
                <Skeleton className={'h-72 w-full aspect-video max-h-72'} />
                <br/>
                <span className={"flex w-full flex-col gap-y-2 mobile:items-center desktop:items-start"}>
                   <Skeleton className={'mb-2 h-8 w-64'} />
                    <Skeleton className={'w-52 h-4'} />
                    <Skeleton className={'w-40 h-4'} />
                </span>
            </div>
        </>
    )
}
