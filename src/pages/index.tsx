import type { NextPage } from 'next'
import { api } from '../utils/api'
import Link from 'next/link'
import { Loader } from '../components/loader/loader'
import Portal from '../components/portal/portal'
const Home: NextPage = () => {
  const { data, isLoading, error, isStale } = api.contentful.getPosts.useQuery(
    {}
  )
  const { posts } = data || { posts: [] }
  const [post1, post2, post3] = posts as Post[]
  const TestList = (
    <div className={'flex gap-4 mobile:flex-col laptop:flex-row'}>
      <Card item={post1} />
      <Card item={post2} />
      <Card item={post3} />
    </div>
  )
  if (!data) {
    return <Loader size={100} />
  }

  return (
    <>
      <main
        className={
          'prose grid max-w-none grid-cols-1 justify-items-center text-center laptop:justify-items-start laptop:text-left'
        }
      >
        <h2>My Recent Posts: </h2>
        {TestList}
        <h2>Current Projects: </h2>
        {TestList}
        <h2>Technology and Trinkets: </h2>
        {TestList}
      </main>
      <Portal selector='#content-portal'>
        <>
          <h2>Index page secondary content</h2>
        </>
        This will include featured posts, and recently viewed posts.
      </Portal>
    </>
  )
}

export default Home

function Card({ item }: { item: Post | undefined }) {
  return (
    <>
      <div
        className={'prose min-w-[32%] break-words bg-accent p-4'}
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
