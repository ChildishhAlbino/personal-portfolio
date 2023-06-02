import type { NextPage } from 'next'
import { api } from '@/utils/api'
import PageLayout from '@/components/layouts/page-layout'
import { DateTime } from 'luxon'

import { PostAggregation } from '@/types/post'
import { LoadingPostAggregationItem, PostAggregationItem } from '@/components/post-aggregation-item'

function formatPostsForComponent(rawPosts: any[]) {
    return rawPosts.map((post) => {
        const { publicationDate } = post
        const newPublicationDate = DateTime.fromISO(publicationDate)
            .setLocale('au')
            .toLocaleString(DateTime.DATE_FULL)

        return {
            ...post,
            publicationDate: newPublicationDate,
        }
    })
}

const PostsAggregationPage: NextPage = () => {
    const slugQuery = api.contentful.getPostSlugs.useQuery({})
    console.log({slugQuery})
    const postQuery = api.contentful.getPosts.useQuery({})

    const { data, isLoading: postQueryIsLoading, error } = postQuery
    
    const { posts: rawPosts } = data || { posts: [] }

    const posts = formatPostsForComponent(rawPosts)
    const showError = !postQueryIsLoading && !!error
    const showLoader = postQueryIsLoading && !error
    // const showLoader = true
    const showPosts = !showError && !showLoader

    return (
        <PageLayout header='Posts:' title='Posts' description={"A page for all my posts."}>
            <span className='flex h-full flex-col gap-y-4'>
                <span>
                    {showLoader && <LoadingPostAggregationList/>}
                    {showError && <h1> ERROR </h1>}
                    {showPosts && <PostAggregationList posts={posts} />}
                </span>
            </span>
        </PageLayout>
    )
}

export default PostsAggregationPage

function PostAggregationList({ posts }: { posts: PostAggregation[] }) {
    if (posts.length === 0) {
        return <h1>No posts were found...</h1>
    }

    return (
        <div className='flex flex-col gap-y-8'>
            {posts &&
                posts.map((item) => {
                    return <PostAggregationItem item={item} key={item.slug} />
                })}
        </div>
    )
}

function LoadingPostAggregationList() {
    const items = Array(6).fill(0)
    return (
        <div className='flex flex-col gap-y-8'>
            { items.map((item, index) => {
                return <LoadingPostAggregationItem key={index} />
            })}

        </div>
    )
}

