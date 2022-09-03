import { forwardRef } from 'react'

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    children?: React.ReactNode
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(({ children, src, alt, className, ...props }: AvatarProps, ref) => {
    if (children) {
        return (
            <div role="avatar" ref={ref} className={`${className ?? ''} rounded-full flex items-center justify-center`} {...props}>
                {children}
            </div>
        )
    }

    return <img src={src} ref={ref} role="avatar" alt={alt} {...props} className={`${className ?? ''} rounded-full`} />
})

Avatar.displayName = 'Avatar'
Avatar.defaultProps = {
    children: undefined,
    src: undefined,
    alt: undefined,
    className: undefined
}

export default Avatar
