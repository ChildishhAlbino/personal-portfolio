import Link from 'next/link'
import { OrbitalNav, OrbitalNavProps } from './orbital-nav/orbital-nav'

export type PageFooterProps = {
    navProps: OrbitalNavProps
}

export default function PageFooter({ navProps }: PageFooterProps) {
    return (
        <>
            {/* moves pages up by a fixed amount so page has a bit of constant extra space */}
            <footer
                id='real-footer'
                className='fixed bottom-0 z-20 mx-auto mb-2 flex w-full max-w-[clamp(600px,_60vw,_1200px)] items-end justify-center mobile:h-[50px]'
            >
                <OrbitalNav {...navProps} />
            </footer>
        </>
    )
}

PageFooter.defaultProps = {
    navProps: {},
}
