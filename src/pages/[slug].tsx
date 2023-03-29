import { api } from '../utils/api'
import { GetStaticPathsResult, GetStaticPropsContext } from 'next'
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import superjson from 'superjson'
import { appRouter } from '../server/api/root'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import { FC } from 'react'
import ContentLayout from '@/components/content-layout'
import { Loader } from '@/components/loader/loader'
import { getPages } from '@/server/service/contentful/getPages'

export default function MdxPage({ slug }: MdxPageProps) {
    const { data, error, isLoading } = api.contentful.getPageBySlug.useQuery({
        slug,
    })

    if (isLoading || !data) {
        return (
            <>
                <Loader size={150} />
            </>
        )
    }

    const {
        page: { serializedMdx, title },
    } = data

    return (
        <>
            <ContentLayout>
                <section
                    className={
                        'grid h-full w-full auto-rows-min grid-cols-1 gap-y-4 mobile:justify-items-center'
                    }
                >
                    <PageBody
                        serializedMdx={serializedMdx}
                        imageDetails={data.imageDetails}
                    />
                </section>
            </ContentLayout>
        </>
    )
}

const PageBody: FC<{ serializedMdx: any; imageDetails: object }> = ({
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
    }
    const mdx = serializedMdx ? (
        <span className={'w-[100%]'}>
            <MDXRemote {...serializedMdx} components={components} />
        </span>
    ) : (
        <>
            <p>Loading...</p>
        </>
    )
    return <>{mdx}</>
}

export async function getStaticProps({
    params,
}: GetStaticPropsContext<MdxPageProps>) {
    const ssg = await createProxySSGHelpers({
        router: appRouter,
        ctx: {},
        transformer: superjson, // optional - adds superjson serialization
    })

    const slug = params?.slug as string
    try {
        await ssg.contentful.getPageBySlug.fetch({ slug })
    } catch (e: any) {
        const cause = e.cause
        if (cause.message.includes('No page for slug')) {
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

export async function getStaticPaths(): Promise<
    GetStaticPathsResult<MdxPageProps>
> {
    const data = await getPages({ input: {} })
    const paths = data.pages.map((page) => {
        return { params: { slug: page.slug } }
    })

    return {
        paths,
        fallback: 'blocking',
    }
}

type MdxPageProps = {
    slug: string
}
