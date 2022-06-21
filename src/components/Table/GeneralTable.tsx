// import useResize from '@/hooks/useResize'
import { formatWithDecimal } from '../../utils/formatCurrency'
import { Button, Badge, Text } from '..'
import { HeaderAction } from './HeaderAction'
import { IDataTable, IPaginatedData, IType, IParamsPagination } from '../../interfaces/GeneralTable'
import './table.css'

interface IProps {
    heightColumn?: number
    hasDetail?: boolean
    list?: IDataTable
    Link?: React.ComponentType<any>
    paginated?: IPaginatedData
    paramPagination?: IParamsPagination
}

function GeneralTable({ heightColumn = 50, hasDetail = false, list, Link, paginated, paramPagination }: IProps) {
    const renderTable = (payload: any, key: string, type?: string) => {
        switch (type as IType) {
            case 'warm':
                return (
                    <Text className="text-yellow-400 font-bold">
                        {payload[key]}
                    </Text>
                )
            case 'success':
                return (
                    <Text className="text-green-500 font-bold">
                        {payload[key]}
                    </Text>
                )
            case 'amount-blue':
                return (
                    <Text variant="p" className="text-blue-900 font-bold">
                        ${formatWithDecimal(payload[key])}
                    </Text>
                )
            case 'amount-black':
                return (
                    <Text variant="p" className="font-bold">
                        ${formatWithDecimal(payload[key])}
                    </Text>
                )
            case 'tag':
                return (
                    <Badge
                        variant="infoPrimary"
                        icon="tag"
                        className="w-20 text-xs px-2 py-1 mx-auto truncate"
                        classNameIcon="w-3 text-blue-300"
                        text={payload[key]}
                    />
                )
            case 'input':
                return <input type="text" className="p-2 w-2/4 text-center" placeholder="Enter text" />
            case 'link':
                if (!Link) return <Text className="text-blue-600 underline cursor-pointer font-bold">Ver detalle</Text>
                return (
                    <Link to="#">
                        <Text className="text-blue-600 underline cursor-pointer font-bold">Ver detalle</Text>
                    </Link>
                )
            default:
                return (
                    <Text className="text-gray-500 font-bold">
                        {payload[key]}
                    </Text>
                )
        }
    }

    return (
        <>
            <div className='overflow-x-auto sm:max-w-none border-table'>
                <table className="table w-full text-center text-sm shadow-lg">
                    <thead className='border-table-bottom'>
                        <tr style={{ backgroundColor: '#EFF6FF59', height: '66px' }}>
                            {list?.headers.map(({ title, key, filterCallback }, index) => (
                                <HeaderAction
                                    onClick={() => {
                                        filterCallback && list.data && filterCallback(list?.data, key)
                                    }}
                                    title={title}
                                    key={index.toString()}
                                    filter={!!filterCallback}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#FFF' }}>
                        {list?.data &&
                            list?.data?.slice(paramPagination?.skipSlice, paramPagination?.limitSlice).map((row) => (
                                <tr key={row?.id} className='border-b text-xs' style={{ height: heightColumn }}>
                                    {list.headers.map(({ type, key }, index) => (
                                        <td className="p-2" key={index.toString()}>
                                            {renderTable(row, key, type)}
                                        </td>
                                    ))}
                                    {hasDetail && Link && (
                                        <td className="p-2">
                                            <Link to={`/loan/${row?.id}/menu`} className="text-blue-600 underline cursor-pointer font-bold">
                                                Ver detalle
                                            </Link>
                                        </td>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {paginated && (
                <div className="flex justify-between items-center mt-7">
                    <span>
                        Mostrando {list?.page! + 1} de {paginated.numPages} creditos
                    </span>
                    <div>
                        <Button
                            variant="secondary"
                            onClick={list?.page! > 0 ? paginated.previousPage : undefined}
                            disabled={list?.page! <= 0}
                            paddingX={5}
                            paddingY={2}
                            className="rounded-lg text-xs"
                        >
                            Anterior
                        </Button>
                        <span className="ml-5" />
                        <Button
                            variant="secondary"
                            onClick={paginated.nextPage}
                            paddingX={5}
                            paddingY={2}
                            className="rounded-lg text-xs"
                            disabled={paginated.blockPaginationWithCount && paginated.blockPaginationWithCount()}
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default GeneralTable
