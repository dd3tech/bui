import { forwardRef } from 'react'
import './progressbar.css'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    max?: number
    backgroundColor?: string
    className?: string
    label?: string
    animated?: boolean
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>((props: ProgressBarProps, ref) => {
    const { value, max, backgroundColor, className, label, animated } = props

    return (
        <div className="storybook-progress">
            <div
                ref={ref}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                className={`storybook-progress-bar ${className ?? ''} ${animated ? 'storybook-progress-bar-animated storybook-progress-bar-animated' : ''}`}
                style={{ backgroundColor, width: `${value}%` }}
                {...props}
            >
                {value && value > 5 && label && label}
            </div>
        </div>
    )
})

ProgressBar.displayName = 'ProgressBar'
ProgressBar.defaultProps = {
    value: 50,
    max: 100,
    backgroundColor: 'red',
    className: undefined,
    label: undefined,
    animated: false
}

export default ProgressBar
