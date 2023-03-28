import type { NextPage } from 'next'
import { api } from '../utils/api'
import Link from 'next/link'
import { Loader } from '../components/loader/loader'
import Portal from '../components/portal/portal'
const Home: NextPage = () => {
    return (
        <main className='grid h-full grid-cols-1 grid-rows-3 place-items-center px-[2rem]'>
            <span className='font-space row-start-2 w-full max-w-[540px]'>
                <Header />
                <br />
                <hr />
                <br />
                {/* <Nav /> */}
            </span>
        </main>
    )
}

export default Home

function Header() {
    return (
        <div
            id='header-content'
            className='w-full justify-items-center text-[clamp(3.75rem,_3vw,_96px)] font-bold uppercase leading-none'
        >
            <Letters word='connor' />
            <Letters word='williams' />
        </div>
    )
}

function Nav() {
    const navItems = ['posts', 'about', 'resume']

    return (
        <div className='flex justify-between'>
            {navItems.map((navItem, index) => {
                return (
                    <i key={index} className='text-l lowercase'>
                        <Link href={`/${navItem}`} className='underline'>
                            {navItem}
                        </Link>
                    </i>
                )
            })}
        </div>
    )
}

function Letters({ word, className }: LettersProps) {
    const letters = word.split('')

    return (
        <div className={`flex justify-between ${className || ''}`}>
            {letters.map((letter, index) => (
                <h1 key={`${letter}_${index}`}>{letter}</h1>
            ))}
        </div>
    )
}

type LettersProps = {
    word: string
    className?: string
}
