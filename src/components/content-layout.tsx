import { ReactNode } from 'react'

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <main
        id='content-container'
        className={`text-space mx-auto grid h-full w-full max-w-[clamp(600px,_60vw,_1200px)] grid-cols-1 grid-rows-[100px_1fr]`}
      >
        {children}
      </main>
    </>
  )
}

export interface ContentLayoutProps {
  children: ReactNode
}
