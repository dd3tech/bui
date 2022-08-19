import './progressbar.css'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    max?: number
    backgroundColor?: string
    className?: string
    label?: string
    animated?: boolean
}

export function ProgressBar({ value = 50, max = 100, backgroundColor, className, label, animated, ...props }: ProgressBarProps) {
    return (
        <div className="storybook-progress">
            <div
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                className={`storybook-progress-bar ${className ?? ''} ${animated ? 'storybook-progress-bar-animated storybook-progress-bar-animated' : ''}`}
                style={{ backgroundColor, width: `${value}%` }}
                {...props}
            >
                {value > 5 && label && label}
            </div>
        </div>
    )
}
