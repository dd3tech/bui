import { cloneElement } from 'react'

interface Props {
    label: string
    control: JSX.Element
    labelPlacement?: 'start' | 'top' | 'bottom' | 'end'
    disabled?: boolean
}

const directionLabel = {
    start: 'flex-row-reverse',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
    end: ''
}

function FormControlLabel({ label, control, labelPlacement = 'start', disabled }: Props) {
    return (
        <label
            style={{ color: disabled ? 'rgba(0, 0, 0, 0.38)' : undefined }}
            className={`inline-flex mx-4 items-center align-middle cursor-pointer ${directionLabel[labelPlacement]}`}
        >
            {cloneElement(control, { disabled })}
            <span>{label}</span>
        </label>
    )
}

export default FormControlLabel
