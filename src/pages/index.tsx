import type {NextPage} from 'next'
import {generateRandomWord, Letters} from '@/components/spread-letters'

const Home: NextPage = () => {
    return (
        <main className='grid h-full grid-cols-1 grid-rows-3 place-items-center px-8'>
            <span className='row-start-2 w-full max-w-3xl'>
                <Header/>
                <br/>
                <hr/>
                <br/>
                <section
                    id='characteristics'
                    className='animate-characteristics_entry text-center opacity-0 mobile:text-sm laptop:text-base'
                >
                    <i>
                        Professionally curious software engineer and problem
                        solver
                    </i>
                </section>
            </span>
        </main>
    )
}

export default Home

function Header() {
    const lettersProps = {mutator: {logic: generateRandomWord, iterates: true}}
    return (
        <div
            id='header-content'
            className='w-full justify-items-center text-[clamp(3rem,_6vw,_8rem)] font-bold uppercase leading-none'
        >
            <Letters word='connor' {...lettersProps}/>
            <Letters word='williams' {...lettersProps}/>
        </div>
    )
}
