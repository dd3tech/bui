import React, { DetailedHTMLProps, FC, forwardRef, HTMLAttributes, LegacyRef } from 'react'
import { format } from 'dd360-utils'

export interface TextProps extends DetailedHTMLProps<HTMLAttributes<any>, any> {
    children?: React.ReactNode
    className?: string
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small' | 'label' | 'a' | 'currency' | 'anchorSmall'
    align?: 'center' | 'left' | 'right' | 'justify'
    bold?: boolean
    fontBold?: 'bold' | 'medium'
    textColor?: string
    size?: '9xl' | '8xl' | '7xl' | '6xl' | '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base' | 'sm' | 'xs'
    textMuted?: boolean
    textMuted500?: boolean
    href?: string
    target?: string
    style?: any
    onClick?: () => void
    onBlur?: () => void
}

const getComponent = (props: TextProps, ref: LegacyRef<any>): JSX.Element => {
    switch (props.variant) {
        case 'h1':
            return <h1 {...props} ref={ref} />
        case 'h2':
            return <h2 {...props} ref={ref} />
        case 'h3':
            return <h3 {...props} ref={ref} />
        case 'h4':
            return <h4 {...props} ref={ref} />
        case 'h5':
            return <h5 {...props} ref={ref} />
        case 'h6':
            return <h6 {...props} ref={ref} />
        case 'p':
            return <p {...props} ref={ref} />
        case 'span':
            return <span {...props} ref={ref} />
        case 'small':
            return <small {...props} ref={ref} />

        case 'label':
            return <label {...props} ref={ref} />

        case 'a':
            return <a {...props} ref={ref} />
        case 'currency':
            return (
                <p {...props} ref={ref}>
                    {format(props.children)}
                </p>
            )
        case 'anchorSmall':
            return <a className={`text-xs ${props.className}`} {...props} ref={ref} />
        default:
            return <p {...props} ref={ref} />
    }
}

const getStyles = (props: TextProps) => {
    let style = ' '
    if (props.className) {
        style += props.className + ' '
    }
    if (props.align) {
        style += `text-${props.align} `
    }
    if (props.bold) {
        style += 'font-bold' + ' '
    }
    if (props.fontBold) {
        style += `font-${props.fontBold} `
    }
    if (props.textColor) {
        style += props.textColor + ' '
    }
    if (props.textMuted) {
        style += 'text-muted '
    }
    if (props.textMuted500) {
        style += 'text-gray-500 '
    }
    if (props.size) {
        style += `text-${props.size} `
    }
    if (props.variant && !props.size) {
        if (props.variant === 'h1') style += `text-4xl`
        else if (props.variant === 'h2') style += `text-3xl`
        else if (props.variant === 'h3') style += `text-2xl`
        else if (props.variant === 'h4') style += `text-xl`
        else if (props.variant === 'h5') style += `text-lg`
        else if (props.variant === 'h6') style += `text-base`
    }
    return style
}

const Text: FC<TextProps> = forwardRef<HTMLElement, TextProps>((textProps: TextProps, ref) => {
    const { ...props } = textProps
    props.className += `${getStyles(props)} `
    const renderTextComponent = () => getComponent(props, ref)

    return renderTextComponent()
})

Text.displayName = 'Text'
Text.defaultProps = {
    children: 'This is a children',
    className: undefined,
    variant: 'h1',
    align: 'center',
    bold: false,
    fontBold: undefined,
    textColor: undefined,
    textMuted: false,
    textMuted500: false,
    href: undefined,
    target: '__blank'
}

export default Text
