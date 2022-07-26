import React from 'react'

interface TextProps {
    children: React.ReactNode
    className?: string
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small' | 'label' | 'a'
    align?: 'center' | 'left' | 'right' | 'justify'
    bold?: boolean
    fontBold?: 'bold' | 'medium'
    textColor?: string
    textMuted?: boolean
    textMuted500?: boolean
    href?: string
    target?: string
}

export const Text = ({ children, className, align, variant, bold, fontBold, textColor, textMuted, textMuted500, ...props }: TextProps) => {
    const choiseStyle = () => {
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
    }

    switch (variant) {
        case 'h1':
            return (
                <h1 className={choiseStyle()} {...props}>
                    {children}
                </h1>
            )
        case 'h2':
            return (
                <h2 className={choiseStyle()} {...props}>
                    {children}
                </h2>
            )
        case 'h3':
            return (
                <h3 className={choiseStyle()} {...props}>
                    {children}
                </h3>
            )
        case 'h4':
            return (
                <h4 className={choiseStyle()} {...props}>
                    {children}
                </h4>
            )
        case 'h5':
            return (
                <h5 className={choiseStyle()} {...props}>
                    {children}
                </h5>
            )
        case 'h6':
            return (
                <h6 className={choiseStyle()} {...props}>
                    {children}
                </h6>
            )
        case 'p':
            return (
                <p className={choiseStyle()} {...props}>
                    {children}
                </p>
            )
        case 'span':
            return (
                <span className={choiseStyle()} {...props}>
                    {children}
                </span>
            )
        case 'small':
            return (
                <small className={choiseStyle()} {...props}>
                    {children}
                </small>
            )

        case 'label':
            return (
                <label className={choiseStyle()} {...props}>
                    {children}
                </label>
            )

        case 'a':
            return (
                <a className={choiseStyle()} {...props}>
                    {children}
                </a>
            )
        default:
            return (
                <p className={choiseStyle()} {...props}>
                    {children}
                </p>
            )
    }
}
