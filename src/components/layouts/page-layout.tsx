import { ReactNode } from 'react'

export default function PageLayout({ children, header }: ContentLayoutProps) {
    return (
        <>
            <main
                id='page-container'
                className={`mx-auto flex max-w-[clamp(600px,_60vw,_1200px)] grid-rows-1 flex-col`}
            >
                {header && (
                    <div className='mb-4 flex h-fit w-full items-center bg-base px-4 text-[clamp(2rem,_2.5vw,_4rem)] font-bold uppercase underline'>
                        <h1>{header}</h1>
                    </div>
                )}
                <section
                    id='page-content'
                    className='flex min-h-[80vh] flex-col gap-4 px-4'
                >
                    {children}
                </section>
                <footer
                    id='pseudo-footer'
                    className='mt-12 w-full max-w-[clamp(600px,_60vw,_1200px)] mobile:h-[50px]'
                />
            </main>
        </>
    )
}

PageLayout.defaultProps = {
    header: null,
}

export interface ContentLayoutProps {
    children: ReactNode
    header?: string
}
