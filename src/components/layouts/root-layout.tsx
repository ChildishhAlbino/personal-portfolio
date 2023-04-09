import { ReactNode, useState } from 'react'
import PageFooter from '../page-footer'
import { useRouter } from 'next/router'

export default function RootLayout({ children }: LayoutProps) {
    const router = useRouter()
    const [checked, setChecked] = useState(false)
    const { asPath } = router
    const onClick = () => {
        setChecked(false)
    }
    const checkedClassName = checked ? 'opacity-90 z-[19]' : 'opacity-0 z-[0]'
    return (
        <>
            <span
                onClick={onClick}
                className={`text-text flex justify-center font-sans`}
            >
                <div
                    id='layout-container'
                    className={`absolute h-full top-0 left-0 z-10 w-screen min-w-entire-website max-w-full`}
                >
                    {children}
                </div>
                <PageFooter
                    navProps={{
                        setChecked,
                        checked,
                        currentPath: asPath,
                    }}
                />
                <div
                    id='bg-dots'
                    className={`fixed z-0 h-screen w-screen max-w-full animate-pulse bg-grid bg-[length:2rem_2rem]`}
                />
                <div
                    id='checked-middlelay'
                    className={`fixed h-full w-screen min-w-entire-website max-w-full bg-black duration-500 ${checkedClassName} transition-opacity`}
                />
            </span>
        </>
    )
}

export interface LayoutProps {
    children: ReactNode
}
