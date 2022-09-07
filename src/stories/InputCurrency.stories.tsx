import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import InputCurrency, { InputCurrencyProps } from '../components/Form/InputCurrency'
import { format } from 'dd360-utils'

export default {
    title: 'Form/InputCurrency',
    component: InputCurrency
} as ComponentMeta<typeof InputCurrency>

const Template: Story<InputCurrencyProps> = (args: InputCurrencyProps) => {
    const [value, setValue] = React.useState(format('32500'))

    return <InputCurrency value={value} onChangeCurrency={(n) => setValue(n)} {...args} />
}

export const Default = Template.bind({})
Default.args = {
    className: 'mt-2',
    useSymbol: true,
    helperText: 'Su saldo se guardó exitosamente!'
}
