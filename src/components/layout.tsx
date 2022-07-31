import { ReactNode } from 'react'
import Sidebar from './sidebar'
import PageFooter from './pageFooter'
import PageHeader from './pageHeader'

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div
        className={`min-h-screen mobile:grid-rows-[50px_1fr_4fr_50px] laptop:grid-rows-[50px_1fr_50px] grid gap-2 mobile:grid-cols-1 mobile:grid-rows[50px,_1fr,_1fr,_50px] laptop:grid-cols-[minmax(100px,_min-content)_1fr]`}
      >
        <PageHeader />
        <Sidebar />
        <main
          className={'bg-yellow-400 p-4 laptop:col-start-2 laptop:row-span-2 '}
        >
          {children}
        </main>
        <PageFooter />
      </div>
    </>
  )
}

export interface LayoutProps {
  children: ReactNode
}
