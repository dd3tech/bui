import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import InputCurrency, { InputCurrencyProps } from '../components/Form/InputCurrency'
import { format } from 'dd360-utils'

export default {
    title: 'Form/InputCurrency',
    component: InputCurrency
} as ComponentMeta<typeof InputCurrency>

const Template: Story<InputCurrencyProps> = (args: InputCurrencyProps) => {
    const [value, setValue] = React.useState<string | undefined>('0')

    return <InputCurrency value={value} onChange={(value) => setValue(value)} {...args} />
}

export const Default = Template.bind({})
Default.args = {
    className: 'mt-2 w-full',
    prefix: '$',
    decimalScale: 2
}
