import type { NextPage } from 'next'
import Link from 'next/link'
import { Letters } from '../Letters'
const Home: NextPage = () => {
    return (
        <main className='grid h-full grid-cols-1 grid-rows-3 place-items-center px-[2rem]'>
            <span className='font-space row-start-2 w-full max-w-[540px]'>
                <Header />
                <br />
                <hr />
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
