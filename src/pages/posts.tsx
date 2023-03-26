import type { NextPage } from 'next'
import { api } from '@/utils/api'
import Link from 'next/link'
import { Loader } from '@/components/loader/loader'
import { Post } from '@/types/post'
import ContentLayout from '@/components/content-layout'
import { DateTime } from 'luxon'
import Image from 'next/image'
import { FlexibleImage } from '@/components/flexible-image'
import PageFooter from '@/components/pageFooter'

const PostsAggregationPage: NextPage = () => {
  const { data, isLoading, error, isStale } = api.contentful.getPosts.useQuery(
    {}
  )
  const { posts: rawPosts } = data || { posts: [] }

  console.log(data)
  const posts = rawPosts.map((post) => {
    const { publicationDate } = post
    const newPublicationDate = DateTime.fromISO(publicationDate).toLocaleString(
      DateTime.DATE_FULL
    )

    return {
      ...post,
      publicationDate: newPublicationDate,
    }
  })
  return (
    <ContentLayout>
      <div className='row-1 flex h-full max-h-[100px] w-full items-center bg-base px-[1rem] font-space'>
        <p className='text-[clamp(2rem,_6vw,_4rem)] font-bold uppercase underline'>
          Posts:
        </p>
      </div>
      <span className='min-h-[60vh] p-[1rem]'>
        {isLoading && <Loader size={150} />}
        {!isLoading && <ListOfPosts posts={posts} />}
      </span>
    </ContentLayout>
  )
}

export default PostsAggregationPage

function ListOfPosts({ posts }: { posts: Post[] }) {
  return (
    <div className='flex flex-col gap-y-10 pb-[4rem]'>
      {posts &&
        posts.map((item) => {
          return <Card item={item} key={item.slug} />
        })}
    </div>
  )
}

function Card({ item }: { item: Post }) {
  const topKeywords = item.keywords.slice(0, 5)
  const totalKeywords = topKeywords.length
  console.log({ item })
  return (
    <>
      <div className='grid min-h-[250px] w-full border-spacing-2 border-b-2 border-light border-opacity-20 pb-[1rem] mobile:grid-cols-1 mobile:gap-y-6 mobile:text-center desktop:grid-cols-[2fr,_4fr] desktop:gap-x-[2rem] desktop:text-left'>
        <FlexibleImage
          src={item.thumbnail.url}
          alt={''}
          height={200}
          className='mobile:justify-self-center desktop:justify-self-start'
          aspectRatio={item.thumbnailAspectRatio as 'SQUARE' | 'RECTANGLE'}
        />
        <span>
          <Link
            href={`/posts/${item?.slug}`}
            className='text-[clamp(1rem,_6vw,_2rem)] underline'
          >
            <h1>{item?.title}</h1>
          </Link>
          <div className='flex flex-col gap-1'>
            <i className='break-all text-[clamp(12px,_1vw,_1rem)]'>
              {item?.description}
            </i>
            <br />
            <pre className='text-sm'>{item?.publicationDate}</pre>
            <span className='flex gap-4 text-sm mobile:self-center desktop:self-start'>
              {item.keywords.slice(0, 5).map((keyword, index) => {
                const suffix = index < totalKeywords - 1 ? ',' : ''
                return (
                  <i
                    className='text-text-darker underline'
                    key={`${keyword}_${index}`}
                  >
                    {keyword}
                    {suffix}
                  </i>
                )
              })}
            </span>
          </div>
        </span>
      </div>
    </>
  )
}
