import type { NextPage } from 'next'
import { api } from '@/utils/api'
import PageLayout from '@/components/layouts/page-layout'
import { DateTime } from 'luxon'

import { SlugAggregation } from '@/types/post'
import {
    DynamicPostAggregationItem,
    LoadingPostAggregationItem,
} from '@/components/post-aggregation-item'


const PostsAggregationPage: NextPage = () => {
    const slugQuery = api.contentful.getPostSlugs.useQuery({})

    const { data, isLoading, error } = slugQuery
    
    const { slugs } = data || { slugs: [] }

    const showError = !isLoading && !!error
    const showLoader = isLoading && !error
    const showPosts = !showError && !showLoader

    return (
        <PageLayout header='Posts:' title='Posts' description={"A page for all my posts."}>
            <span className='flex h-full flex-col gap-y-4'>
                <span>
                    {showLoader && <LoadingPostAggregationList/>}
                    {showError && <h1> ERROR </h1>}
                    {showPosts && <DynamicPostAggregationList slugs={slugs} />}
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
                    return <DynamicPostAggregationItem slug={item} key={item.slug} />
                })}
        </div>
    )
}


function LoadingPostAggregationList() {
    const items = Array(12).fill(0)
    return (
        <div className='flex flex-col gap-y-8'>
            { items.map((item, index) => {
                return <LoadingPostAggregationItem key={index} />
            })}
        </div>
    )
}

