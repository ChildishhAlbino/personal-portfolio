import { useRouter } from 'next/router'
import { OpenGraph } from 'next-seo/lib/types'
import { env } from '@/env.mjs'
import { NextSeo } from 'next-seo'

type PostSEOProps = {
    keywords: string[],
    title: string,
    description: string,
    thumbnail: ThumbnailProps,
    latestEdit: string,
    publicationDate: string,
}

type ThumbnailProps = {
    url: string,
    width: number,
    height: number
}

export function PostSEO({ thumbnail, description, title, keywords, publicationDate, latestEdit }: PostSEOProps) {
    const router = useRouter()
    const keywordsAsString = keywords.join(", ")
    const { url, width, height } = thumbnail
    const openGraph: OpenGraph = {
        title: title,
        description: description,
        url: `${env.NEXT_PUBLIC_BASE_URL}${router.asPath}`,
        type: 'article',
        article: {
            publishedTime: publicationDate,
            modifiedTime: latestEdit,
            tags: keywords
        },
        images: [
            {
                url: `${url}?h=630&w=1200`,
                alt: 'Thumbnail for this post.',
                width: 1200,
                height: 630
            }
        ]
    }
    return <NextSeo
        additionalMetaTags={[{ name: 'keywords', content: `${keywordsAsString}` }]}
        title={title}
        description={description}
        openGraph={openGraph}
    />
}