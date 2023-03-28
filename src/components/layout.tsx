import { ReactNode, useState } from 'react'
import PageFooter from './pageFooter'
import { NavOptions } from '@/types/nav'
import { useRouter } from 'next/router'

export default function Layout({ children, className }: LayoutProps) {
    const router = useRouter()
    const [checked, setChecked] = useState(false)
    const { route } = router

    return (
        <>
            <span
                onClick={() => {
                    setChecked(false)
                }}
                className={`${className || ''} flex justify-center font-sans`}
            >
                <div
                    id='layout-container'
                    className={`absolute top-0 left-0 z-10 h-screen w-screen min-w-[320px] max-w-full`}
                >
                    {children}
                </div>
                <PageFooter
                    navProps={{
                        setChecked,
                        checked,
                        currentPath: route,
                    }}
                />
                <div
                    id='bg-dots'
                    className='fixed z-0 h-screen w-screen max-w-full animate-pulse bg-dots bg-[length:5vmin_5vmin]'
                />
            </span>
        </>
    )
}

export interface LayoutProps {
    children: ReactNode
    className?: string
}
