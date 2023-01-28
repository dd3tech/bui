import { useState, useCallback } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import BaseInput, { InputProps } from './BaseInput'

function PasswordInput(props: InputProps) {
    const [showText, setShowText] = useState(false)
    const onClick = useCallback(() => setShowText(!showText), [showText])

    return (
        <BaseInput
            {...props}
            type={showText ? 'text' : 'password'}
            endAdornment={
                <button type="button" role="showText" onClick={onClick}>
                    {showText ? <EyeIcon aria-label="eyeOn" width={23} /> : <EyeOffIcon aria-label="eyeOff" width={23} />}
                </button>
            }
        />
    )
}

export default PasswordInput
