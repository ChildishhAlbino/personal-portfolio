import { api } from '@/utils/api'
import { GetStaticPathsResult, GetStaticPropsContext } from 'next'
import { createServerSideHelpers } from '@trpc/react-query/server'
import superjson from 'superjson'
import { appRouter } from '@/server/api/root'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import { FC } from 'react'
import PageLayout from '@/components/layouts/page-layout'
import Portal from '@/components/portal/portal'
import { NavItem } from '@/components/orbital-nav/orbital-nav'
import { getPosts } from '@/server/service/contentful'
import { Loader } from '@/components/loader/loader'
import { DateTime } from 'luxon'
import PostThumbnail from '@/components/post-thumbnail'
import AllComponents from '@/components'

export default function Post({ slug }: PostPageProps) {
    const { data, isLoading } = api.contentful.getPostBySlug.useQuery({ slug })

    if (isLoading || !data) {
        return (
            <>
                <Loader size={150} />
            </>
        )
    }

    const {
        post: {
            serializedMdx,
            title,
            description,
            publicationDate,
            latestEdit,
            thumbnail,
            keywords,
        },
    } = data

    return (
        <>
            <PageLayout>
                <section
                    className={
                        'grid h-full w-full grid-cols-1 gap-y-4 mobile:justify-items-center'
                    }
                >
                    <PostHeader
                        title={title}
                        publicationDate={publicationDate}
                        description={description}
                        thumbnail={thumbnail as ThumbnailProps}
                        latestEdit={latestEdit}
                    />
                    <PostBody
                        serializedMdx={serializedMdx}
                        imageDetails={data.imageDetails}
                    />
                </section>
                {/* <Portal selector='#left-extra-nav'>
                    <NavItem name='prev' path='/' />
                </Portal>
                <Portal selector='#right-extra-nav'>
                    <NavItem name='next' path='/' />
                </Portal> */}
            </PageLayout>
        </>
    )
}

interface ThumbnailProps {
    url: string
    width: number
    height: number
    details: any
}

const PostHeader: FC<{
    title: string
    description?: string
    publicationDate: string
    latestEdit?: string
    thumbnail: ThumbnailProps
}> = ({ title, description, thumbnail, latestEdit, publicationDate }) => {
    const thumbnailProps = {
        ...thumbnail,
        fixedHeight: 600,
    }
    const image = thumbnail ? <PostThumbnail {...thumbnailProps} /> : <></>

    const datePrefix = latestEdit != publicationDate ? 'Edited:' : 'Posted:'
    const date = DateTime.fromISO(latestEdit || publicationDate).toLocaleString(
        DateTime.DATE_FULL
    )
    return (
        <>
            <header
                id='post-thumbnail'
                className={'relative w-full text-center'}
            >
                <div
                    className={'break-word grid mb-4 items-center text-center'}
                >
                    <h1 className='w-full text-res-title-l self-center font-bold text-white'>
                        {title}
                    </h1>
                    <br />
                    <i className={'text-white text-sm'}>{description}</i>
                    <br />
                    <small className='text-white'>
                        {datePrefix} {date}
                    </small>
                </div>
                <br />
                {image}
            </header>
            <hr className={'w-full border-text'} />
        </>
    )
}

const PostBody: FC<{ serializedMdx: any; imageDetails: object }> = ({
    serializedMdx,
    imageDetails,
}: any) => {
    const components = {
        img: (props: { src: string; alt: string }) => {
            const specificDetails = imageDetails[props.src]
            const blurSrc = specificDetails.base64

            const { width, height, src } = specificDetails.img

            const loader = () => {
                return src
            }

            return (
                <Image
                    className='drop-shadow-md'
                    width={width}
                    height={height}
                    style={{
                        margin: 0,
                    }}
                    src={props.src}
                    loader={loader}
                    blurDataURL={blurSrc}
                    alt={props.alt}
                    placeholder='blur'
                    quality='100'
                />
            )
        },
        ...AllComponents,
    }

    const mdx = serializedMdx ? (
        <section
            className={
                'min-w-prose prose py-4 laptop:max-w-[70ch] laptop:prose-lg desktop:max-w-[75ch]'
            }
        >
            <MDXRemote {...serializedMdx} components={components} />
        </section>
    ) : (
        <>
            <p>Loading...</p>
        </>
    )
    return <>{mdx}</>
}

export async function getStaticProps({
    params,
}: GetStaticPropsContext<PostPageProps>) {
    const ssg = await createServerSideHelpers({
        router: appRouter,
        ctx: {},
        transformer: superjson,
    })

    const slug = params?.slug as string
    try {
        await ssg.contentful.getPostBySlug.fetch({ slug })
    } catch (e: any) {
        const cause = e.cause
        if (cause.message.includes('No post for slug')) {
            return {
                notFound: true,
            }
        }

        throw e
    }
    return {
        props: {
            trpcState: ssg.dehydrate(),
            slug,
        },
        revalidate: 30,
    }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<PostPageProps>> {
    const data = await getPosts({ input: {} })
    const paths = data.posts.map((post) => {
        return { params: { slug: post.slug } }
    })

    return {
        paths,
        fallback: true,
    }
}

type PostPageProps = {
    slug: string
}
