import { PostAggregation } from '@/types/post'
import { PostAggregationItem } from '@/components/post-aggregation-item'

export function PostAggregationList({ posts }: { posts: PostAggregation[] }) {
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

