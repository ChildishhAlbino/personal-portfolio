import Link from 'next/link'
import { OrbitalNav, OrbitalNavProps } from './orbital-nav/orbital-nav'

export type PageFooterProps = {
    navProps: OrbitalNavProps
}

export default function PageFooter({ navProps }: PageFooterProps) {
    return (
        <>
            <footer
                id='real-footer'
                className='fixed bottom-0 z-20 w-full mx-auto mb-4 flex max-w-[clamp(600px,_100vw,_1200px)] justify-center'
            >
                <OrbitalNav {...navProps} />
            </footer>
        </>
    )
}

PageFooter.defaultProps = {
    navProps: {},
}
