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

export default function Post({ slug }: PostPageProps) {
  const { data } = trpc.proxy.contentful.getPostBySlug.useQuery(
    { slug },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      cacheTime: 200,
      refetchOnMount: false,
    }
  )
  if (!data) {
    return (
      <>
        <p>Loading..</p>
      </>
    )
  }
  const { serializedMdx } = data
  const components = {
    img: (props: { src: string; alt: string }) => {
      const src = props.src
      const blurSrc = `${src}?w=20&q=10`
      return (
        <div className={'mobile:max-w-prose'}>
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
    <div className={'prose prose-lg min-w-full'}>
      <MDXRemote {...serializedMdx} components={components} lazy />
    </div>
  ) : (
    <></>
  )
  return (
    <>
      <div className={'w-full grid grid-cols-1 justify-items-start'}>{mdx}</div>
    </>
  )
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
    revalidate: 60,
  }
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<PostPageProps>
> {
  return {
    paths: [
      { params: { slug: 'the-evolution-of-my-website' } }, // See the "paths" section below
    ],
    fallback: true,
  }
}

type PostPageProps = {
  slug: string
}

interface PageStaticProps {
  trpcState: DehydratedState
  slug: string
}
