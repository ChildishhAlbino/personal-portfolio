import { ReactNode } from 'react'

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div
        className={`h-screen grid gap-2 mobile:grid-cols-1 laptop:grid-cols-[minmax(100px,_min-content)_1fr]`}
      >
        <header
          className={
            'max-w-none bg-red-400 mobile:flex-wrap laptop:col-start-2 min-h-[50px]'
          }
        >
          <div
            className={
              'grid mobile:text-center px-4 grid-cols-4 h-full items-end laptop:max-w-[500px]'
            }
          >
            <b>Home</b>
            <b>About</b>
            <b>Links</b>
            <b>Work</b>
          </div>
        </header>
        <section
          className={
            'bg-amber-400 p-5 prose max-w-none laptop:col-start-1 laptop:row-start-1 laptop:row-span-4'
          }
        >
          <h1>Hi! I'm Connor</h1>
          <p>This is the sidebar container</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at
            consequatur ea ex minus, rem reprehenderit velit. Commodi enim iste
            modi voluptate? Accusantium asperiores, aut fugiat laudantium minima
            obcaecati veritatis?
          </p>
        </section>
        <main
          className={
            'bg-yellow-400 p-4 laptop:col-start-2 laptop:row-span-2 min-h-[1fr]'
          }
        >
          {children}
        </main>
        <footer
          className={'bg-green-400 p-2 laptop:col-start-2 laptop:row-start-4'}
        >
          <b>Hello from the footer...</b>
        </footer>
      </div>
    </>
  )
}

export interface LayoutProps {
  children: ReactNode
}
