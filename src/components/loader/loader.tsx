import React, { CSSProperties } from 'react'
import styles from './loader.module.css'
import LoaderElement from 'react-spinners/MoonLoader'

export const Loader = ({ size }: { size: number }) => {
  console.log('test')
  return (
    <>
      <div className='flex h-full w-full mobile:justify-center laptop:justify-start'>
        <LoaderElement size={200} className='self-center laptop:self-start	' />
      </div>
    </>
  )
}
