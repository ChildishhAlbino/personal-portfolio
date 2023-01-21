import { api } from '../../utils/api'
import { GetStaticPathsResult, GetStaticPropsContext } from 'next'
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import superjson from 'superjson'
import { appRouter } from '../../server/api/root'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import { FC } from 'react'

// const reactQueryOptions: UseTRPCQueryOptions<
//   'contentful.getPostBySlug',
//   { slug: string },
//   any,
//   any,
//   DefaultErrorShape
// > = {
//   refetchOnWindowFocus: false,
//   refetchOnReconnect: false,
//   refetchInterval: false,
//   refetchOnMount: false,
// }

export default function Post({ slug }: PostPageProps) {
  const { data, error, isLoading, isStale } =
    api.contentful.getPostBySlug.useQuery({ slug })
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
          'grid w-full grid-cols-1 mobile:justify-items-center laptop:justify-items-start'
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
  const { url } = thumbnail || { url: '' }
  const blurSrc = `${url}?w=200&q=1`
  const image = thumbnail ? (
    <div className={'laptop:prose-xl'}>
      <Image
        src={url}
        {...thumbnail}
        blurDataURL={blurSrc}
        placeholder='blur'
        priority={true}
        layout='responsive'
        alt={'Thumbnail for this post'}
      />
    </div>
  ) : (
    <></>
  )
  return (
    <>
      <span
        className={
          'prose relative w-full mobile:prose-sm mobile:text-center laptop:prose-xl laptop:text-left'
        }
      >
        <div
          className={
            'absolute top-0 z-[999] h-full w-full bg-black bg-opacity-25 py-0 px-3 pb-3'
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
      <hr className={'w-full border-black'} />
    </>
  )
}

const PostBody: FC<{ serializedMdx: any }> = ({ serializedMdx }: any) => {
  const components = {
    img: (props: { src: string; alt: string }) => {
      const src = props.src
      const blurSrc = `${src}?h=300&q=1`
      console.log({ props })
      const loader = ({ src, width, quality }: any) => {
        return `${src}?h=${720}&q=${100}`
      }
      return (
        <div className={'relative h-[300px] drop-shadow-md laptop:max-w-prose'}>
          <Image
            src={props.src}
            loader={loader}
            blurDataURL={blurSrc}
            layout='fill'
            loading={'lazy'}
            objectFit='contain'
            objectPosition={'left center'}
            alt={props.alt}
            placeholder='blur'
          />
        </div>
      )
    },
  }
  const mdx = serializedMdx ? (
    <div
      className={
        'min-w-prose prose w-[100%] laptop:max-w-[50ch] laptop:prose-lg desktop:max-w-[75ch]'
      }
    >
      <MDXRemote {...serializedMdx} components={components} />
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
}: GetStaticPropsContext<PostPageProps>) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  })

  const slug = params?.slug as string
  await ssg.contentful.getPostBySlug.prefetch({ slug })
  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 1,
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
