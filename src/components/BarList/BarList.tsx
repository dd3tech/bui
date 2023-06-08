import { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { BarLabel } from './BarLabel'
import Flex from '../Layout/Flex/Flex'
import Text from '../Typography/Text'
import { Height, Margin, Rounded, Size } from '../../interfaces/types'

export interface ListItem {
  /* `backgroundBarColor?: CSSProperties['color']` is defining an optional property
  `backgroundBarColor` of type `CSSProperties['color']` for the `ListItem` interface. This property
  can be used to set the background color of the bar element for a specific item in the `listData`
  prop of the `BarList` component. */
  backgroundBarColor?: CSSProperties['color']
  /* `textBarColor?: CSSProperties['color']` is defining an optional property `textBarColor` of type
  `CSSProperties['color']` for the `ListItem` interface. This property can be used to set the color
  of the text in the bar label for a specific item in the `listData` prop of the `BarList`
  component.  */
  textBarColor?: CSSProperties['color']
  /* `endIcon?: ReactNode` is defining an optional property `endIcon` of type `ReactNode` for the
  `ListItem` interface. This property can be used to pass a React element as an icon to be displayed
  at the end of the bar label for a specific item in the `listData` prop of the `BarList` component. */
  endIcon?: ReactNode
  /* `href?: string` is defining an optional property `href` of type `string` for the `ListItem`
  interface. This property can be used to set the URL for a hyperlink that wraps the bar label for a
  specific item in the `listData` prop of the `BarList` component. */
  href?: string
  /* `startIcon?: ReactNode` is defining an optional property `startIcon` of type `ReactNode` for the
  `ListItem` interface. This property can be used to pass a React element as an icon to be displayed
  at the start of the bar label for a specific item in the `listData` prop of the `BarList`
  component. */
  startIcon?: ReactNode
  /* `label: string` is defining a required property `label` of type `string` for the `ListItem`
  interface. This property represents the label or title for a specific item in the `listData` prop
  of the `BarList` component. */
  label: string
  /* `value: number` is defining a required property `value` of type `number` for the `ListItem`
  interface. This property represents the numerical value associated with a specific item in the
  `listData` prop of the `BarList` component. */
  value: number
}

interface BarListProps extends HTMLAttributes<HTMLDivElement> {
  /* `classNameBar?: string` is defining an optional prop `classNameBar` of type `string` for the
  `BarList` component. This prop can be used to pass a custom CSS class to the background bar
  element of each item in the list. */
  classNameBar?: string
  /* `fontSizeBar?: Size` is defining an optional prop `fontSizeBar` of type `Size` for the `BarList`
  component. This prop can be used to pass a value from the `Size` enum to set the font size of the
  text in the bar labels. If the prop is not provided, it defaults to `'base'` */
  fontSizeBar?: Size
  /* `heightBar?: Height` is defining an optional prop `heightBar` of type `Height` for the `BarList`
  component. This prop can be used to pass a value from the `Height` enum to set the height of the
  background bar element of each item in the list. If the prop is not provided, it defaults to
  'h-full'. */
  heightBar?: Height
  /* `listData: ListItem[]` is defining a prop `listData` of type `ListItem[]` for the `BarList`
  component. This prop is an array of objects, where each object represents a single item in the
  list and contains properties such as `backgroundBarColor`, `textBarColor`, `endIcon`, `href`,
  `startIcon`, `label`, and `value`. The `ListItem` interface defines the shape of these objects and
  specifies which properties are optional. The `BarList` component uses this prop to render a list
  of bars, where each bar represents an item in the `listData` array. */
  listData: ListItem[]
  /* `marginYItem`: Margin` is defining an optional `marginYItem` prop of type `Margin` for the
  `BarList` component. This property can be used to pass a value from the `Margin` enum to set the
  vertical spacing between each item, . If the prop is not provided, the default value is `1`. */
  marginYItem?: Margin
  /* `roundedBar?: Rounded` is defining an optional prop `roundedBar` of type `Rounded` for the
  `BarList` component. This prop can be used to pass a value from the `Rounded` enum to set the
  border radius of the background bar element of each item in the list. If the prop is not provided,
  it defaults to `'md'`. */
  roundedBar?: Rounded
  /* `titleMetrics?: string` is defining an optional prop `titleMetrics` of type `string` for the
  `BarList` component. This prop can be used to pass a string value to display as the title or label
  for the metrics being displayed in the bar list. If the prop is not provided, no title will be
  displayed. */
  titleMetrics?: string
  /* `titleValues?: string` is defining an optional prop `titleValues` of type `string` for the
  `BarList` component. This prop can be used to pass a string value to display as the title or label
  for the values being displayed in the bar list. If the prop is not provided, no title will be
  displayed for the values. */
  titleValues?: string
  /* `defaultTextBarColor?: CSSProperties['color']` is defining an optional prop `defaultTextBarColor`
  of type `CSSProperties['color']` for the `BarList` component. This prop can be used to set a
  default color for the text in the bar labels if the `textBarColor` property is not provided for a
  specific item in the `listData` prop. If the prop is not provided, it defaults to `'#1D4ED8'`. */
  defaultTextBarColor?: CSSProperties['color']
  /* `defaultBackgroundBarColor?: CSSProperties['color']` is defining an optional prop
  `defaultBackgroundBarColor` of type `CSSProperties['color']` for the `BarList` component. This
  prop can be used to set a default color for the background of the bar element if the
  `backgroundBarColor` property is not provided for a specific item in the `listData` prop. If the
  prop is not provided, it defaults to `'#b5d4fc'`. */
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
                className="p-2 flex-row flex-nowrap gap-x-1 z-10 h-full"
              >
                {item?.startIcon && item.startIcon}
                <BarLabel
                  textBarColor={item.textBarColor || defaultTextBarColor}
                  fontSizeBar={fontSizeBar}
                  href={item?.href}
                >
                  {item?.label}
                </BarLabel>
                {item?.endIcon && item.endIcon}
              </Flex>
              <div
                data-testid="item-background"
                className={composeClasses(
                  'absolute',
                  `h-${heightBar} rounded-${roundedBar}`,
                  classNameBar
                )}
                style={{
                  width: `${widths[index]}%`,
                  backgroundColor:
                    item?.backgroundBarColor || defaultBackgroundBarColor
                }}
              ></div>
              <div className="z-10 h-full">
                <Text size={fontSizeBar}>{item?.value}</Text>
              </div>
            </Flex>
          </div>
        )
      })}
    </div>
  )
}

export default BarList
