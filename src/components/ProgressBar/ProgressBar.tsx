import { forwardRef } from 'react'
import { composeClasses } from 'lib/classes'
import './progressbar.css'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    max?: number
    backgroundColor?: string
    className?: string
    label?: string
    animated?: boolean
    height?: string
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ value, max, backgroundColor, height, className, label, animated, ...props }: ProgressBarProps, ref) => {
        return (
            <div className="storybook-progress h-auto" style={{ height }} {...props} ref={ref}>
                <div
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                    className={composeClasses(
                        'storybook-progress-bar',
                        animated && 'storybook-progress-bar-animated storybook-progress-bar-animated',
                        className
                    )}
                    style={{ backgroundColor, width: `${value}%` }}
                >
                    {value && value > 5 && label && label}
                </div>
            </div>
        )
    }
)

ProgressBar.displayName = 'ProgressBar'
ProgressBar.defaultProps = {
    value: 50,
    max: 100,
    backgroundColor: '#1d4ed8',
    className: undefined,
    label: undefined,
    height: '1rem',
    animated: false
}

export default ProgressBar
