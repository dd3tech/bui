import { HiOutlineTag, HiExclamation, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiClipboardCopy } from 'react-icons/hi'

interface IBadgeProps {
    text?: string
    className?: string
    variant: 'warning' | 'infoPrimary' | 'infoSecondary' | 'success' | 'primary' | 'secondary' | 'error'
    classNameIcon?: string
    icon?: string
}

const badgeVariants: { [key: string]: string } = {
    warning: 'bg-yellow-100 border border-yellow-500 text-gray-500',
    infoPrimary: 'bg-blue-50 border border-blue-300 text-gray-500',
    infoSecondary: 'bg-transparent border border-blue-300 text-gray-500',
    success: 'bg-green-50 border border-green-300 text-gray-500 font-medium',
    primary: 'bg-transparent border border-blue-700 text-blue-700',
    secondary: 'bg-transparent border border-white  text-white  hover:bg-gray-50 hover:text-black',
    error: 'bg-red-50 border border-red-300 text-gray-500 font-medium'
}

const iconsSwitch = (iconType?: string, classNameIcon?: string) => {
    switch (iconType) {
        case 'tag':
            return <HiOutlineTag className={classNameIcon ?? ''} />
        case 'warning':
            return <HiExclamation className={classNameIcon ?? ''} />
        case 'check':
            return <HiOutlineCheckCircle className={classNameIcon ?? ''} />
        case 'success':
            return <HiOutlineCheckCircle className={classNameIcon ?? ''} />
        case 'exclamation':
            return <HiOutlineExclamationCircle className={classNameIcon ?? ''} />
        case 'clipboard-copy':
            return <HiClipboardCopy className={classNameIcon ?? ''} />
        default:
            return ''
    }
}

export const Badge = ({ text, className, variant, classNameIcon, icon }: IBadgeProps) => {
    const classNameByVariant = badgeVariants[variant] || ''

    return (
        <div className={`${className ?? ''} ${classNameByVariant} rounded-full flex items-center gap-1 text-xs ${icon ? '' : 'justify-center'}`}>
            {iconsSwitch(icon, classNameIcon)} <small>{text ?? ''}</small>
        </div>
    )
}
