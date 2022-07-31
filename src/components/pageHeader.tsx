import Navbar from './navbar'

export default function PageHeader() {
  return (
    <header
      className={'max-w-none mobile:flex-wrap laptop:col-start-2 min-h-[50px]'}
    >
      <Navbar />
    </header>
  )
}
