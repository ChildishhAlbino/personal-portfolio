import { ReactNode } from 'react'

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className={'prose'}>
        <header>
          <h1> Hi I'm Connor! (this is a page header)</h1>
        </header>
        <main>{children}</main>
        <footer>
          <i>Hello from the footer...</i>
        </footer>
        <div />
      </div>
    </>
  )
}

export interface LayoutProps {
  children: ReactNode
}
