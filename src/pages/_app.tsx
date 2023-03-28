// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { api } from '../utils/api'
import Layout from '../components/layout'
import ContentLayout from '@/components/content-layout'
import Head from 'next/head'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>ChildishhAlbino</title>
        <link rel="shortcut icon" href="favicon-32x32.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default api.withTRPC(MyApp)
