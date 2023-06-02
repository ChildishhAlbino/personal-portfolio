import type { NextPage } from 'next'
import { api } from '@/utils/api'
import { Loader } from '@/components/loader/loader'
import PageLayout from '@/components/layouts/page-layout'
import { DateTime } from 'luxon'
import { PostAggregationList } from '@/components/post-aggregation-list'

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

    console.time("Slug fetch took:")
    const slugRes = api.contentful.getPostSlugs.useQuery({})
    console.timeEnd("Slug fetch took:")

    const {data: slugData} = slugRes
    const { slugs } = slugData || {slugs: []}
    console.log({slugs})
    console.time("Fetch took:")
    const postQuery = api.contentful.getPosts.useQuery({})
    console.timeEnd("Fetch took:")

    const { data, isLoading: postQueryIsLoading, error } = postQuery
    
    const { posts: rawPosts } = data || { posts: [] }

    const posts = formatPostsForComponent(rawPosts)
    const showError = !postQueryIsLoading && !!error
    const showLoader = !error && postQueryIsLoading
    const showPosts = !showError && !showLoader
    return (
        <PageLayout header='Posts:' title='Posts' description={"A page for all my posts."}>
            <span className='flex h-full flex-col gap-y-4'>
                <span>
                    {showLoader && <Loader size={150} />}
                    {showError && <h1> ERROR </h1>}
                    {showPosts && <PostAggregationList posts={posts} />}
                </span>
            </span>
        </PageLayout>
    )
}

export default PostsAggregationPage

