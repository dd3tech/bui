import React from 'react'
import { composeClasses } from 'lib/classes'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    rounded?: 'sm' | 'md' | 'lg'
    circle?: boolean
    width?: number
    height?: number
}

const Image = ({ src, alt, className, rounded, circle, width, height, ...props }: ImageProps) => {
    return (
        <img
            src={src}
            style={{ height: `${height}px`, width: `${width}px` }}
            alt={alt || src}
            className={composeClasses(circle ? 'rounded-50' : `rounded-${rounded}`, className)}
            {...props}
        />
    )
}

Image.displayName = 'Image'
Image.defaultProps = {
    rounded: 'lg',
    circle: false,
    width: 200,
    height: 200
}

export default Image
