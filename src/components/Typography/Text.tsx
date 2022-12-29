import React, { DetailedHTMLProps, FC, forwardRef, HTMLAttributes, LegacyRef } from 'react'
import { format } from 'dd360-utils'

export type TextSizeType = '9xl' | '8xl' | '7xl' | '6xl' | '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base' | 'sm' | 'xs'

type TResponsiveText = {
    sm?: TextSizeType | number
    md?: TextSizeType | number
    lg?: TextSizeType | number
    xl?: TextSizeType | number
    '2xl'?: TextSizeType | number
}

export interface TextProps extends DetailedHTMLProps<HTMLAttributes<any>, any> {
    children?: React.ReactNode
    className?: string
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small' | 'label' | 'a' | 'currency' | 'anchorSmall'
    align?: 'center' | 'left' | 'right' | 'justify'
    bold?: boolean
    fontBold?: 'bold' | 'medium'
    textColor?: string
    size?: TextSizeType | number | TResponsiveText
    textMuted?: boolean
    textMuted500?: boolean
    href?: string
    target?: string
    style?: any
    onClick?: () => void
    onBlur?: () => void
}

/**
 * It takes in a variant prop and returns a component based on the variant
 * @param {TextProps} props - TextProps - this is the props that are passed to the component
 * @param ref - LegacyRef<any>
 * @returns A function that returns a JSX.Element
 */
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
            return <span {...props} ref={ref} />
    }
}

/**
 * It returns a string that represents the font size of the text
 * @param variant - The variant of the text.
 * @returns A string
 */
const getFontSize = (variant: TextProps['variant']) => {
    if (variant === 'h1') return 'text-4xl'
    if (variant === 'h2') return 'text-3xl'
    if (variant === 'h3') return 'text-2xl'
    if (variant === 'h4') return 'text-xl'
    if (variant === 'h5') return 'text-lg'
    if (variant === 'h6') return 'text-base'
    if (variant === 'p' || variant === 'span') return 'text-sm'
    if (variant === 'small' || variant === 'a') return 'text-xs'

    return 'text-sm'
}

/**
 * It takes in a TextProps object, and returns a string of className
 * @param {TextProps} props - TextProps
 * @returns A string of className
 */
const getStyles = (props: TextProps) => {
    if (props.className?.length !== 0) {
        props.className += ' '
    }

    if (props.align) {
        props.className += `text-${props.align} `
    }
    if (props.bold) {
        props.className += 'font-bold' + ' '
    }
    if (props.fontBold) {
        props.className += `font-${props.fontBold} `
    }
    if (props.textColor) {
        props.className += props.textColor + ' '
    }
    if (props.textMuted) {
        props.className += 'text-gray-300 '
    }
    if (props.textMuted500) {
        props.className += 'text-gray-500 '
    }
    if (props.size) {
        if (typeof props.size === 'object') {
            let sizes = ''
            Object.keys(props.size).forEach((item: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
                const typedSize = props?.size as TResponsiveText
                const value = typedSize[item]
                const classSize = typeof value === 'number' ? `text-[${value}px]` : `text-${value}`
                sizes += `${item === 'sm' ? '' : item}${item === 'sm' ? '' : ':'}${classSize} `
            })
            props.className += sizes
        } else if (typeof props.size === 'number') {
            props.className += `text-[${props.size}px] `
        } else {
            props.className += `text-${props.size} `
        }
    }

    if (props.variant && !props.size) {
        props.className += `${getFontSize(props.variant)}`
    }

    return props.className
}

/**
 * It removes the props that are not needed for the `<Text>` component
 * @param {TextProps} props - TextProps - This is the props that are passed to the component.
 */
const rmvUnnecesaryProps = (props: TextProps) => {
    delete props.align
    delete props.bold
    delete props.fontBold
    delete props.textColor
    delete props.textMuted
    delete props.textMuted500
}

const Text: FC<TextProps> = forwardRef<HTMLElement, TextProps>((textProps: TextProps, ref) => {
    const { ...props } = textProps

    props.className = getStyles(props)

    const renderTextComponent = () => {
        rmvUnnecesaryProps(props)
        return getComponent(props, ref)
    }

    return renderTextComponent()
})

Text.displayName = 'Text'
Text.defaultProps = {
    children: 'This is a children',
    variant: undefined,
    size: undefined,
    align: undefined,
    bold: false,
    className: undefined,
    fontBold: undefined,
    textColor: undefined,
    textMuted: false,
    textMuted500: false,
    href: undefined,
    target: undefined
}

export default Text
