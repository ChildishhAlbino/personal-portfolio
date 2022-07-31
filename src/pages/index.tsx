import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const res = trpc.proxy.contentful.getPosts.useQuery({})
  console.log({ res })
  const data = res.data
  const { posts } = data || { posts: [] }
  const [post1, post2, post3] = posts as Post[]
  const TestList = (
    <div className={'flex mobile:flex-col laptop:flex-row'}>
      <Card item={post1} />
      <Card item={post2} />
      <Card item={post3} />
    </div>
  )
  if (!data) {
    return <p>Loading..</p>
  }

  return (
    <>
      <main className={'prose max-w-none'}>
        <h2>My Recent Posts: </h2>
        <hr className={'border-black'} />
        {TestList}
        <h2>My Recent Posts: </h2>
        <hr className={'border-black'} />
        {TestList}
        <h2>My Recent Posts: </h2>
        <hr className={'border-black'} />
        {TestList}
      </main>
    </>
  )
}

export default Home

function Card({ item }: { item: Post | undefined }) {
  return (
    <>
      <div
        className={'prose break-words border-black border-2 p-1'}
        key={item?.slug}
      >
        <h3>{item?.title}</h3>
        <p>{item?.description}</p>
      </div>
    </>
  )
}

interface Post {
  title: string
  description: string
  slug: string
}
