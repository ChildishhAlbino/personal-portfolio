import Link from 'next/link'

function NavBarItem({ location, text }: { location: string; text: string }) {
  return (
    <span className={'hover:border-b-black hover:border-b-2'}>
      <Link href={location}>
        <b className={'hover:text-highlight'}>{text}</b>
      </Link>
    </span>
  )
}

export default function Navbar() {
  return (
    <div
      className={
        'grid mobile:text-center laptop:text-left px-4 grid-cols-4 h-full laptop:items-end mobile:items-center laptop:max-w-[500px]'
      }
    >
      <NavBarItem location={'/'} text={'Home'} />
      <NavBarItem location={'/about'} text={'About'} />
      <NavBarItem location={'/links'} text={'Links'} />
      <NavBarItem location={'/work'} text={'Work'} />
    </div>
  )
}
