import { getPlaiceholder } from 'plaiceholder'

export async function getImageDetails(url: string) {
    const normalized = url.includes('https:') ? url : `https:${url}`
    return await getPlaiceholder(normalized)
}
