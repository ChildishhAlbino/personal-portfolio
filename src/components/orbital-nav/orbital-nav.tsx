import { FaGripLines } from 'react-icons/fa'
import Link from 'next/link'
import { NavOptions } from '@/types/nav'

const POSITIONS = {
    LEFT: 'LEFT',
    LEFT_CENTER: 'LEFT_CENTER',
    CENTER: 'CENTER',
    RIGHT_CENTER: 'RIGHT_CENTER',
    RIGHT: 'RIGHT',
}

const NAV_OPTIONS: NavOptions = {
    LEFT_PORTAL: 'LEFT_PORTAL',
    POSTS: 'POSTS',
    ABOUT: 'ABOUT',
    RESUME: 'RESUME',
    RIGHT_PORTAL: 'RIGHT_PORTAL',
}

const POST_PAGE_CONFIG = {
    previous: NAV_OPTIONS.RESUME,
    after: NAV_OPTIONS.ABOUT,
} as NavOptionConfig

const ABOUT_PAGE_CONFIG = {
    previous: NAV_OPTIONS.POSTS,
    after: NAV_OPTIONS.RESUME,
} as NavOptionConfig

const RESUME_PAGE_CONFIG = {
    previous: NAV_OPTIONS.ABOUT,
    after: NAV_OPTIONS.RESUME,
} as NavOptionConfig

const NAV_OPTION_CONFIG: NavOptionConfigs = {
    [NAV_OPTIONS.POSTS]: POST_PAGE_CONFIG,
    [NAV_OPTIONS.ABOUT]: ABOUT_PAGE_CONFIG,
    [NAV_OPTIONS.RESUME]: RESUME_PAGE_CONFIG,
}

type NavOptionConfigs = {
    [Property in keyof NavOptions as string]: NavOptionConfig
}

type NavOptionConfig = {
    previous: keyof NavOptions
    after: keyof NavOptions
}

const NAV_DEFAULT_POSITION = Object.keys(NAV_OPTIONS) as Array<keyof NavOptions>
const NAV_DEFAULT_POSITION_KEY = Object.keys(POSITIONS)

const HORIZONTAL_SLOTS = {
    [POSITIONS.LEFT]: 'peer-checked:-translate-x-32',
    [POSITIONS.LEFT_CENTER]: 'peer-checked:-translate-x-[5.5rem]',
    [POSITIONS.CENTER]: 'peer-checked:translate-x-0',
    [POSITIONS.RIGHT_CENTER]: 'peer-checked:translate-x-[5.5rem]',
    [POSITIONS.RIGHT]: 'peer-checked:translate-x-32',
}

const VERTICAL_SLOTS = {
    [POSITIONS.LEFT]: 'peer-checked:translate-y-0',
    [POSITIONS.LEFT_CENTER]: 'peer-checked:-translate-y-[5.25rem] foo',
    [POSITIONS.CENTER]: 'peer-checked:-translate-y-32',
    [POSITIONS.RIGHT_CENTER]: 'peer-checked:-translate-y-[5.25rem]',
    [POSITIONS.RIGHT]: 'peer-checked:translate-y-0',
}

const ORIGINS = {
    [POSITIONS.LEFT]: 'peer-checked:origin-right',
    [POSITIONS.LEFT_CENTER]: 'peer-checked:origin-bottom-left',
    [POSITIONS.CENTER]: 'peer-checked:origin-bottom',
    [POSITIONS.RIGHT_CENTER]: 'peer-checked:origin-bottom-right',
    [POSITIONS.RIGHT]: 'peer-checked:origin-left',
}

const DELAYS = {
    [POSITIONS.LEFT]: 'delay-0',
    [POSITIONS.LEFT_CENTER]: 'delay-75',
    [POSITIONS.CENTER]: 'delay-150',
    [POSITIONS.RIGHT_CENTER]: 'delay-75',
    [POSITIONS.RIGHT]: 'delay-0',
}

const ANIMATION_TIMING = 'ease-[cubic-bezier(.17,.89,.44,1.06)]'

export type OrbitalNavProps = {
    currentPath?: string
    setChecked: (b: boolean) => any
    checked: boolean
}

