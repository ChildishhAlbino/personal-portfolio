import { ReactNode } from 'react'
import PageFooter from './pageFooter'

export default function Layout({ children, className }: LayoutProps) {
  return (
    <>
      <div
        id='layout-container'
        className={`absolute top-0 left-0 z-10 h-screen w-screen min-w-[320px] max-w-[100%] ${
          className || ''
        } font-sans`}
      >
        {children}
      </div>
      <div className='fixed z-0 h-screen w-screen max-w-full animate-pulse bg-dots bg-[length:5vmin_5vmin]' />
    </>
  )
}

export interface LayoutProps {
  children: ReactNode
  className?: string
}
