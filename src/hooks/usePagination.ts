/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  SetStateAction,
  useState,
  useCallback,
  useEffect,
  Dispatch
} from 'react'

export interface usePaginationReturn {
  size: number
  setSize: Dispatch<SetStateAction<number>>
  currentPage: number
  goToPage: (page: number) => void
  goToNextPage(): void
  goToPreviousPage(): void
  changePage: (sum: boolean) => void
  blockPaginationWithCount(t: number): { prev: boolean; next: boolean }
}

export type PaginationParams = {
  abortSignal?(): void
  initialSize?: number
}

/**
 * hook that provides pagination functionality with options for initial size
 * and abort signal.
 * @param {PaginationParams} opt - The `opt` parameter is an optional object that contains
 * configuration options for the pagination. It has a default value of an empty object `{}`.
 * @returns The function `usePagination` returns an object with properties `size`, `setSize`,
 * `currentPage`, `goToPage`, `goToNextPage`, `goToPreviousPage`, `changePage`, and
 * `blockPaginationWithCount`.
 */
export default function usePagination(
  opt: PaginationParams = {}
): usePaginationReturn {
  const [size, setSize] = useState<number>(opt?.initialSize ?? 5)
  const [currentPage, setCurrentPage] = useState<number>(0)

  const changePage = useCallback((sum: boolean) => {
    setCurrentPage((prev) => prev + (sum ? +1 : -1))
  }, [])

  const goToNextPage = () => changePage(true)

  const goToPreviousPage = () => changePage(false)

  const goToPage = useCallback((page: number) => setCurrentPage(page - 1), [])

  const blockPaginationWithCount = useCallback(
    (total: number) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { prev: currentPage! <= 0, next: currentPage + 1 >= total }
    },
    [currentPage]
  )

  useEffect(() => {
    return () => {
      if (opt?.abortSignal) {
        opt?.abortSignal()
      }
    }
  }, [currentPage, size])

  return {
    size,
    setSize,
    currentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    changePage,
    blockPaginationWithCount
  }
}
