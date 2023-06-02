import { getPlaiceholder } from 'plaiceholder'

export async function getImageDetails(url: string) {
    const normalized = url.includes('https:') ? url : `https:${url}`
    console.time(`Placeholder for ${url}:`)
    const res = await getPlaiceholder(normalized)
    console.timeEnd(`Placeholder for ${url}:`)
    return res
}
