import type { GetStaticPropsContext, NextPage } from 'next'
import { api } from '@/utils/api'
import PageLayout from '@/components/layouts/page-layout'
import { createServerSideHelpers } from '@trpc/react-query/server'
import superjson from 'superjson'
import { appRouter } from '@/server/api/root'
import { PostAggregation, SlugAggregation } from '@/types/post'
import {
    DynamicPostAggregationItem,
    LoadingPostAggregationItem,
    PostAggregationItem,
} from '@/components/post-aggregation-item'

const PostsAggregationPage: NextPage = () => {
    // const slugQuery = api.contentful.getPostSlugs.useQuery({})

    // const { data, isLoading, error } = slugQuery

    // const { slugs } = data || { slugs: [] }

    const postsQuery = api.contentful.getPosts.useQuery({})

    const { data, isLoading, error } = postsQuery
    
    const { posts } = data || { posts: [] }
    const showError = !isLoading && !!error
    const showLoader = isLoading && !error
    const showPosts = !showError && !showLoader

    return (
        <PageLayout
            header='Posts:'
            title='Posts'
            description={'A page for all my posts.'}
        >
            <span className='flex h-full flex-col gap-y-4'>
                <span>
                    {showLoader && <LoadingPostAggregationList />}
                    {showError && <h1> ERROR </h1>}
                    {/* {showPosts && <DynamicPostAggregationList slugs={slugs} />} */}
                    {showPosts && <PostAggregationList posts={posts} />}
                </span>
            </span>
        </PageLayout>
    )
}

export default PostsAggregationPage

function DynamicPostAggregationList({ slugs }: { slugs: SlugAggregation[] }) {
    return (
        <div className='flex flex-col gap-y-8'>
            {slugs &&
                slugs.map((item) => {
                    return (
                        <DynamicPostAggregationItem
                            slug={item}
                            key={item.slug}
                        />
                    )
                })}
        </div>
    )
}

function PostAggregationList({ posts }: { posts: PostAggregation[] }) {
    return (
        <div className='flex flex-col gap-y-8'>
            {posts &&
                posts.map((post) => {
                    return <PostAggregationItem post={post} key={post.slug} />
                })}
        </div>
    )
}

function LoadingPostAggregationList() {
    const items = Array(12).fill(0)
    return (
        <div className='flex flex-col gap-y-8'>
            {items.map((_, index) => {
                return <LoadingPostAggregationItem key={index} />
            })}
        </div>
    )
}

type PostsPageProps = {}

export async function getStaticProps({}: GetStaticPropsContext<PostsPageProps>) {
    const ssg = await createServerSideHelpers({
        router: appRouter,
        ctx: {},
        transformer: superjson, // optional - adds superjson serialization
    })

    try {
        await ssg.contentful.getPosts.fetch({})
    } catch (e: any) {
        const cause = e.cause
        if (cause.message.includes('No page for slug')) {
            return {
                notFound: true,
            }
        }

        throw e
    }
    return {
        props: {
            trpcState: ssg.dehydrate(),
        },
        revalidate: 30,
    }
}
