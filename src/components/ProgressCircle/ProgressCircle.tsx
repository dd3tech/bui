import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    colorComplete?: string
    colorProgress?: string
    colorBackground?: string
    strokeWidth?: number
    children?: React.ReactNode
    classNamePercentage?: string
    width?: number
}

const ProgressCircle = ({ value, colorComplete, colorProgress, colorBackground, strokeWidth, children, classNamePercentage, width }: ProgressCircleProps) => {
    return (
        <>
            <div style={{ width }} role="container-circular-progress">
                <CircularProgressbarWithChildren
                    styles={buildStyles({
                        pathColor: value < 100 ? colorProgress : colorComplete,
                        trailColor: colorBackground
                    })}
                    strokeWidth={strokeWidth}
                    value={value}
                >
                    <div className={classNamePercentage}>{Math.min(value, 100).toFixed(0)}%</div>
                    <div role="children-progress-circle">{children}</div>
                </CircularProgressbarWithChildren>
            </div>
        </>
    )
}

ProgressCircle.displayName = 'ProgressCircle'
ProgressCircle.defaultProps = {
    colorComplete: '#34D399',
    colorProgress: '#1D4ED8',
    colorBackground: '#DBEAFE',
    value: 100,
    strokeWidth: 11,
    classNamePercentage: 'w-full text-center text-3xl',
    width: 200,
    children: <p>Completado</p>
}

export default ProgressCircle
