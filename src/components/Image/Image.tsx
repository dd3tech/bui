/*
 * Copyright (c) DD360 and its affiliates.
 */

import React from 'react'
import { composeClasses } from 'lib/classes'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  rounded?: 'sm' | 'md' | 'lg'
  circle?: boolean
  width?: number
  height?: number
}

const Image = ({
  src,
  alt,
  className,
  rounded = 'lg',
  circle = false,
  width = 200,
  height = 200,
  ...props
}: ImageProps) => {
  return (
    <img
      src={src}
      style={{ height: `${height}px`, width: `${width}px` }}
      alt={alt || src}
      className={composeClasses(
        circle ? 'rounded-50' : `rounded-${rounded}`,
        className
      )}
      {...props}
    />
  )
}

Image.displayName = 'Image'

export default Image
