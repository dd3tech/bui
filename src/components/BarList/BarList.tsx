import { CSSProperties, FC, HTMLAttributes, ReactNode, useMemo } from 'react'
import { composeClasses } from 'lib/classes'
import { composeStyles } from 'lib/styles'
import { Height, Margin, Rounded, Size } from '../../interfaces/types'
import Flex from '../Layout/Flex/Flex'
import Text from '../Typography'
import BarLabel, { LabelProps } from './BarLabel'

export interface ListItem extends LabelProps {
  /**
   * Sets the background color of the bar element for a specific element in the `listData` property of `BarList`.
   **/
  backgroundBarColor?: CSSProperties['color']
  /**
   * Allows to pass a React element as an icon to be displayed at the end of the bar label for a specific element in the `listData` property of `BarList`.
   */
  endIcon?: ReactNode
  /**
   * Allows to pass a React element as an icon to be displayed at the beginning of the bar label for a specific element in the `listData` property of `BarList`.
   */
  startIcon?: ReactNode
  /**
   * Represents the numeric value associated with a specific item in the `listData` property of `BarList`.
   */
  value: number
  /**
   * Specifies the prefix text or value for a specific item in the `listData` property of `BarList`.
   */
  prefix?: string
  /**
   * Specifies the suffix text or value for a specific item in the `listData` property of `BarList`.
   */
  suffix?: string
}

interface BarListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Allows to pass a custom CSS class to the background bar element of each item in the list.
   */
  classNameBar?: string
  /**
   * Allows to pass a value from the `Size` enumeration to set the font size of the text in the bar labels.
   * The default value is ``base``.
   */
  fontSizeBar?: Size
  /**
   * Allows passing a value from the `Height` enumeration to set the height of the bottom bar element of each item in the list.
   * The default value is `'h-full'`.
   */
  heightBar?: Height
  /**
   * Represents the list item data for the `BarList` component. It is an array of objects where each object represents an element of the list.
   */
  listData: ListItem[]
  /**
   * Allows to pass a value from the `Margin` enumeration to set the vertical spacing between each element.
   * The default value is `1`.
   */
  marginYItem?: Margin
  /**
   * Allows to pass a value from the `Rounded` enumeration to set the border radius of the background bar element of each item in the list.
   * The default value is `'md'`.
   */
  roundedBar?: Rounded
  /**
   * Allows to pass a string value to display as a title for the metrics displayed in the bar list. If not provided, no title will be displayed.
   */
  titleMetrics?: string
  /**
   * Allows to pass a string value to display as a title for the values shown in the bar list. If not provided, no title will be displayed for the values.
   */
  titleValues?: string
  /**
   * Defines the default color of the text in the bar labels if the `textBarColor` property is not provided for a specific element in the `listData` property.
   * The default value is `'#1D4ED8'`.
   */
  defaultTextBarColor?: CSSProperties['color']
  /**
   * Defines the default background color of the bar element if the `backgroundBarColor` property is not provided for a specific element in the `listData` property.
   * The default value is `'#b5d4fc'`.
   */
  defaultBackgroundBarColor?: CSSProperties['color']
  /**
   * Specifies the prefix text or value for the values shown in the bar list.
   */
  valuePrefix?: string
  /**
   * Specifies the suffix text or value for the values shown in the bar list.
   */
  valueSuffix?: string
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
    if (!value || value === 0) return 0
    return Math.max((value / max) * MAX_WIDTH, MIN_WIDTH)
  }

  const widths = values?.map(calculateWidth)

  return widths
}

const BarList: FC<BarListProps> = ({
  classNameBar,
  fontSizeBar = 'base',
  heightBar = 'full',
  listData,
  roundedBar = 'md',
  titleMetrics,
  titleValues,
  marginYItem = '1',
  defaultBackgroundBarColor = '#b5d4fc',
  defaultTextBarColor = '#1D4ED8',
  valuePrefix,
  valueSuffix,
  style,
  className,
  ...otherProps
}) => {
  const widths = useMemo(
    () => calculateWidthsFromValues(listData.map((item) => item?.value)),
    [listData]
  )

  return (
    <div
      data-testid="container-bar-list"
      className={composeClasses('w-full h-full', className)}
      style={style}
      {...otherProps}
    >
      {(titleMetrics || titleValues) && (
        <Flex
          alignItems="center"
          justifyContent="between"
          className="w-full font-medium mb-1"
        >
          <p className="text-left">{titleMetrics}</p>
          <p className="text-right">{titleValues}</p>
        </Flex>
      )}
      {listData?.map((item, index) => {
        const prefix = item?.prefix || valuePrefix
        const suffix = item?.suffix || valueSuffix

        return (
          <div
            key={`${item?.label}-${item?.value}`}
            className={composeClasses('w-full h-full', `my-${marginYItem}`)}
            data-testid="item-bar"
          >
            <Flex
              alignItems="center"
              justifyContent="between"
              className="relative flex-row flex-nowrap w-full h-full"
            >
              <Flex
                alignItems="center"
                justifyContent="between"
                className="p-2 flex-row flex-nowrap gap-x-1 h-full"
                style={{ zIndex: '5' }}
              >
                {item?.startIcon && item.startIcon}
                <BarLabel
                  textBarColor={item?.textBarColor || defaultTextBarColor}
                  size={fontSizeBar}
                  href={item?.href}
                  label={item?.label}
                />
                {item?.endIcon && item.endIcon}
              </Flex>
              <div
                data-testid="item-background"
                className={composeClasses(
                  'absolute',
                  heightBar && `h-${heightBar}`,
                  roundedBar && `rounded-${roundedBar}`,
                  classNameBar
                )}
                style={composeStyles([
                  {
                    width: `${widths[index]}%`,
                    backgroundColor:
                      item?.backgroundBarColor || defaultBackgroundBarColor
                  }
                ])}
              ></div>
              <div className="h-full pr-1" style={{ zIndex: '5' }}>
                {prefix && (
                  <Text size={fontSizeBar} className="mr-0.5">
                    {prefix}
                  </Text>
                )}
                <Text size={fontSizeBar}>{item?.value}</Text>
                {suffix && (
                  <Text size={fontSizeBar} className="ml-0.5">
                    {suffix}
                  </Text>
                )}
              </div>
            </Flex>
          </div>
        )
      })}
    </div>
  )
}

export default BarList
