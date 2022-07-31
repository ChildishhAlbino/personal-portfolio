import { trpc } from '../../utils/trpc'
import { GetStaticPathsResult, GetStaticPropsContext } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'
import superjson from 'superjson'
import { appRouter } from '../../server/trpc/router'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'

export default function Post({ slug }: PostPageProps) {
  const { data } = trpc.proxy.contentful.getPostBySlug.useQuery(
    { slug },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      cacheTime: 200,
    }
  )
  const { body, serializedMdx } = data
  const components = {
    img: (props: { src: string; alt: string }) => {
      const src = props.src
      const blurSrc = `${src}?w=20&q=10`
      return (
        <div className={'max-w-prose'}>
          <Image
            {...props}
            placeholder={'blur'}
            blurDataURL={blurSrc}
            layout='responsive'
          />
        </div>
      )
    },
  }
  const mdx = serializedMdx ? (
    <div className={'prose'}>
      <MDXRemote {...serializedMdx} components={components} lazy />
    </div>
  ) : (
    <></>
  )
  return <>{mdx}</>
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PostPageProps>) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  })

  const slug = params?.slug
  await ssg.fetchQuery('contentful.getPostBySlug', { slug: slug as string })
  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  }
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<PostPageProps>
> {
  return {
    paths: [
      { params: { slug: 'test-mdx-post' } }, // See the "paths" section below
    ],
    fallback: 'blocking',
  }
}

type PostPageProps = {
  slug: string
}
