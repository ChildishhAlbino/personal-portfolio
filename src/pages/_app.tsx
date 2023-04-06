// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { api } from '../utils/api'
import RootLayout from '../components/layouts/root-layout'
import { Space_Mono } from '@next/font/google'
import Head from 'next/head'

const space_mono = Space_Mono({
    weight: ['400', '700'],
    variable: '--next-google-font-space',
    subsets: ['latin'],
    fallback: ['Courier'],
    display: 'block',
})

const MyApp: AppType = ({ Component, pageProps }) => {
    const env = process.env.NEXT_PUBLIC_VERCEL_ENV
    const favicon = env === 'production' ? '/favicon.ico' : '/preview.ico'
    return (
        <span className={space_mono.variable}>
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
