import Skeleton from 'components/Skeleton/Skeleton'
import { Rounded, UnitCSS } from '../../interfaces/types'

export interface PropsTableContentSkeleton {
  /**
   * The number of rows to render.
   */
  rows: number
  /**
   *   The number of columns to render.
   */
  columns: number
  /**
   *  Optional class name for the cell element of each table column
   */
  classNameCell?: string
  /**
   *  Optional color for the skeleton elements. Defaults to #e5e7eb
   */
  skeletonColor?: string
  /**
   * Optional class name for the Skeleton
   */
  skeletonClass?: string
  /**
   * Optional height for the skeleton elements
   * Can be specified as a string with a unit (px, rem, or %) or a number. Defaults to 30px
   */
  skeletonHeight?: UnitCSS
  /**
   * Optional width for the skeleton elements
   * Can be specified as a string with a unit (px, rem, or %) or a number
   * - If an array is provided, the value for each column can be specified individually
   * - If the length of the unit array is less than the number of skeletons, the remaining skeletons will take the last size in the unit array
   */
  skeletonWidth?: UnitCSS[] | UnitCSS
  /**
   * Optional value for the rounded prop of the Skeleton
   */
  rounded?: Rounded
  /**
   * Optional width for each table column
   * Can be specified as a string with a unit (px, rem, or %) or a number
   * - If an array is provided, the value for each column can be specified individually
   * - if the length of the unit array is less than the number of cells, the remaining cells will take the last size in the unit array
   */
  columnWidth?: UnitCSS[] | UnitCSS
}

const getWidth = (width: UnitCSS[] | UnitCSS, index: number) => {
  if (typeof width === 'object' && width[index]) {
    return width[index]
  } else if (['number', 'string'].includes(typeof width)) {
    return width as UnitCSS
  }
  return undefined
}

function TableContentSkeleton({
  columns,
  rows,
  rounded,
  columnWidth,
  classNameCell,
  skeletonWidth,
  skeletonClass,
  skeletonHeight = '30px',
  skeletonColor = '#e5e7eb'
}: PropsTableContentSkeleton) {
  let cellWidth: UnitCSS | undefined
  let width: UnitCSS | undefined
  const elements = Array.from(Array(rows).keys()).map((key) => {
    return (
      <tr key={key}>
        {Array.from(Array(columns).keys()).map((subKey, index: number) => {
          cellWidth = columnWidth && (getWidth(columnWidth, index) || cellWidth)
          width = skeletonWidth
            ? getWidth(skeletonWidth, index) || width
            : '100%'

          return (
            <th
              data-testid="skeleton-cell"
              key={subKey}
              className={classNameCell ?? 'border bg-white'}
              style={{ minWidth: cellWidth, width: cellWidth }}
            >
              <Skeleton
                className={skeletonClass ?? 'bg-gray-200'}
                rounded={rounded}
                style={{
                  width,
                  height: skeletonHeight,
                  backgroundColor: skeletonColor
                }}
              />
            </th>
          )
        })}
      </tr>
    )
  })

  return <>{elements}</>
}

export default TableContentSkeleton
