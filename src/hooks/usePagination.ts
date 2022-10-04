import React, { SetStateAction } from 'react'

type usePaginationReturn = {
    size: number
    setSize: React.Dispatch<SetStateAction<number>>
    currentPage: number
    goToPage: (page: number) => void
    goToNextPage(): void
    goToPreviousPage(): void
    changePage: (sum: boolean) => void
    blockPaginationWithCount(t: number): { prev: boolean; next: boolean }
}

type PaginationProps = {
    abortSignal?(): void
}

export function usePagination(opt: PaginationProps = {}): usePaginationReturn {
    const [size, setSize] = React.useState<number>(5)
    const [currentPage, setCurrentPage] = React.useState<number>(0)

    const changePage = React.useCallback((sum: boolean) => {
        setCurrentPage((prev) => prev + (sum ? +1 : -1))
    }, [])

    const goToNextPage = () => changePage(true)

    const goToPreviousPage = () => changePage(false)

    const goToPage = (page: number) => setCurrentPage(page - 1)

    const blockPaginationWithCount = React.useCallback(
        (total: number) => {
            return { prev: currentPage! <= 0, next: currentPage + 1 >= total }
        },
        [currentPage]
    )

    React.useEffect(() => {
        return () => {
            if (opt?.abortSignal) {
                opt?.abortSignal()
            }
        }
    }, [currentPage, size])

    return { size, setSize, currentPage, goToPage, goToNextPage, goToPreviousPage, changePage, blockPaginationWithCount }
}
