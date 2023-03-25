import Link from 'next/link'

export function NavBubble() {
  return (
    <div className='group fixed left-[calc(50%_-_25px)] bottom-[2%] flex h-[50px] w-[50px] origin-bottom flex-col items-center justify-center rounded-[50%] bg-light shadow drop-shadow-lg transition-transform hover:scale-x-[400%] hover:scale-y-[400%] hover:rounded-md focus:scale-[200%] focus:rounded-md'>
      <span className='hidden group-hover:block'>
        <Nav />
      </span>
      <p>🍔</p>
    </div>
  )
}

function Nav() {
  const navItems = ['posts', 'about', 'resume']

  return (
    <div className='flex flex-col justify-between'>
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
