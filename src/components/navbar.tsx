import Link from 'next/link'

export default function Navbar() {
  return (
    <div
      className={
        'grid mobile:text-center laptop:text-left px-4 grid-cols-4 h-full laptop:items-end mobile:items-center laptop:max-w-[500px]'
      }
    >
      <Link href={'/'}>
        <b>Home</b>
      </Link>
      <Link href={'/about'}>
        <b>About</b>
      </Link>
      <Link href={'/links'}>
        <b>Links</b>
      </Link>
      <Link href={'/work'}>
        <b>Work</b>
      </Link>
    </div>
  )
}
