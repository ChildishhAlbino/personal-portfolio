import { trpc } from '../../utils/trpc'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'
import superjson from 'superjson'
import { appRouter } from '../../server/trpc/router'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import { DehydratedState } from 'react-query'
import { UseTRPCQueryOptions } from '@trpc/react/dist/createReactQueryHooks'
import { DefaultErrorShape } from '@trpc/server/dist'
import { FC } from 'react'

const reactQueryOptions: UseTRPCQueryOptions<
  'contentful.getPostBySlug',
  { slug: string },
  any,
  any,
  DefaultErrorShape
> = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: false,
  refetchOnMount: false,
  keepPreviousData: true,
  cacheTime: 200000,
}

export default function Post({ slug }: PostPageProps) {
  const { data, error, isLoading, isStale } =
    trpc.proxy.contentful.getPostBySlug.useQuery({ slug }, reactQueryOptions)
  if (!data) {
    return (
      <>
        <p>Loading..</p>
      </>
    )
  }
  const {
    serializedMdx,
    title,
    description,
    publicationDate,
    latestEdit,
    thumbnail,
    keywords,
  } = data
  return (
    <>
      <div
        className={
          'w-full grid grid-cols-1 laptop:justify-items-start mobile:justify-items-center'
        }
      >
        <PostHeader
          title={title}
          publicationDate={publicationDate}
          description={description}
          thumbnail={thumbnail}
          latestEdit={latestEdit}
        />
        <PostBody serializedMdx={serializedMdx} />
      </div>
    </>
  )
}

interface ThumbnailProps {
  url: string
  width: number
  height: number
}

const PostHeader: FC<{
  title: String
  description?: string
  publicationDate: string
  latestEdit?: string
  thumbnail?: ThumbnailProps
}> = ({ title, description, thumbnail }) => {
  const image = thumbnail ? (
    <div className={'laptop:prose-xl'}>
      <Image
        src={thumbnail.url}
        {...thumbnail}
        priority={true}
        layout='responsive'
      />
    </div>
  ) : (
    <></>
  )
  return (
    <>
      <span
        className={
          'prose w-full relative mobile:prose-sm laptop:prose-xl mobile:text-center laptop:text-left'
        }
      >
        <div
          className={
            'absolute z-[999] top-0 py-0 w-full h-full bg-black bg-opacity-25 px-3 pb-3'
          }
        >
          <div className={'absolute bottom-[1rem] w-full'}>
            <h1 className={'text-white drop-shadow-lg'}>{title}</h1>
            <h3 className={'text-white drop-shadow-lg'}>{description}</h3>
          </div>
        </div>
        {image}
      </span>
      <br />
      <hr className={'border-black w-full'} />
    </>
  )
}

const PostBody: FC<{ serializedMdx: any }> = ({ serializedMdx }: any) => {
  const components = {
    img: (props: { src: string; alt: string }) => {
      const src = props.src
      const blurSrc = `${src}?w=20&q=1`
      return (
        <div className={'laptop:max-w-prose drop-shadow-md'}>
          <Image
            {...props}
            blurDataURL={blurSrc}
            layout='responsive'
            loading={'lazy'}
          />
        </div>
      )
    },
  }
  const mdx = serializedMdx ? (
    <div
      className={
        'prose laptop:prose-lg min-w-prose w-[100%] laptop:max-w-[50ch] desktop:max-w-[75ch]'
      }
    >
      <MDXRemote {...serializedMdx} components={components} lazy={true} />
    </div>
  ) : (
    <>
      <p>Loading...</p>
    </>
  )
  return <>{mdx}</>
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PostPageProps>): Promise<
  GetStaticPropsResult<PageStaticProps>
> {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  })

  const slug = params?.slug as string
  await ssg.fetchQuery('contentful.getPostBySlug', { slug })
  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 60 * 5,
  }
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<PostPageProps>
> {
  return {
    paths: [
      { params: { slug: 'the-evolution-of-my-website' } }, // See the "paths" section below
    ],
    fallback: 'blocking',
  }
}

type PostPageProps = {
  slug: string
}

interface PageStaticProps {
  trpcState: DehydratedState
  slug: string
}
