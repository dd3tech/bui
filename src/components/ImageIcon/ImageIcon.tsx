/*
 * Copyright (c) DD360 and its affiliates.
 */

import React from 'react'
import { composeClasses } from 'lib/classes'

export interface ImageIconProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  button?: boolean
  buttonOnClick?: (event: any) => void
  classNameButton?: string
}

const ImageIcon = ({
  src,
  className,
  alt,
  button,
  buttonOnClick,
  classNameButton,
  ...props
}: ImageIconProps) => {
  if (button) {
    return (
      <button
        className={composeClasses('flex text-sm rounded-full', classNameButton)}
        onClick={buttonOnClick}
      >
        <img
          className="h-8 w-8 rounded-full"
          src={src}
          alt={alt ?? src}
          {...props}
        />
      </button>
    )
  }

  return (
    <img
      className={composeClasses('h-8 w-8 rounded-full', className)}
      src={src}
      alt={alt ?? src}
      {...props}
    />
  )
}

ImageIcon.displayName = 'ImageIcon'

export default ImageIcon
