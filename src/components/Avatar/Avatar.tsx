import { forwardRef } from 'react'
import { composeClasses } from 'lib'

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    children?: React.ReactNode
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(({ children, src, alt, className, ...props }: AvatarProps, ref) => {
    if (children) {
        return (
            <div role="avatar" ref={ref} className={composeClasses(className, 'rounded-full', 'justify-center', 'flex', 'items-center')} {...props}>
                {children}
            </div>
        )
    }

    return <img src={src} ref={ref} role="avatar" alt={alt} {...props} className={composeClasses(className, 'rounded-full')} />
})

Avatar.displayName = 'Avatar'
Avatar.defaultProps = {
    children: undefined,
    src: undefined,
    alt: undefined,
    className: undefined
}

export default Avatar
