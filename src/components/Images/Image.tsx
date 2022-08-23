import React from 'react'
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    rounded?: 'sm' | 'lg' | 'md'
    circle?: boolean
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
            {...props}
        />
    )
}
