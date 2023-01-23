import Link from 'next/link'

function NavBarItem({ location, text }: { location: string; text: string }) {
  return (
    <span className={'prose-xl'}>
      <Link href={location}>
        <b className={'hover:border-b-2 hover:text-primary'}>{text}</b>
      </Link>
    </span>
  )
}

export default function Navbar() {
  return (
    <>
      <div
        className={
          'grid h-full grid-cols-4 px-4 mobile:items-center mobile:text-center laptop:max-w-full laptop:items-end'
        }
      >
        <NavBarItem location={'/'} text={'Home'} />
        <NavBarItem location={'/about'} text={'About'} />
        <NavBarItem location={'/links'} text={'Links'} />
        <NavBarItem location={'/work'} text={'Work'} />
      </div>
      {/* <hr className='m-3 border-black laptop:max-w-full' /> */}
    </>
  )
}
