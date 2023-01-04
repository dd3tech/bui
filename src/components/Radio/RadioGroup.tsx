import React from 'react'
import Text from '../Typography'
import { IRadio } from '..'

export interface IRadioGroup {
    title?: string
    row?: boolean
    children: React.ReactNode
    name?: string
    value: string
    className?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function RadioGroup({ title, row, children, name, value, className, onChange }: IRadioGroup) {
    return (
        <div className={`flex flex-col ${className ?? ''}`}>
            {title && (
                <Text role="title" className="text-base mb-5 text-gray-500">
                    {title}
                </Text>
            )}
            <div role="radio-group" className={`flex ${row ? 'flex-row' : 'flex-col'}`}>
                {React.Children.map(children, (child) => {
                    if (!React.isValidElement<IRadio>(child)) {
                        return child
                    }

                    return React.cloneElement<IRadio>(child, {
                        name: name ? name : 'default-radio-buttons-group',
                        checked: child.props.value === value,
                        className: child.props.className?.length ? child.props.className : 'mr-8',
                        onChange
                    })
                })}
            </div>
        </div>
    )
}

export default RadioGroup
