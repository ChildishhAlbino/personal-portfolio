import Navbar from './navbar'

export default function PageHeader() {
  return (
    <header
      className={'min-h-[50px] max-w-none mobile:flex-wrap laptop:col-start-2'}
    >
      <Navbar />
    </header>
  )
}
