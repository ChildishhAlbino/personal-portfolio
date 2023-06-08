import LayoutComponents from './layouts'
import { Letters } from './spread-letters'

export function mergeWithDefaultHtmlOverrides(components: object) {
    return {
        ...components,
        code: (props: any) => {
            const children = props.children
            return (
                <span className={'not-prose'}>
                    <code {...props.children.props}>{children}</code>
                </span>
            )
        },
        pre: (props: any) => {
            const children = props.children
            const classNames = `${children.props.className} not-prose`
            const realProps = {
                ...children.props,
                className: classNames,
            }
            return <pre {...realProps}>{children}</pre>
        },
    }
}

const components = {
    ...LayoutComponents,
    Letters,
}

export default components
