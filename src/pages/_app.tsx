// src/pages/_app.tsx
import '@/styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { api } from '@/utils/api'
import RootLayout from '@/components/layouts/root-layout'
import { JetBrains_Mono, Martian_Mono, Noto_Sans } from '@next/font/google'
import Head from 'next/head'

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
    const env = process.env.NEXT_PUBLIC_VERCEL_ENV
    const favicon = env === 'production' ? '/favicon.ico' : '/preview.ico'
    return (
        <span className={`${jbMono.variable} ${notoSans.variable}`}>
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
