import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import InputCurrency, { InputCurrencyProps } from '../components/Form/InputCurrency'

export default {
    title: 'Form/InputCurrency',
    component: InputCurrency
} as ComponentMeta<typeof InputCurrency>

const Template: Story<InputCurrencyProps> = (args: InputCurrencyProps) => {
    const [value, setValue] = React.useState<string | undefined>()

    return <InputCurrency prefix="$" value={value} defaultValue={0} decimalScale={2} decimalsLimit={0} onChange={(value) => setValue(value)} {...args} />
}

export const Default = Template.bind({})
Default.args = {
    onBlurInput: () => console.log('ON BLUR 123')
}
