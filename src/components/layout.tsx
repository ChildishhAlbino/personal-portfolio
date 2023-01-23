import { ReactNode } from 'react'
import Sidebar from './sidebar'
import PageFooter from './pageFooter'
import PageHeader from './pageHeader'

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div
        className={`mobile:grid-rows[50px,_1fr,_1fr,_50px] grid min-h-screen gap-5 bg-primary bg-header-curve bg-[length:100%] bg-no-repeat mobile:grid-cols-1 mobile:grid-rows-[50px_min-content_4fr_50px] mobile:bg-[length:2560px] laptop:grid-cols-[minmax(250px,_min-content)_1fr_minmax(250px,_min-content)] laptop:grid-rows-[50px_1fr_50px]`}
      >
        <PageHeader />
        <Sidebar />
        <main
          className={'min-h-[100vh] p-4 laptop:col-start-2 laptop:row-span-2 '}
        >
          {children}
        </main>
        <section
          id='content-portal'
          className='prose col-start-3 row-span-4 row-start-1 border-l-[1px] bg-secondary p-5 empty:hidden mobile:hidden laptop:block laptop:border-l-black'
        />
        <PageFooter />
      </div>
    </>
  )
}

export interface LayoutProps {
  children: ReactNode
}
