import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import GeneralTableComponent from '../components/Table/GeneralTable'
import { IDataTable, IHeaderType } from '../interfaces/GeneralTable'

export default {
    title: 'Components/Table'
} as ComponentMeta<typeof GeneralTableComponent>

const Template: ComponentStory<typeof GeneralTableComponent> = (args) => <GeneralTableComponent {...args} />

const skelleton = {
    id: 1,
    credit_amount: 100000,
    credit_type: 'Mezzanine',
    enterprise_name: 'GAP Inmobiliaria',
    project_name: 'Àlvaro Obregón 182',
    status: 'Mora',
    start_date: '01/01/2020',
    end_date: '01/01/2020',
    current_balance: 100000
}

const exampleList = [
    { ...skelleton, enterprise_name: 'Example', current_balance: 50000 },
    { ...skelleton, id: 2, enterprise_name: 'Angle', status: 'Activo', credit_amount: 9000, start_date: '02/03/2021' },
    { ...skelleton, id: 3 },
    { ...skelleton, id: 4, enterprise_name: 'Example', current_balance: 50000 },
    { ...skelleton, id: 5, enterprise_name: 'Angle', status: 'Activo', credit_amount: 9000, start_date: '02/03/2021' },
    { ...skelleton, id: 6 },
    { ...skelleton, id: 7, enterprise_name: 'Example', current_balance: 50000 },
    { ...skelleton, id: 8, enterprise_name: 'Angle', status: 'Activo', credit_amount: 9000, start_date: '02/03/2021' },
    { ...skelleton, id: 9 }
]

const headers = [
    {
        title: 'project',
        key: 'project_name'
    },
    {
        title: 'enterprise',
        key: 'enterprise_name'
    },
    {
        title: 'status',
        key: 'status',
        type: 'success'
    },
    {
        title: 'amount',
        key: 'credit_amount',
        type: 'amount-blue'
    },
    {
        title: 'creditType',
        key: 'credit_type',
        type: 'tag'
    },
    {
        title: 'startDate',
        key: 'start_date'
    },
    {
        title: 'endDate',
        key: 'end_date'
    },
    {
        title: 'currentBalance',
        type: 'amount-black',
        key: 'current_balance'
    }
] as IHeaderType[]

const paramPagination = {
    skipSlice: 0,
    limitSlice: 5
}

const list: IDataTable = {
    headers: headers,
    data: exampleList,
    page: 1
}

export const generalTable = Template.bind({})

generalTable.args = {
    list,
    paramPagination
}
