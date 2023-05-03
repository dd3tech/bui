import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import Text from '../Typography'

export interface PaginationProps {
  totalPages: number
  totalRows?: number
  currentPage: number
  sliceSize?:
    | '5'
    | '10'
    | '15'
    | '20'
    | '25'
    | '30'
    | '35'
    | '40'
    | '45'
    | '50'
    | '55'
    | '60'
    | '65'
  firstText?: string
  secondText?: string
  goToPreviousPage: () => void
  goToNextPage: () => void
  goToPage: (page: number) => void
  setSize: React.Dispatch<SetStateAction<number>>
}

const buttonStyle =
  'w-full h-full flex justify-center items-center rounded-full hover:bg-gray-200'

const Pagination = ({
  totalPages,
  totalRows = 40,
  currentPage,
  sliceSize,
  firstText,
  secondText,
  goToPreviousPage,
  goToNextPage,
  goToPage,
  setSize
}: PaginationProps) => {
  const [selectSliceSize, setSelectSliceSize] = useState(sliceSize)

  const pages = useMemo(() => {
    const pagesList = new Array(totalPages).fill(0).map((_, index) => index + 1)

    if (totalPages > 5 && currentPage <= 5) return pagesList.slice(0, 5)
    if (totalPages > 5 && currentPage + 5 > totalPages)
      return pagesList.slice(totalPages - 5, totalPages)
    if (totalPages > 5 && currentPage > 5)
      return pagesList.slice(currentPage - 3, currentPage + 2)

    return pagesList
  }, [totalPages, currentPage, selectSliceSize])

  const options = useMemo(() => {
    const optionList = []
    for (let i = 5; i <= totalRows; i += 5) {
      optionList.push(i)
    }

    // make sure the last value is in the option list
    if (optionList[optionList.length - 1] !== totalRows) {
      optionList.push(totalRows)
    }

    return optionList
  }, [totalRows])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSize(Number(e.target.value))
      setSelectSliceSize(e.target.value as any)
    },
    []
  )

  useEffect(() => {
    sliceSize && setSize(Number(sliceSize))
  }, [])

  if (totalPages === 0) {
    return <></>
  }

  return (
    <div
      role="pagination"
      className="flex flex-col md:flex-row items-center md:gap-6"
    >
      <div className="flex items-center">
        {firstText && <Text size="base">{firstText}</Text>}
        <select
          role="select-slice-size"
          name="custom-pagination"
          value={selectSliceSize}
          className="w-12 pl-2 mr-2 outline-none text-primary bg-transparent"
          onChange={(e) => handleChange(e)}
        >
          {options.map((option) => {
            return (
              <option role="option" key={option} value={option}>
                {option}
              </option>
            )
          })}
        </select>
        {secondText && <Text size="base">{secondText}</Text>}
      </div>
      <div className="flex items-center">
        <ul className="flex h-6">
          <li className="w-6 h-6">
            <button
              className={buttonStyle}
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
            >
              <ChevronLeftIcon className="w-4" />
            </button>
          </li>
          {currentPage > 5 && (
            <>
              <li className="w-6 h-6">
                <button
                  role="first-page"
                  className={buttonStyle}
                  onClick={() => goToPage(1)}
                >
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
          {pages.map((page) => (
            <li key={`${page}-page`} className="w-6 h-6" role="list-page">
              <button
                className={composeClasses(
                  buttonStyle,
                  page === currentPage &&
                    'bg-primary text-white hover:bg-primary'
                )}
                onClick={() => goToPage(page)}
              >
                <Text variant="small">{page}</Text>
              </button>
            </li>
          ))}
          {totalPages > 5 &&
            (currentPage <= 5 || currentPage <= totalPages - 5) && (
              <>
                <li className="w-6 h-6">
                  <div className="w-full h-full text-center select-none">
                    <Text variant="small">...</Text>
                  </div>
                </li>
                <li className="w-6 h-6">
                  <button
                    role="last-page"
                    className={buttonStyle}
                    onClick={() => goToPage(totalPages)}
                  >
                    <Text variant="small">{totalPages}</Text>
                  </button>
                </li>
              </>
            )}
          <li className="w-6 h-6">
            <button
              className={buttonStyle}
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
            >
              <ChevronRightIcon className="w-4" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

Pagination.displayName = 'Pagination'
Pagination.defaultProps = {
  sliceSize: '5'
} as PaginationProps

export default Pagination
