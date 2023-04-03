// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { api } from '../utils/api'
import RootLayout from '../components/layouts/root-layout'
import Head from 'next/head'

import { Space_Mono } from '@next/font/google'

const space_mono = Space_Mono({
    weight: ['400', '700'],
    variable: '--next-google-font-space',
    subsets: ['latin'],
    fallback: ['Courier'],
    display: 'block',
})

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <span className={space_mono.variable}>
            <RootLayout>
                <Head>
                    <title>ChildishhAlbino</title>
                    <link rel='shortcut icon' href='/favicon-32x32.png' />
                </Head>
                <Component {...pageProps} />
            </RootLayout>
        </span>
    )
}

export default api.withTRPC(MyApp)
