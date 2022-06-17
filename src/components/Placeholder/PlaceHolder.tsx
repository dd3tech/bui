import React from 'react'
import './placeholder.css'

interface PlaceHolderProps {
    size?: 'small' | 'medium' | 'large'
    backgroundColor?: string
    className?: string
}

export const PlaceHolder = ({ size = 'large', backgroundColor, className, ...props }: PlaceHolderProps) => {
    const sizeClass = size ? `storybook-placeholder-${size}` : ''
    return <span className={`${className ?? ''} ${sizeClass} storybook-placeholder`} style={{ backgroundColor }} {...props}></span>
}
