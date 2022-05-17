import React from 'react'
interface ImageProps {
    src: string
    alt: string
    className?: string
    rounded?: 'sm' | 'lg' | 'md'
    circle?: boolean
    onClick?: (event: MouseEvent) => void
    width?: number
    height?: number
}

export const Image = ({ src, alt, className, rounded, circle, width, height, ...props }: ImageProps) => {
    return (
        <img
            src={src}
            style={{ height: `${height}px`, width: `${width}px` }}
            alt={alt ?? src}
            className={`${rounded ? `rounded-${rounded}` : ''} ${className ?? ''} ${circle && 'rounded-50'}`}
        />
    )
}
