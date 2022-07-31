export default function Navbar() {
  return (
    <div
      className={
        'grid mobile:text-center px-4 grid-cols-4 h-full items-end laptop:max-w-[500px]'
      }
    >
      <b>Home</b>
      <b>About</b>
      <b>Links</b>
      <b>Work</b>
    </div>
  )
}
