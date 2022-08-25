export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    children?: React.ReactNode
}

export function Avatar({ src, alt, className, children, ...props }: AvatarProps) {
    if (children) {
        return (
            <div role="avatar" className={`${className ?? ''} rounded-full flex items-center justify-center`} {...props}>
                {children}
            </div>
        )
    }

    return <img src={src} role="avatar" alt={alt} {...props} className={`${className ?? ''} rounded-full`} />
}
