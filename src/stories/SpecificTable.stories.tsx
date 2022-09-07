import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ITopHeader, IHeader } from '../interfaces/SpecificTable'
import exampleJSON from '../../assets/table-value.json'
import SpecificTableComponent from '../components/Table/SpecificTable'

export default {
    title: 'Components/Table',
    component: SpecificTableComponent
} as ComponentMeta<typeof SpecificTableComponent>

const Template: ComponentStory<typeof SpecificTableComponent> = (args) => <SpecificTableComponent {...args} />

const topHeader: ITopHeader[] = [
    {
        children: <div className="pl-6">Crédito</div>
    },
    {
        colSpan: 4,
        children: (
            <div className="pl-4 flex gap-4 items-center">
                Estructura
                <ArrowLeftIcon className="h-5 w-5" />
            </div>
        )
    },
    {
        colSpan: 13,
        children: <div className="pl-4">Valores y detalles</div>
    }
]
const header: IHeader[] = [
    {
        title: 'Credito',
        key: 'credit',
        className: 'pl-6 w-28 2xl:w-auto'
    },
    {
        title: 'Fraccionamiento',
        key: 'division',
        className: 'pl-4 w-44 2xl:w-auto'
    },
    {
        title: 'Fraccionamiento',
        key: 'street',
        className: 'pl-4 w-40 2xl:w-auto'
    },
    {
        title: 'No',
        key: 'number',
        className: 'pl-4 w-12 2xl:w-auto'
    },
    {
        title: 'Int',
        key: 'inside',
        className: 'pl-4 w-12 2xl:w-auto'
    },
    {
        title: 'Prototipo',
        key: 'prototype',
        className: 'pl-4 w-20 2xl:w-auto'
    },
    {
        title: 'Sup. Terreno',
        key: 'supTerrain',
        className: 'pl-4 w-28 2xl:w-auto'
    },
    {
        title: 'Sup. Construida',
        key: 'supBuilding',
        className: 'pl-4 w-32 2xl:w-auto'
    },
    {
        title: 'Val. Fisico',
        key: 'physicalValue',
        withCurrencyFormat: true,
        className: 'pl-4 w-28 2xl:w-auto'
    },
    {
        title: 'Val. Comercial',
        key: 'commercialValue',
        withCurrencyFormat: true,
        className: 'pl-4 w-28 2xl:w-auto'
    },
    {
        title: 'Saldo',
        key: 'balance',
        className: 'pl-4 w-16 2xl:w-auto'
    },
    {
        title: 'Aforo',
        key: 'capacity',
        className: 'pl-4 w-20 2xl:w-auto'
    },
    {
        title: 'Val. Liberación',
        key: 'releaseValue',
        withCurrencyFormat: true,
        className: 'pl-4 w-28 2xl:w-auto'
    },
    {
        title: 'Porc.Retorno',
        key: 'returnPortion',
        className: 'pl-4 w-28 2xl:w-auto'
    },
    {
        title: 'Cancelada',
        key: 'cancelled',
        className: 'pl-4 w-24 2xl:w-auto'
    },
    {
        title: 'Liberada',
        key: 'released',
        className: 'pl-4 w-20 2xl:w-auto'
    },
    {
        title: 'Histórico',
        key: 'historical',
        className: 'pl-4 w-20 2xl:w-auto'
    },
    {
        title: 'Habitada',
        key: 'inhabited',
        className: 'pl-4 w-20 2xl:w-auto'
    }
]

export const specificTable = Template.bind({})

specificTable.args = {
    topHeader,
    header,
    data: exampleJSON.data
}
