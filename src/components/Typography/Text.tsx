import { format } from 'dd360-utils'
import React from 'react'

export interface TextProps {
    children?: React.ReactNode
    className?: string
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small' | 'label' | 'a' | 'currency'
    align?: 'center' | 'left' | 'right' | 'justify'
    bold?: boolean
    fontBold?: 'bold' | 'medium'
    textColor?: string
    textMuted?: boolean
    textMuted500?: boolean
    href?: string
    target?: string
}

const Text = ({ children, className, align, variant, bold, fontBold, textColor, textMuted, textMuted500, ...props }: TextProps) => {
    const chooseStyle = React.useCallback(() => {
        let style = ' '

        if (className) {
            style += className + ' '
        }

        if (align) {
            style += `text-${align} `
        }

        if (bold) {
            style += 'font-bold' + ' '
        }

        if (fontBold) {
            style += `font-${fontBold} `
        }

        if (textColor) {
            style += textColor + ' '
        }

        if (textMuted) {
            style += 'text-muted '
        }

        if (textMuted500) {
            style += 'text-gray-500 '
        }

        return style
    }, [className, align, bold, fontBold, textColor, textMuted, textMuted500])

    switch (variant) {
        case 'h1':
            return (
                <h1 className={chooseStyle()} {...props}>
                    {children}
                </h1>
            )
        case 'h2':
            return (
                <h2 className={chooseStyle()} {...props}>
                    {children}
                </h2>
            )
        case 'h3':
            return (
                <h3 className={chooseStyle()} {...props}>
                    {children}
                </h3>
            )
        case 'h4':
            return (
                <h4 className={chooseStyle()} {...props}>
                    {children}
                </h4>
            )
        case 'h5':
            return (
                <h5 className={chooseStyle()} {...props}>
                    {children}
                </h5>
            )
        case 'h6':
            return (
                <h6 className={chooseStyle()} {...props}>
                    {children}
                </h6>
            )
        case 'p':
            return (
                <p className={chooseStyle()} {...props}>
                    {children}
                </p>
            )
        case 'span':
            return (
                <span className={chooseStyle()} {...props}>
                    {children}
                </span>
            )
        case 'small':
            return (
                <small className={chooseStyle()} {...props}>
                    {children}
                </small>
            )

        case 'label':
            return (
                <label className={chooseStyle()} {...props}>
                    {children}
                </label>
            )

        case 'a':
            return (
                <a className={chooseStyle()} {...props}>
                    {children}
                </a>
            )
        case 'currency':
            return (
                <p className={chooseStyle()} {...props}>
                    {format(children)}
                </p>
            )
        default:
            return (
                <p className={chooseStyle()} {...props}>
                    {children}
                </p>
            )
    }
}

export default Text
