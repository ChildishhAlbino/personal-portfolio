import { ReactNode } from 'react'
import Sidebar from './sidebar'
import PageFooter from './pageFooter'
import PageHeader from './pageHeader'

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div
        id='layout-container'
        className={`h-max-scr absolute top-0 left-0 z-10 h-screen w-screen min-w-[320px] max-w-[100%] font-space`}
      >
        {children}
      </div>
      <div className='absolute top-0 left-0 z-0 h-[100%] w-screen max-w-[100%] animate-pulse bg-dots bg-[length:5vmin_5vmin]' />
    </>
  )
}

export interface LayoutProps {
  children: ReactNode
}
