import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TableComp from '../components/Table'

export default {
    title: 'Components/Table',
    component: TableComp
} as ComponentMeta<typeof TableComp>

const Template: ComponentStory<typeof TableComp> = (args) => {
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm']

    return (
        <div>
            <TableComp rounded="none">
                <TableComp.Header>
                    <TableComp.HeaderRow>
                        <TableComp.HeaderCell stickyLeft="0px" style={{ minWidth: 150 }}>
                            Crédito
                        </TableComp.HeaderCell>
                        <TableComp.HeaderCell colSpan={5}>Estructura</TableComp.HeaderCell>
                        <TableComp.HeaderCell colSpan={7}>Valores y detalles</TableComp.HeaderCell>
                    </TableComp.HeaderRow>
                    <TableComp.HeaderRow variant="secondary">
                        {columns.map((val) => (
                            <TableComp.HeaderCell key={val}>
                                <div>May. 22</div>
                                <div>Real</div>
                            </TableComp.HeaderCell>
                        ))}
                    </TableComp.HeaderRow>
                    <TableComp.HeaderRow variant="tertiary">
                        {columns.map((val) => (
                            <TableComp.HeaderCell key={val} style={{ minWidth: 108 }}>
                                Column Head
                            </TableComp.HeaderCell>
                        ))}
                    </TableComp.HeaderRow>
                </TableComp.Header>
                <TableComp.Body>
                    <TableComp.Row>
                        {columns.map((val) => (
                            <TableComp.Cell key={val} disabled>
                                0.00
                            </TableComp.Cell>
                        ))}
                    </TableComp.Row>
                    <TableComp.Row>
                        {columns.map((val) => (
                            <TableComp.Cell key={val}>00330001</TableComp.Cell>
                        ))}
                    </TableComp.Row>

                    <TableComp.Accordion>
                        <TableComp.Row>
                            <TableComp.Cell colSpan={13}>
                                <div>Total Loan + Pre-Sales</div>
                            </TableComp.Cell>
                        </TableComp.Row>
                        <TableComp.Row>
                            {columns.map((val) => (
                                <TableComp.Cell key={val}>$0.00</TableComp.Cell>
                            ))}
                        </TableComp.Row>
                    </TableComp.Accordion>

                    <TableComp.Row variant="header">
                        <TableComp.Cell colSpan={13}>Return Metrics</TableComp.Cell>
                    </TableComp.Row>

                    <TableComp.Row variant="result">
                        <TableComp.Cell colSpan={13}>Return Metrics</TableComp.Cell>
                    </TableComp.Row>

                    <TableComp.Accordion iconPosition={1}>
                        <TableComp.Row>
                            <TableComp.Cell className="bg-white" rowSpan={5} colSpan={2}>
                                00330001
                            </TableComp.Cell>
                            <TableComp.Cell className="bg-blue-50" colSpan={2}>
                                Accordion 1
                            </TableComp.Cell>
                            <TableComp.Cell className="bg-blue-50" colSpan={9}>
                                Return Metrics
                            </TableComp.Cell>
                        </TableComp.Row>
                        <TableComp.Row>
                            {columns.slice(0, 11).map((val) => (
                                <TableComp.Cell key={val} error>
                                    0.00
                                </TableComp.Cell>
                            ))}
                        </TableComp.Row>
                    </TableComp.Accordion>

                    <TableComp.Accordion iconPosition={0}>
                        <TableComp.Row>
                            <TableComp.Cell className="bg-blue-50" colSpan={2}>
                                Accordion 2
                            </TableComp.Cell>
                            <TableComp.Cell className="bg-blue-50" colSpan={9}>
                                Return Metrics
                            </TableComp.Cell>
                        </TableComp.Row>
                        <TableComp.Row>
                            {columns.slice(0, 11).map((val) => (
                                <TableComp.Cell key={val} inputProps={{ type: 'currency' }} />
                            ))}
                        </TableComp.Row>
                    </TableComp.Accordion>
                </TableComp.Body>
            </TableComp>

            <table></table>
        </div>
    )
}

export const Table = Template.bind({})
