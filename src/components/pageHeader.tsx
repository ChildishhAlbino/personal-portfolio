import Navbar from './navbar'

export default function PageHeader() {
  return (
    <header
      className={
        'max-w-none bg-red-400 mobile:flex-wrap laptop:col-start-2 min-h-[50px]'
      }
    >
      <Navbar />
    </header>
  )
}
