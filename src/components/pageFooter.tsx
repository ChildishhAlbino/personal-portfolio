import Link from 'next/link'
import { useState } from 'react'
import { FaGripLines } from 'react-icons/fa'
export default function PageFooter() {
  return (
    <>
      {/* moves pages up by a fixed amount so page has a bit of constant extra space */}
      <footer
        id='pseudo-footer'
        className='mt-12 w-full max-w-[clamp(600px,_60vw,_1200px)] mobile:h-[50px]'
      />
      <RealFooter />
    </>
  )
}

function RealFooter() {
  const slots = {
    LEFT: ['-translate-x-32', 'translate-y-0'],
    LEFT_CENTER: ['translate-x-[5.5rem]', '-translate-y-[5.25]'],
    CENTER: ['translate-x-0', '-translate-y-32'],
    RIGHT_CENTER: ['-translate-x-[5.5rem]', '-translate-y-[5.25]'],
    RIGHT: ['-translate-x-32', 'translate-y-0'],
  }

  const VERTICAL_SLOTS = {
    CENTER: 'peer-checked:-translate-y-32',
  }

  const navItemClassNames =
    'col-start-1 row-start-1 scale-0 transition-transform peer-checked:scale-100 ease-[cubic-bezier(.15,.67,.22,1.31)] duration-[700ms]'
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
          className={`delay-100 ${VERTICAL_SLOTS['CENTER']} ${navItemClassNames}`}
        />
        <NavItem
          name='posts'
          className={`delay-75 peer-checked:-translate-y-[5.25rem] peer-checked:-translate-x-[5.5rem] ${navItemClassNames}`}
        />
        <NavItem
          name='resume'
          className={`delay-75 peer-checked:-translate-y-[5.25rem] peer-checked:translate-x-[5.5rem] ${navItemClassNames}`}
        />
        <section
          id='left-extra-nav'
          className={`${navItemClassNames} delay-[50ms] empty:hidden peer-checked:translate-x-32`}
        />
        <section
          id='right-extra-nav'
          className={`${navItemClassNames} delay-[50ms] empty:hidden  peer-checked:-translate-x-32 `}
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
  const actualPath = `${path || name}`
  const href = actualPath[0] == '/' ? actualPath : `/${actualPath}`
  return (
    <div
      className={`${actualClassName} flex h-16 w-16 items-center justify-center rounded-full bg-light drop-shadow-md`}
    >
      <i className='text-l text-center lowercase'>
        <Link href={href} className='underline'>
          {icon || <i>{name}</i>}
        </Link>
      </i>
    </div>
  )
}
