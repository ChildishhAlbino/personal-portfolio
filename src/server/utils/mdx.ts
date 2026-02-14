import { serialize } from 'next-mdx-remote/serialize'
import { defListHastHandlers, remarkDefinitionList } from 'remark-definition-list'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkPrism from 'remark-prism'

const remarkPlugins = [
    remarkUnwrapImages,
    remarkDefinitionList,
    [
        remarkPrism,
        {
            classPrefix: 'language-',
        },
    ],
] as any

export async function serializeMdx(mdx: string){
    return await serialize(mdx, {
        mdxOptions: {
            remarkPlugins,
            format: 'mdx',
            remarkRehypeOptions: {
                handlers: {
                    ...defListHastHandlers,
                },
            },
        },
    })
}