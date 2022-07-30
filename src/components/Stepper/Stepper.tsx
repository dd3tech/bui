import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface StepperProps {
    phase: number
    totalPhases: number
    width?: string
    height?: string
    fontSize?: string
    textColor?: string
    strokeWidth?: number
    strokeColor?: string
    text?: string
}

export const Stepper = ({ phase, totalPhases, width, height, ...props }: StepperProps) => {
    const valuePercentage = Math.round((100 / totalPhases) * phase)

    return (
        <div style={{ width, height }}>
            <CircularProgressbar
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
                value={valuePercentage}
                text={props.text ?? `${phase}/${totalPhases}`}
            />
        </div>
    )
}
