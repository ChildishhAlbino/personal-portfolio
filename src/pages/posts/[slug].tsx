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
  const secondaryContent = (
    <Portal selector='#content-portal'>
      <>
        <h2>Blog page secondary content</h2>
        <p>
          This will contain related articles based on tags, the previous and
          next article by date, or other articles in the same category.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          ultricies sodales porttitor. In leo turpis, venenatis et libero sed,
          mattis rhoncus ligula. In imperdiet feugiat libero, in sollicitudin
          tortor elementum vel. Mauris rutrum sagittis sollicitudin. Curabitur
          turpis metus, tincidunt vel blandit quis, rutrum quis arcu. Ut mattis
          blandit sodales. Donec id porta sapien. Aliquam et lacus et lacus
          iaculis ornare malesuada non libero. Nulla condimentum, eros a
          imperdiet volutpat, velit dolor feugiat massa, malesuada aliquam
          turpis sem vel mi. Ut commodo gravida urna, ac commodo lorem viverra
          quis. Suspendisse rhoncus lectus non elit imperdiet pretium. Aliquam
          maximus imperdiet mauris, nec vestibulum libero bibendum id. Quisque
          molestie purus vel est ultrices iaculis. Nullam id luctus mi. Etiam
          consequat tincidunt sapien eu accumsan. Aliquam feugiat dapibus
          mollis. In in dignissim dui. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos. Etiam consequat
          orci ac efficitur volutpat. Etiam sed justo ac metus luctus rhoncus.
          In facilisis fringilla vehicula. Integer nec congue nibh, in molestie
          tellus. Praesent molestie, mauris et tempus dapibus, libero eros
          placerat eros, ut lacinia enim lectus eu turpis. Curabitur felis
          mauris, eleifend ac risus lacinia, ultricies maximus justo.
          Suspendisse tempor varius euismod. Ut tincidunt magna lorem, vel
          vulputate augue accumsan id. Nunc luctus ante non leo congue
          malesuada. Nulla facilisi. In ultrices volutpat massa, condimentum
          luctus urna egestas vitae. Suspendisse dictum non erat eget ultrices.
          Vivamus non sodales nulla, at tincidunt urna. Fusce vitae neque nec
          orci ornare viverra id et erat. Praesent porta eu ante vitae tempus.
          Praesent efficitur massa in enim laoreet, at dapibus mauris tempor. In
          finibus eu augue ut elementum. Mauris eget volutpat lacus, eget
          consequat lorem. Nullam feugiat blandit justo, eget aliquet ligula
          commodo varius. Vivamus leo lectus, convallis sed consectetur eget,
          lobortis ut magna. Cras imperdiet ultricies libero sed laoreet. Aenean
          ultrices pellentesque ligula in suscipit. Maecenas metus felis,
          pretium id porta sed, lobortis condimentum nunc. Vestibulum enim
          ipsum, feugiat sed laoreet sit amet, consectetur vitae urna. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Donec pulvinar mattis nunc non efficitur.
          Vestibulum vestibulum, lectus eget maximus consequat, est magna varius
          ante, sit amet ultrices mauris leo ac augue. Donec nec arcu faucibus,
          maximus lacus ut, aliquam orci. Quisque ut placerat risus. Donec et
          viverra odio. Fusce blandit condimentum elit eget posuere. Vestibulum
          enim tortor, posuere vitae tempus eget, varius non sem. Ut massa
          ipsum, posuere at nulla a, tempor dictum orci. Vestibulum eleifend
          molestie leo eget bibendum. Donec feugiat ligula at sem bibendum, at
          laoreet quam efficitur. Fusce bibendum leo vel diam molestie vehicula.
          Maecenas vehicula neque a lectus iaculis pulvinar.
        </p>
      </>
    </Portal>
  )
  return (
    <>
      <div className={'grid w-full grid-cols-1 mobile:justify-items-center'}>
        <PostHeader
          title={title}
          publicationDate={publicationDate}
          description={description}
          thumbnail={thumbnail}
          latestEdit={latestEdit}
        />
        <PostBody serializedMdx={serializedMdx} />
      </div>
      {secondaryContent}
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
          'laptop:prose-md prose relative w-full mobile:prose-sm mobile:text-clip mobile:text-center'
        }
      >
        <div
          className={
            'absolute top-0 z-[999] h-full max-h-[900px] w-full bg-black bg-opacity-50'
          }
        >
          <div
            className={
              'prose-sm absolute bottom-[1rem] m-0 w-full text-center mobile:prose-sm mobile:text-[1ch] mobile-lg:text-base'
            }
          >
            <h1 className={'blog-post-title-shadow text-white drop-shadow'}>
              {title}
            </h1>
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
          className='drop-shadow-md'
          width={1600}
          height={900}
          style={{
            // fixes the spacing inconsistencies
            margin: 0,
            // maxWidth: '100%',
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
        'min-w-prose prose w-[100%] laptop:max-w-[70ch] laptop:prose-lg desktop:max-w-[75ch]'
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
