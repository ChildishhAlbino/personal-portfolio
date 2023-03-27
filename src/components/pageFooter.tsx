import Link from 'next/link'
import { FaGripLines } from 'react-icons/fa'
export default function PageFooter() {
  return (
    <>
      <footer
        id='pseudo-footer'
        className='mt-12 w-full max-w-[clamp(600px,_60vw,_1200px)] mobile:h-[50px]'
      />
      <RealFooter />
    </>
  )
}

function RealFooter() {
  const navItemClassNames =
    'col-start-1 row-start-1 scale-0 transition-transform peer-checked:scale-100'
  return (
    <footer
      id='real-footer'
      className='fixed bottom-0 z-20 mb-2 flex w-full max-w-[clamp(600px,_60vw,_1200px)] items-end justify-center mobile:h-[50px]'
    >
      <span className='group grid h-[150px] w-[25%] grid-cols-1 grid-rows-1 items-end justify-items-center'>
        <input
          id='nav-bubble-check'
          type='checkbox'
          className='peer absolute z-30 col-start-1 row-start-1 h-16 w-16 opacity-0'
        />
        <div className='absolute z-[29] col-start-1 row-start-1 flex h-16 w-16 items-center justify-center rounded-full bg-base transition-transform peer-checked:rotate-90 '>
          <FaGripLines />
        </div>
        <NavItem
          name='about'
          className={`peer-checked:-translate-y-32 ${navItemClassNames}`}
        />
        <NavItem
          name='posts'
          className={`peer-checked:-translate-y-[5.25rem] peer-checked:-translate-x-[5.5rem] ${navItemClassNames}`}
        />
        <NavItem
          name='resume'
          className={`peer-checked:-translate-y-[5.25rem] peer-checked:translate-x-[5.5rem] ${navItemClassNames}`}
        />
        <section
          id='left-extra-nav'
          className={`${navItemClassNames} empty:hidden peer-checked:translate-x-32`}
        />
        <section
          id='right-extra-nav'
          className={`${navItemClassNames} empty:hidden  peer-checked:-translate-x-32 `}
        />
        <span className='group col-start-1 row-start-1 grid'></span>
      </span>
    </footer>
  )
}

interface NavItem {
  name: string
  path?: string
  icon?: JSX.Element
  className?: string
}

export function NavItem({ name, path, className, icon }: NavItem) {
  const actualClassName = className || ''
  return (
    <div
      className={`${actualClassName} flex h-16 w-16 items-center justify-center rounded-full bg-light`}
    >
      <i className='text-l text-center lowercase'>
        <Link href={`/${path || name}`} className='underline'>
          {icon || <i>{name}</i>}
        </Link>
      </i>

      {/* 🍔 */}
    </div>
  )
}

function FooterNavBar() {
  return (
    <div className='absolute flex h-full min-h-[50px] w-4/5 origin-bottom -translate-y-8 scale-0 rounded-xl bg-base transition-transform hover:scale-100 peer-hover:scale-100'>
      <Nav />
    </div>
  )
}

function Nav() {
  const navItems = ['posts', 'about', 'resume']

  return (
    <div className='row-start-1 flex w-full items-center justify-around'>
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
