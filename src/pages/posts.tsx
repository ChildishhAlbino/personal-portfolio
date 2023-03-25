import type { NextPage } from 'next'
import { api } from '@/utils/api'
import Link from 'next/link'
import { Loader } from '@/components/loader/loader'
import Portal from '@/components/portal/portal'
import { Post } from '@/types/post'
import ContentLayout from '@/components/content-layout'

const PostsAggregationPage: NextPage = () => {
  const { data, isLoading, error, isStale } = api.contentful.getPosts.useQuery(
    {}
  )
  const { posts } = data || { posts: [] }

  console.log(data)
  return (
    <ContentLayout>
      <div className='row-1 flex h-full w-full items-center bg-base px-[1rem] font-space'>
        <p className='text-[clamp(2rem,_6vw,_4rem)] font-bold uppercase underline'>
          Posts:
        </p>
      </div>
      <span className='p-[1rem]'>
        {isLoading && <Loader size={150} />}
        {!isLoading && <ListOfPosts posts={posts} />}
      </span>
    </ContentLayout>
  )
}

export default PostsAggregationPage

function ListOfPosts({ posts }: { posts: Post[] }) {
  return (
    <div className='flex flex-col gap-10'>
      {posts &&
        posts.map((item) => {
          return <Card item={item} key={item.slug} />
        })}
    </div>
  )
}

function Card({ item }: { item: Post }) {
  return (
    <>
      <div className='min-h-[150px] w-full text-[clamp(1rem,_6vw,_2rem)]'>
        <Link href={`/posts/${item?.slug}`} className='underline'>
          <h1>{item?.title}</h1>
        </Link>
        <div>
          <i className='text-sm'>{item?.description}</i>
        </div>
      </div>
    </>
  )
}
