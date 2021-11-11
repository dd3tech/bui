interface ImageIconProps {
    src: string
    className?: string
    alt?: string
    onClick?: (event: MouseEvent) => void
    button?: boolean
    buttonOnClick?: (event: any) => void
    classNameButton?: string
}

export const ImageIcon = ({ src, className, alt, button, buttonOnClick, classNameButton }: ImageIconProps) => {
    if (button) {
        return (
            <button className={`${classNameButton ?? ''} flex text-sm rounded-full`} onClick={buttonOnClick}>
                <img className="h-8 w-8 rounded-full" src={src} alt={alt ?? src} />
            </button>
        )
    } else {
        return <img className={`${className ?? ''} h-8 w-8 rounded-full`} src={src} alt={alt ?? src} />
    }
}
