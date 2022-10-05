import { SetStateAction, useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Text from '../Typography'

export interface PaginationProps {
    totalPages: number
    currentPage: number
    sliceSize?: '5' | '10' | '15' | '20' | '25' | '30'
    firstText?: string
    secondText?: string
    goToPreviousPage: () => void
    goToNextPage: () => void
    goToPage: (page: number) => void
    setSize: React.Dispatch<SetStateAction<number>>
}

const buttonStyle = 'w-full h-full flex justify-center items-center rounded-full hover:bg-gray-200'

export const Pagination = ({
    totalPages,
    currentPage,
    sliceSize,
    firstText,
    secondText,
    goToPreviousPage,
    goToNextPage,
    goToPage,
    setSize
}: PaginationProps) => {
    const pages = new Array(totalPages).fill(0).map((item, index) => index + 1)
    const [selectSliceSize, setSelectSliceSize] = useState(sliceSize ?? '5')

    const getPages = () => {
        if (totalPages <= 5) return pages
        if (totalPages > 5 && currentPage <= 5) return pages.slice(0, 5)
        if (totalPages > 5 && currentPage + 5 > totalPages) return pages.slice(totalPages - 5, totalPages)
        if (totalPages > 5 && currentPage > 5) return pages.slice(currentPage - 3, currentPage + 2)
        return pages
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSize(Number(e.target.value))
        setSelectSliceSize(e.target.value as any)
    }

    useEffect(() => {
        sliceSize && setSize(Number(sliceSize))
    }, [])

    if (totalPages === 0) {
        return <></>
    }

    return (
        <div role="pagination" className="flex flex-col md:flex-row md:gap-6">
            <div className="flex items-center">
                {firstText && <Text size="base">{firstText}</Text>}
                <select
                    name="custom-pagination"
                    value={selectSliceSize}
                    className="w-12 pl-2 mr-2 outline-none text-blue-700 bg-transparent"
                    onChange={(e) => handleChange(e)}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                </select>
                {secondText && <Text size="base">{secondText}</Text>}
            </div>
            <div className="flex items-center">
                <ul className="flex h-6">
                    <li className="w-6 h-6">
                        <button className={buttonStyle} onClick={goToPreviousPage} disabled={currentPage <= 1}>
                            <ChevronLeftIcon className="w-4" />
                        </button>
                    </li>
                    {currentPage > 5 && (
                        <>
                            <li className="w-6 h-6">
                                <button role="first-page" className={buttonStyle} onClick={() => goToPage(1)}>
                                    <Text variant="small">1</Text>
                                </button>
                            </li>
                            <li className="w-6 h-6">
                                <div className="w-full h-full text-center select-none">
                                    <Text variant="small">...</Text>
                                </div>
                            </li>
                        </>
                    )}
                    {getPages().map((page) => (
                        <li key={`${page}-page`} className="w-6 h-6">
                            <button
                                className={`${buttonStyle} ${page === currentPage && 'bg-blue-700 text-white hover:bg-blue-700'}`}
                                onClick={() => goToPage(page)}
                            >
                                <Text variant="small">{page}</Text>
                            </button>
                        </li>
                    ))}
                    {totalPages > 5 && (currentPage <= 5 || currentPage <= totalPages - 5) && (
                        <>
                            <li className="w-6 h-6">
                                <div className="w-full h-full text-center select-none">
                                    <Text variant="small">...</Text>
                                </div>
                            </li>
                            <li className="w-6 h-6">
                                <button role="last-page" className={buttonStyle} onClick={() => goToPage(totalPages)}>
                                    <Text variant="small">{totalPages}</Text>
                                </button>
                            </li>
                        </>
                    )}
                    <li className="w-6 h-6">
                        <button className={buttonStyle} onClick={goToNextPage} disabled={currentPage >= totalPages}>
                            <ChevronRightIcon className="w-4" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