function getNavOption(currentPage: keyof NavOptions): Array<keyof NavOptions> {
    const data = NAV_OPTION_CONFIG[currentPage]
    if (!data) {
        throw Error('Cannot find...')
    }

    const { after, previous } = data

    return [
        NAV_OPTIONS.LEFT_PORTAL as keyof NavOptions,
        previous,
        currentPage,
        after,
        NAV_OPTIONS.RIGHT_PORTAL as keyof NavOptions,
    ]
}

const navItemClassNames = `${ANIMATION_TIMING} col-start-1 drop-shadow-[0px_0px_10px_#000] row-start-1 origin-center opacity-0 scale-0 peer-checked:opacity-100 transition-all peer-checked:scale-100 duration-500`

function generateNavFromNavOrder(
    order: Array<keyof NavOptions>,
    currentPage?: keyof NavOptions
) {
    return order.map((option, index) => {
        const data = NAV_OPTION_CONFIG[option]
        const position = NAV_DEFAULT_POSITION_KEY[index] as string

        const verticalConfig = VERTICAL_SLOTS[position] as string
        const horizontalConfig = HORIZONTAL_SLOTS[position] as string
        const origin = ORIGINS[position] as string
        const delay = DELAYS[position] as string
        const lowerCaseOption = option.toLocaleLowerCase()
        const highlight = currentPage == option

        const className = `${navItemClassNames} ${verticalConfig} ${horizontalConfig} ${origin} ${delay}`
        if (!data) {
            const id = `${position.toLowerCase()}-extra-nav`
            return (
                <section key={lowerCaseOption} id={id} className={className} />
            )
        } else {
            return (
                <NavItem
                    id={`${lowerCaseOption}`}
                    key={lowerCaseOption}
                    name={lowerCaseOption}
                    className={className}
                    highlight={highlight}
                />
            )
        }
    })
}

interface NavItemProps {
    id?: string
    name: string
    path?: string
    icon?: JSX.Element
    className?: string
    highlight: boolean
}

export function NavItem({
    name,
    path,
    className,
    icon,
    id,
    highlight,
}: NavItemProps) {
    const actualClassName = className || ''
    const actualPath = `${path || name}`
    const href = actualPath[0] == '/' ? actualPath : `/${actualPath}`
    return (
        <Link
            href={href}
            id={id}
            className={`${actualClassName} flex h-16 w-16 items-center justify-center rounded-full ${
                highlight ? 'bg-light' : 'bg-base'
            }`}
        >
            <div>
                <i className='text-center text-sm lowercase underline'>
                    {icon || <i>{name}</i>}
                </i>
            </div>
        </Link>
    )
}

NavItem.defaultProps = {
    highlight: false,
}

const POSTS_PATH = '/posts'
const ABOUT_PATH = '/about'
const RESUME_PATH = '/resume'

const DEFAULT_PATH_PAGE_MAPPING: { [x: string]: keyof NavOptions } = {
    [POSTS_PATH]: NAV_OPTIONS.POSTS as keyof NavOptions,
    [ABOUT_PATH]: NAV_OPTIONS.ABOUT as keyof NavOptions,
    [RESUME_PATH]: NAV_OPTIONS.RESUME as keyof NavOptions,
}

export function OrbitalNav({
    currentPath,
    setChecked,
    checked,
}: OrbitalNavProps) {
    const currentPage = currentPath
        ? DEFAULT_PATH_PAGE_MAPPING[currentPath]
        : undefined

    const navElements = generateNavFromNavOrder(
        NAV_DEFAULT_POSITION,
        currentPage
    )
    const eventHandler = (event: any) => {
        console.log({ event })
        event.stopPropagation()
        setChecked(!checked)
    }
    return (
        <span
            id='orbital-nav'
            className='group grid grid-cols-1 grid-rows-1 items-end justify-items-center'
        >
            <input
                onChange={() => {}}
                onClick={eventHandler}
                checked={checked}
                id='nav-bubble-check'
                type='checkbox'
                className='peer absolute z-30 col-start-1 row-start-1 h-16 w-16 cursor-pointer opacity-0'
            />
            <div
                className={`absolute z-[29] ${ANIMATION_TIMING} col-start-1 row-start-1 flex h-16 w-16 items-center justify-center rounded-full bg-base transition-transform duration-500 peer-checked:rotate-90 peer-checked:scale-75`}
            >
                <FaGripLines />
            </div>
            {navElements}
        </span>
    )
}
