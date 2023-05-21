// src/pages/_app.tsx
import '@/styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { api } from '@/utils/api'
import RootLayout from '@/components/layouts/root-layout'
import { JetBrains_Mono, Noto_Sans } from '@next/font/google'
import Head from 'next/head'
import { env } from '@/env.mjs'
import { DefaultSeo } from 'next-seo'

const jbMono = JetBrains_Mono({
    weight: 'variable',
    variable: '--google-font-family-jb',
    subsets: ['latin'],
    fallback: ['Courier'],
    display: 'block',
})


const notoSans = Noto_Sans({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--google-font-family-noto',
    subsets: ['latin'],
    fallback: ['Courier'],
    display: 'block',
})

const MyApp: AppType = ({ Component, pageProps }) => {
    const favicon =
        env.NEXT_PUBLIC_VERCEL_ENV === 'production'
            ? '/favicon.ico'
            : '/preview.ico'
    const url = env.NEXT_PUBLIC_BASE_URL
    const openGraph = {
        type: 'website',
        locale: 'en_AU',
        url: url,
        siteName: 'ChildishhAlbino',
        images: [
            {
                url: `${url}/seo-default-image.jpg`,
                width: 3000,
                height: 3000,
                alt: 'Profile Photo',
            },
        ],
    }
    const twitter = {
        handle: '@childishhalbino',
        site: url,
        cardType: 'summary_large_image',
    }
    return (
        <span className={`${jbMono.variable} ${notoSans.variable}`}>
            <DefaultSeo
                titleTemplate={'%s | ChildishhAlbino'}
                defaultTitle={'ChildishhAlbino'}
                description={'Professionally curious software engineer'}
                openGraph={openGraph}
                twitter={twitter} />
            <Head>
                <title>ChildishhAlbino</title>
                <link rel='shortcut icon' href={favicon} />
            </Head>
            <RootLayout>
                <Component {...pageProps} />
            </RootLayout>
        </span>
    )
}

export default api.withTRPC(MyApp)
