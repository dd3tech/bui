import { forwardRef, FC, ReactNode } from 'react'

export type BtnPosition = 'horizontal' | 'vertical'

export interface ButtonGroupProps {
    children: ReactNode
    orientation?: BtnPosition
    gap?: number
    align?: 'center' | 'start' | 'end'
    className?: string
}

const getStyleBtnGroup = ({ orientation }: { orientation: BtnPosition }) => {
    if (orientation === 'vertical') {
        return {
            styleBtnGroup: 'flex flex-col'
        }
    }

    return {
        styleBtnGroup: 'flex flex-row'
    }
}

const ButtonGroup: FC<ButtonGroupProps> = forwardRef<HTMLDivElement, ButtonGroupProps>((btnGroupProps: ButtonGroupProps, ref) => {
    const { children, orientation = 'vertical', gap = 6, align, className, ...otherProps } = btnGroupProps

    const { styleBtnGroup } = getStyleBtnGroup({ orientation })

    return (
        <div className={`${styleBtnGroup} justify-${align} ${className ?? ''}`} style={{ gap: gap }} ref={ref} {...otherProps}>
            {children}
        </div>
    )
})

ButtonGroup.displayName = 'ButtonGroup'
ButtonGroup.defaultProps = {
    align: 'start',
    orientation: 'vertical',
    gap: 6,
    className: undefined
}

export default ButtonGroup
