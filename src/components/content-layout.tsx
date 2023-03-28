import { ReactNode } from 'react'
import PageFooter from './pageFooter'
import type { OrbitalNavProps } from '../components/orbital-nav/orbital-nav'

// type Props =

export default function ContentLayout({
    children,
    currentPage,
}: ContentLayoutProps) {
    return (
        <>
            <main
                id='content-container'
                className={`mx-auto grid h-full w-full max-w-[clamp(600px,_60vw,_1200px)] grid-cols-1`}
            >
                {children}
                <PageFooter navProps={{ currentPage }} />
            </main>
        </>
    )
}

type CurrentPageType = OrbitalNavProps['currentPage']

export interface ContentLayoutProps {
    children: ReactNode
    currentPage: CurrentPageType
}

ContentLayout.defaultProps = {
    currentPage: null,
}
