import { ReactNode } from 'react'

export default function PageLayout({ children }: ContentLayoutProps) {
    return (
        <>
            <main
                id='content-container'
                className={`mx-auto grid h-full w-full max-w-[clamp(600px,_60vw,_1200px)] grid-cols-1`}
            >
                {children}
                <footer
                    id='pseudo-footer'
                    className='mt-12 w-full max-w-[clamp(600px,_60vw,_1200px)] mobile:h-[50px]'
                />
            </main>
        </>
    )
}

export interface ContentLayoutProps {
    children: ReactNode
}
