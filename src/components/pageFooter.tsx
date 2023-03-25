import Link from 'next/link'

export default function PageFooter() {
  return (
    <footer
      id='content-footer'
      className='fixed bottom-0 z-20 flex w-[100%] max-w-[clamp(600px,_60vw,_1200px)] bg-darker px-[2rem] mobile:h-[50px]'
    >
      <Nav />
    </footer>
  )
}

function Nav() {
  const navItems = ['posts', 'about', 'resume']

  return (
    <div className='flex w-full items-center justify-between'>
      {navItems.map((navItem, index) => {
        return (
          <i key={index} className='text-l lowercase'>
            <Link href={`/${navItem}`} className='underline'>
              {navItem}
            </Link>
          </i>
        )
      })}
    </div>
  )
}
