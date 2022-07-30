import { trpc } from '../../utils/trpc'
import { GetStaticPathsResult, GetStaticPropsContext } from 'next'
import { createSSGHelpers } from '@trpc/react/ssg'
import superjson from 'superjson'
import { appRouter } from '../../server/trpc/router'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Image from 'next/image'

export default function Post({ slug }: PostPageProps) {
  const res = trpc.proxy.contentful.getPostBySlug.useQuery({ slug })
  // documentToReactComponents
  const { body } = res.data
  const { json, links } = body
  const parsed = json
  const renderedBody = documentToReactComponents(parsed, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const assetId = node.data.target.sys.id
        // const sizeArray = links.assets.block.map((item) => item.size).sort()
        let asset = links.assets.block.find((asset) => {
          return asset.sys.id === node.data.target.sys.id
        })
        const { url, width, height, size } = asset
        const props = {
          src: url,
          height,
          width,
        }
        return (
          <Image
            className={''}
            placeholder={'blur'}
            blurDataURL={`${url}?w=150&q=20`}
            {...props}
          />
        )
      },
    },
  })
  return (
    <>
      {/*<pre>{JSON.stringify(res.data, null, 2)}</pre>*/}
      <div>This is a test</div>
      <section>{renderedBody}</section>
    </>
  )
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
      { params: { slug: 'cyberpunk-2077-its-like-skyrim-with-guns' } }, // See the "paths" section below
    ],
    fallback: 'blocking',
  }
}

type PostPageProps = {
  slug: string
}
