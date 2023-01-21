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
      <span
        className={
          'min-w-[32%] break-words rounded-sm bg-accent text-black hover:bg-highlight hover:text-white '
        }
      >
        <Link
          className='text-inherit no-underline'
          href={`/posts/${item?.slug}`}
        >
          <div
            className={'prose h-full w-full p-3 text-inherit'}
            key={item?.slug}
          >
            <h3 className='text-inherit'>{item?.title}</h3>
            <i className='font-normal'>{item?.description}</i>
          </div>
        </Link>
      </span>
    </>
  )
}

interface Post {
  title: string
  description: string
  slug: string
}
