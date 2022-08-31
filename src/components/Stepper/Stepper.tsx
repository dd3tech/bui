import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    phase: number
    totalPhases: number
    width?: string
    height?: string
    fontSize?: string
    textColor?: string
    strokeWidth?: number
    strokeColor?: string
    text?: string
    classNameContainer?: string
    classNameCircularProgress?: string
}

function Stepper({ phase, totalPhases, width, height, ...props }: StepperProps) {
    const valuePercentage = React.useCallback(() => {
        return Math.round((100 / totalPhases) * phase)
    }, [totalPhases, phase])

    return (
        <div style={{ width, height }} className={props.classNameContainer ?? ''}>
            <CircularProgressbar
                className={props.classNameCircularProgress ?? ''}
                styles={{
                    text: {
                        fill: props.textColor ?? '#1d4ed8',
                        fontSize: props.fontSize ?? ''
                    },
                    path: {
                        stroke: props.strokeColor ?? '#1d4ed8'
                    }
                }}
                strokeWidth={props.strokeWidth}
                value={valuePercentage()}
                text={props.text ?? `${phase}/${totalPhases}`}
            />
        </div>
    )
}

export default Stepper
