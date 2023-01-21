import { api } from '../../utils/api'
import { GetStaticPathsResult, GetStaticPropsContext } from 'next'
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import superjson from 'superjson'
import { appRouter } from '../../server/api/root'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import { FC } from 'react'
import Portal from '../../components/portal/portal'
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
      <Portal selector='#content-portal'>
        <>
          <h1>Blog page secondary content</h1>
        </>
      </Portal>
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
    <Image
      src={url}
      {...thumbnail}
      style={{
        // fixes the spacing inconsistencies
        margin: 0,
      }}
      blurDataURL={blurSrc}
      placeholder='blur'
      priority={true}
      alt={'Thumbnail for this post'}
    />
  ) : (
    <></>
  )
  return (
    <>
      <span
        className={
          'prose relative w-full mobile:prose-sm mobile:text-clip mobile:text-center laptop:prose-xl laptop:text-left'
        }
      >
        <div
          className={
            'absolute top-0 z-[999] h-full max-h-[900px] w-full bg-black bg-opacity-50 py-0 px-3 pb-1'
          }
        >
          <div
            className={
              'prose-l prose absolute bottom-[1rem] w-full text-left mobile:prose-sm mobile:text-[1ch] mobile-lg:text-base'
            }
          >
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
      const blurSrc = `${src}?h=900&q=1`
      const loader = ({ src, width, quality }: any) => {
        return `${src}?h=${900}&q=${quality}`
      }

      return (
        <Image
          className='drop-shadow-md laptop:max-w-prose'
          width={1600}
          height={900}
          style={{
            // fixes the spacing inconsistencies
            margin: 0,
          }}
          src={props.src}
          loader={loader}
          blurDataURL={blurSrc}
          loading={'lazy'}
          alt={props.alt}
          placeholder='blur'
          quality='100'
        />
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
