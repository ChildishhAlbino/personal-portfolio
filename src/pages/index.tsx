import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'
import Link from 'next/link'

const Home: NextPage = () => {
  const res = trpc.proxy.contentful.getPosts.useQuery({})
  console.log({ res })
  const data = res.data
  const { posts } = data || { posts: [] }
  const [post1, post2, post3] = posts as Post[]
  const TestList = (
    <div className={'flex mobile:flex-col laptop:flex-row gap-4'}>
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
        <h2>Current Projects: </h2>
        <hr className={'border-black'} />
        {TestList}
        <h2>Technology and Trinkets: </h2>
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
      <div className={'prose break-words p-4'} key={item?.slug}>
        <Link href={`/posts/${item?.slug}`}>
          <h3>{item?.title}</h3>
        </Link>
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
