import { ReactNode } from 'react'

export function ContentPageHeader({ children }: { children: ReactNode }) {
    return (
        <div className='flex h-fit w-full items-center bg-base px-4 text-[clamp(2rem,_3vw,_4rem)] font-bold uppercase underline'>
            {children}
        </div>
    )
}
