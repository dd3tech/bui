import { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { BarLabel } from './BarLabel'
import { Height, Rounded, Size } from 'interfaces'

interface ListItem {
  backgroundBarColor?: CSSProperties['color']
  textBarColor?: CSSProperties['color']
  endIcon?: ReactNode
  href?: string
  startIcon?: ReactNode
  label: string
  value: number
}

interface IPropsBarList extends HTMLAttributes<HTMLDivElement> {
  classNameBar?: string
  fontSizeBar?: Size
  heightBar?: Height
  listData: ListItem[]
  roundedBar?: Rounded
  titleMetrics?: string
  titleValues?: string
  defaultTextBarColor?: CSSProperties['color']
  defaultBackgroundBarColor?: CSSProperties['color']
}

/**
 * This function calculates the widths of bars in a chart based on the values provided.
 * @param {number[]} values - An array of numbers representing values for which we want to calculate
 * corresponding widths.
 * @returns The function `calculateWidthsFromValues` returns an array of numbers representing the
 * calculated widths based on the input array of numbers `values`. */
const calculateWidthsFromValues = (values: number[]) => {
  const MIN_WIDTH = 1
  const MAX_WIDTH = 100

  const max = Math.max(...values)

  const calculateWidth = (value: number) => {
    if (value === 0) return 0
    return Math.max((value / max) * MAX_WIDTH, MIN_WIDTH)
  }

  const widths = values?.map(calculateWidth)

  return widths
}

const BarList: FC<IPropsBarList> = ({
  classNameBar,
  fontSizeBar = 'base',
  heightBar = 'full',
  listData,
  roundedBar = 'md',
  titleMetrics,
  titleValues,
  defaultBackgroundBarColor = '#b5d4fc',
  defaultTextBarColor = '#1D4ED8',
  ...props
}) => {
  const widths = calculateWidthsFromValues(listData.map((item) => item.value))

  return (
    <div
      data-testid="container-bar-list"
      className={composeClasses('w-full h-full', props?.className)}
      style={props?.style}
    >
      {(titleMetrics || titleValues) && (
        <div
          className={composeClasses(
            'flex items-center w-full justify-between font-medium mb-1'
          )}
        >
          <p className="text-left">{titleMetrics}</p>
          <p className="text-right">{titleValues}</p>
        </div>
      )}
      {listData?.map((item, index) => {
        return (
          <div
            key={`${item?.label}-${item?.value}`}
            className={composeClasses('w-full mb-1')}
            data-testid="item-bar"
          >
            <div className="relative flex items-center justify-between w-full">
              <div className="p-2 flex items-center justify-center flex-row gap-x-1 z-10">
                {item?.startIcon && item.startIcon}
                <BarLabel
                  textBarColor={item.textBarColor || defaultTextBarColor}
                  fontSizeBar={fontSizeBar}
                  href={item?.href}
                >
                  {item?.label}
                </BarLabel>
                {item?.endIcon && item.endIcon}
              </div>
              <div
                data-testid="item-background"
                className={composeClasses(
                  'absolute',
                  classNameBar,
                  heightBar && `h-${heightBar}`,
                  roundedBar && `rounded-${roundedBar}`
                )}
                style={{
                  width: `${widths[index]}%`,
                  backgroundColor:
                    item?.backgroundBarColor || defaultBackgroundBarColor
                }}
              ></div>
              <div className="z-10">
                <p className={fontSizeBar && `font-${fontSizeBar}`}>
                  {item?.value}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BarList
