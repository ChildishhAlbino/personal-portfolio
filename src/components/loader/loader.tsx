import LoaderElement from 'react-spinners/MoonLoader'

export const Loader = ({ size }: { size: number }) => {
  return (
    <>
      <div className='flex h-full w-full mobile:justify-center'>
        <LoaderElement
          size={size}
          className='self-center laptop:self-start	'
          color='white'
        />
      </div>
    </>
  )
}
