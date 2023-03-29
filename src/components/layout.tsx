import { MouseEvent, ReactNode, useState } from 'react'
import PageFooter from './pageFooter'
import { useRouter } from 'next/router'

export default function Layout({ children, className }: LayoutProps) {
    const router = useRouter()
    const [checked, setChecked] = useState(false)
    const { route } = router
    const onClick = () => {
        setChecked(false)
    }
    const checkedClassName = checked
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-0'
    return (
        <>
            <span
                onClick={onClick}
                className={`${className || ''} flex justify-center font-sans `}
            >
                <div
                    id='layout-container'
                    className={`absolute top-0 left-0 z-10 h-screen w-screen min-w-[320px] max-w-full transition-[filter]`}
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
                    className={`fixed z-0 h-screen w-screen max-w-full animate-pulse bg-dots bg-[length:5vmin_5vmin]`}
                />
                <div
                    id='checked-middlelay'
                    className={`fixed z-[19] h-screen w-screen max-w-full bg-[rgba(0,0,0,0.5)] opacity-0 ${checkedClassName} transition-opacity`}
                />
            </span>
        </>
    )
}

export interface LayoutProps {
    children: ReactNode
    className?: string
}
