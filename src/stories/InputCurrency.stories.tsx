import React from 'react'
import { ComponentMeta } from '@storybook/react'
import InputCurrency from '../components/Form/InputCurrency'
import { format } from 'dd360-utils'

export default {
    title: 'Form/InputCurrency'
} as ComponentMeta<typeof InputCurrency>

export const Default = () => {
    const [values, setValues] = React.useState({
        currency: format('32500'),
        withoutSymbol: format('4200000.32').replace(/[$]/g, ''),
        error: format('752500'),
        succes: format('39800')
    })

    function changeValue(name: string, value: string) {
        setValues({ ...values, [name]: value })
    }

    const onChangeValue = {
        changeCurrency: (n: string) => changeValue('currency', n),
        changeSymbol: (n: string) => changeValue('withoutSymbol', n),
        changeError: (n: string) => changeValue('error', n),
        changeSuccess: (n: string) => changeValue('succes', n)
    }

    return (
        <>
            <div className="my-20 px-8 grid grid-cols-3 gap-20 justify-20 container mx-auto">
                <div className="w-72">
                    <h2 className="text-xl font-bold">Input Currency</h2>
                    <InputCurrency
                        className="mt-2"
                        value={values.currency}
                        onChangeCurrency={onChangeValue.changeCurrency}
                        useSymbol
                        helperText="Este es el helperText"
                    />
                </div>

                <div className="w-72">
                    <h2 className="text-xl font-bold">Without helperText</h2>
                    <InputCurrency value={values.currency} />
                </div>

                <div className="w-72">
                    <h2 className="text-xl font-bold">Without Symbol</h2>
                    <InputCurrency className="mt-2" value={values.withoutSymbol} onChangeCurrency={onChangeValue.changeSymbol} helperText="Sin symbol" />
                </div>

                <div className="w-72">
                    <h2 className="text-xl font-bold">Error</h2>
                    <InputCurrency
                        className="mt-2"
                        error
                        onChangeCurrency={onChangeValue.changeError}
                        value={values.error}
                        useSymbol
                        helperText="Oops! Hubo un error"
                    />
                </div>

                <div className="w-72">
                    <h2 className="text-xl font-bold">Success</h2>
                    <InputCurrency
                        className="mt-2"
                        success
                        value={values.succes}
                        onChangeCurrency={onChangeValue.changeSuccess}
                        useSymbol
                        helperText="Su saldo se guardó exitosamente!"
                    />
                </div>
            </div>
        </>
    )
}
