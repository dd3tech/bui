import React, {
  MouseEvent,
  useRef,
  useState,
  useEffect,
  ReactNode,
  useCallback
} from 'react'
import { composeClasses } from 'lib/classes'

export interface TabGroupProps {
  disabledText?: string
  orientation?: 'vertical' | 'horizontal'
  wideLine?: number
  width?: number
  childClassName?: string
  indicatorColor?: string
  textColor?: string
  variant?: 'secondary' | 'primary'
  className?: string
  fontSize?: 'xs' | 'sm' | 'base' | 'xl' | 'lg'
}

interface DashRect {
  width?: number
  height?: number
  left?: number
  right?: number
  top?: number
}

interface Props extends TabGroupProps {
  children: React.ReactNode
  onChange?: (newValue: number) => void
  value?: number
  role?: string
}

const getClientSize = (items: HTMLCollection, position: number) => {
  let totalWidth = 0,
    totalHeight = 0
  for (let i = 0; i < position; i++) {
    const { height, width } = items[i].getBoundingClientRect()
    totalHeight += height
    totalWidth += width
  }
  const { width, height } = items[position].getBoundingClientRect()
  return {
    top: totalHeight,
    left: totalWidth,
    width,
    height
  }
}

const orientationStyle = {
  vertical: 'flex-col',
  horizontal: 'min-w-max'
}

const variantStyle = {
  primary: 'border-gray-200',
  secondary: 'gap-4'
}

function TabGroup({
  orientation = 'horizontal',
  children,
  value = 0,
  onChange,
  wideLine = 3.2,
  width,
  disabledText,
  childClassName,
  indicatorColor,
  variant = 'primary',
  textColor,
  className = '',
  fontSize = 'xs',
  ...otherProps
}: Props) {
  const refContainer = useRef<HTMLDivElement | null>(null)
  const [dashRect, setDashRect] = useState<DashRect>({})

  const getBorder = useCallback(() => {
    if (orientation === 'horizontal' && variant === 'primary') return 'border-b'
    if (orientation === 'vertical' && variant === 'primary') return 'border-r'
    return ''
  }, [orientation, variant])

  const handleChangeIndicator = useCallback(
    (newValue: number) => {
      if (refContainer.current) {
        const { height, left, top, width } = getClientSize(
          refContainer.current.children,
          newValue
        )
        let newDashRect: DashRect = {}
        if (orientation == 'horizontal') {
          newDashRect = { left, height: wideLine, width }
        } else {
          newDashRect = Object.assign(
            { height, width: wideLine, top },
            variant == 'secondary' ? { left: 0 } : { right: 0 }
          )
        }
        setDashRect(newDashRect)
      }
    },
    [orientation, variant, refContainer, dashRect]
  )

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const nodes = Array.prototype.slice.call(refContainer.current?.children)
      const newValue = nodes.indexOf(event.target) ?? 0
      handleChangeIndicator(newValue)
      onChange && onChange(newValue)

      const tabElement = nodes[
        newValue !== 0 ? newValue + 1 : newValue
      ] as HTMLElement
      if (tabElement)
        tabElement.scrollIntoView({ behavior: 'smooth', block: 'end' })
    },
    [refContainer, handleChangeIndicator]
  )

  const childrenWithProps = useCallback((): ReactNode => {
    return React.Children.map(children, (child, index): ReactNode => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement, {
          index,
          value,
          onClick,
          textColor,
          variant,
          disabledText,
          className: childClassName,
          ...child.props
        })
      }
      return child
    })
  }, [value, onClick, disabledText, childClassName, textColor, variant])

  useEffect(() => {
    handleChangeIndicator(value)
  }, [orientation, variant, wideLine])

  return (
    <div
      style={{
        width
      }}
      className="relative overflow-auto hide-scroll"
    >
      <div
        {...otherProps}
        ref={refContainer}
        className={composeClasses(
          'flex',
          fontSize && `text-${fontSize}`,
          variantStyle[variant],
          orientationStyle[orientation],
          getBorder(),
          className
        )}
      >
        {childrenWithProps()}
      </div>
      {variant === 'primary' && (
        <span
          role="indication-bar"
          style={{
            ...dashRect,
            backgroundColor: !indicatorColor?.includes('bg-')
              ? indicatorColor
              : undefined
          }}
          className={composeClasses(
            'bg-blue-500 transition-all duration-300 ease-in absolute bottom-0',
            indicatorColor?.includes('bg-') && indicatorColor
          )}
        />
      )}
    </div>
  )
}

export default TabGroup
