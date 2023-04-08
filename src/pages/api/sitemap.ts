import { NextApiRequest, NextApiResponse } from 'next'
import { getPages } from '@/server/service/contentful/getPages'
import { getPosts } from '@/server/service/contentful'
import { DateTime } from 'luxon'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const xml = await generateXmlSitemap()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/xml')
    // Instructing the Vercel edge to cache the file
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')
    res.end(xml)
}

const BASE_URL: string = 'https://www.childishhalbino.com'
const KNOWN_PAGES = [BASE_URL, `${BASE_URL}/posts`]

async function generateXmlSitemap() {
    const [DYNAMIC_PAGES, POSTS] = await Promise.all([
        fetchDynamicPagesUrlData(),
        fetchPostUrlData(),
    ])
    const BASE_PAGES = [...KNOWN_PAGES, ...DYNAMIC_PAGES]
    const BASE_PAGE_XML = BASE_PAGES.map(generateXMLForBasePage).join('\n')
    const POSTS_XML = POSTS.map(generateXMLForEditablePage).join('\n')
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
        ${BASE_PAGE_XML}
        ${POSTS_XML}
    </urlset>`
}

async function fetchDynamicPagesUrlData() {
    return (await getPages({ input: {} })).pages.map(
        (page) => `${BASE_URL}/${page.slug}`
    )
}

async function fetchPostUrlData() {
    return (await getPosts({ input: {} })).posts.map((post) => {
        return { url: `${BASE_URL}/${post.slug}`, editDate: post.latestEdit }
    })
}

function generateXMLForBasePage(url: string) {
    return `<url><loc>${url}</loc></url>`
}

function generateXMLForEditablePage({
    url,
    editDate,
}: {
    url: string
    editDate: string
}) {
    const date = DateTime.fromISO(editDate).toISODate()
    return `<url><loc>${url}</loc><lastmod>${date}</lastmod></url>`
}
