import { ReactNode } from 'react'

export function ContentPageHeader({ children }: { children: ReactNode }) {
    return (
        <div className='font-space flex h-fit max-h-[100px] w-full items-center bg-base px-4 text-[clamp(2rem,_6vw,_4rem)] font-bold uppercase underline'>
            {children}
        </div>
    )
}
