import type { NextPage } from 'next'
import { trpc } from '../utils/trpc'
import Link from 'next/link'
import { Loader } from '../components/loader/loader'
const Home: NextPage = () => {
  const { data, isLoading, error, isStale } =
    trpc.proxy.contentful.getPosts.useQuery({})
  const { posts } = data || { posts: [] }
  const [post1, post2, post3] = posts as Post[]
  const TestList = (
    <div className={'flex mobile:flex-col laptop:flex-row gap-4'}>
      <Card item={post1} />
      <Card item={post2} />
      <Card item={post3} />
    </div>
  )
  // return <Loader />
  if (!data) {
    return <Loader />
  }

  return (
    <>
      <main
        className={
          'prose max-w-none text-center laptop:text-left grid grid-cols-1 justify-items-center laptop:justify-items-start'
        }
      >
        <h2>My Recent Posts: </h2>
        <hr className={'border-black w-full'} />
        {TestList}
        <h2>Current Projects: </h2>
        <hr className={'border-black w-full'} />
        {TestList}
        <h2>Technology and Trinkets: </h2>
        <hr className={'border-black w-full'} />
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
        className={'bg-accent prose break-words p-4 min-w-[32%]'}
        key={item?.slug}
      >
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
