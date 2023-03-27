// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { api } from '../utils/api'
import Layout from '../components/layout'
import ContentLayout from '@/components/content-layout'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default api.withTRPC(MyApp)
