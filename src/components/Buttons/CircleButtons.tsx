import React from 'react'
import DynamicHeroIcon, { IconName } from '../DynamicHeroIcon'

interface BaseCircleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconName: IconName
    disabled?: boolean
    selected?: boolean
    width?: string
    height: string
    shadow?: 'sm' | 'md' | 'lg' | 'xl'
    variant?: 'square' | 'circle'
    iconProperties?: { width?: string; height?: string; padding?: string }
}

export type WithoutTypeButtonProps = Omit<BaseCircleButtonProps, 'variant'>

const globalStyles = {
    default: 'text-blue-700 hover:bg-gray-50',
    selected: 'bg-blue-700 text-white',
    disabled: 'text-gray-300'
}

const defaultIconProperties = {
    width: '2.5rem',
    height: '2.5rem',
    padding: '0.5rem'
}

const buildClassName = (disabled?: boolean, selected?: boolean) => {
    if (disabled) {
        return globalStyles.disabled
    }

    return selected ? globalStyles.selected : globalStyles.default
}

export function BaseCircleButton({
    iconName = 'HomeIcon',
    width = '3rem',
    height = '3rem',
    disabled,
    selected,
    shadow = 'sm',
    iconProperties = defaultIconProperties,
    variant = 'circle',
    ...props
}: BaseCircleButtonProps) {
    if (disabled && selected) {
        throw new Error('You cannot have these two properties activated simultaneously')
    }

    return (
        <button
            style={{ ...props.style, width, height }}
            className={`border border-gray-300 flex items-center justify-center ${
                variant === 'circle' ? 'rounded-full' : 'rounded-lg '
            } shadow-${shadow} ${buildClassName(disabled, selected)}`}
        >
            <DynamicHeroIcon
                icon={iconName}
                style={{ padding: iconProperties.padding }}
                height={iconProperties.height}
                width={iconProperties.width}
                className={`w-10 p-2 `}
            />
        </button>
    )
}

export function SquareButton({ ...props }: WithoutTypeButtonProps) {
    return <BaseCircleButton variant="square" {...props} />
}

export function CircleButton({ ...props }: WithoutTypeButtonProps) {
    return <BaseCircleButton variant="circle" {...props} />
}
