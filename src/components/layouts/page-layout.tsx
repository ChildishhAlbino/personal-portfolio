import Head from 'next/head'
import { ReactNode } from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { NextSeo } from 'next-seo'

export default function PageLayout({
    children,
    header,
    title,
    description,
}: PageLayoutProps) {
    const pageHeaderContent = title || header
    return (
        <>
            <NextSeo title={pageHeaderContent} description={description} />
            {pageHeaderContent && (
                <Head>
                    <title>{`${pageHeaderContent} | Connor Williams`}</title>
                </Head>
            )}
            <main
                id='page-container'
                className={`mx-auto min-h-full flex max-w-[clamp(600px,_60vw,_1200px)] flex-col mobile:px-4 laptop:px-0`}
            >
                {header && (
                    <header className='flex w-full justify-between items-center text-res-title-md font-bold uppercase border-b-2 border-indigo-600'>
                        <h1>{header}</h1>
                        <div className='flex gap-4'>
                            <a
                                href={'https://twitter.com/ChildishhAlbino'}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <FaTwitter className='text-text hover:text-bright' />
                            </a>
                            <a
                                href={'https://github.com/ChildishhAlbino'}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <FaGithub className='text-text hover:text-bright' />
                            </a>
                            <a
                                href={
                                    'https://www.linkedin.com/in/childishhalbino/'
                                }
                                target='_blank'
                                rel='noreferrer'
                            >
                                <FaLinkedin className='text-text hover:text-bright' />
                            </a>
                        </div>
                    </header>
                )}
                <section
                    id='page-content'
                    className='min-h-full flex-grow pt-4 mb-24'
                >
                    {children}
                </section>
            </main>
        </>
    )
}

PageLayout.defaultProps = {
    header: null,
    title: null,
    description: '',
}

export interface PageLayoutProps {
    children: ReactNode
    header?: string
    title?: string
    description: string
}
