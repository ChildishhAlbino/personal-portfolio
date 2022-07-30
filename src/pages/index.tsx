import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const res = trpc.proxy.contentful.getPosts.useQuery({})
  console.log({ res })
  const data = res.data
  const { posts } = data || {}

  return (
    <>
      <main>
        <pre className='whitespace-pre-wrap'>
          {data ? (
            <p>
              {JSON.stringify(
                posts?.map((item) => [item.title, item.slug]),
                null,
                2
              )}
            </p>
          ) : (
            <p>Loading..</p>
          )}
        </pre>
      </main>
    </>
  )
}

export default Home
