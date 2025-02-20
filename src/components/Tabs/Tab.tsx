/*
 * Copyright (c) DD360 and its affiliates.
 */

import { useMemo, useCallback, forwardRef } from 'react'
import { composeClasses } from 'lib/classes'
import { ClockIcon } from '@heroicons/react/outline'
import Tooltip, { TooltipProps } from 'components/Tooltip'

interface PrivateProps {
  onChange?: (event: React.MouseEvent<HTMLButtonElement>) => void
  index?: number
  value?: number
  variant?: 'primary' | 'secondary' | 'tertiary'
}

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  textColor?: string
  textDisabledColor?: string
  disabledText?: string
  label: string
  disabled?: boolean
  hidden?: boolean
  isVertical?: boolean
  tabWidth?: number
  tabMinWidth?: number
  toolTipProps?: TooltipProps
}

const variantStyle = {
  secondary: 'border rounded-md py-2 px-5 hover:bg-gray-50',
  primary: 'py-3 px-4 hover:bg-gray-50',
  tertiary: ''
}

const Tab = forwardRef<HTMLButtonElement, Props>(
  (
    {
      label,
      disabled,
      onClick,
      disabledText,
      textColor,
      textDisabledColor,
      className,
      hidden,
      isVertical,
      tabWidth,
      tabMinWidth,
      toolTipProps,
      ...otherProps
    },
    ref
  ) => {
    const {
      onChange,
      index,
      value,
      variant = 'primary'
    } = otherProps as PrivateProps

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return
        onChange && onChange(event)
        onClick && onClick(event)
      },
      [onClick, onChange]
    )

    const classes = useMemo(() => {
      const list = []
      list.push(index !== value ? 'font-semibold' : 'font-bold')
      if (index === value) {
        if (variant === 'secondary') {
          list.push('border-blue-500')
          list.push('text-blue-500')
        }
      } else {
        list.push(variant !== 'tertiary' ? 'text-info' : undefined)
      }
      return list.join(' ')
    }, [value, variant, disabled])

    const getTextColor = useMemo(() => {
      return disabled && textDisabledColor
        ? textDisabledColor
        : textColor && index === value
        ? textColor
        : undefined
    }, [value, textColor, textDisabledColor, disabled])

    const renderTab = () => {
      return (
        <button
          ref={ref}
          {...otherProps}
          role="tab"
          onClick={handleClick}
          style={{
            color: getTextColor,
            minWidth: variant !== 'tertiary' ? '132px' : tabMinWidth,
            width: tabWidth || undefined
          }}
          className={composeClasses(
            'inline-flex justify-center w-auto flex-wrap border-transparent items-center box-content leading-5 select-none transition-all duration-300 ease-in hover:border-blue-400',
            isVertical ? 'border-r-3' : 'border-b-3',
            classes,
            variantStyle[variant],
            className,
            hidden && 'hidden',
            disabled && 'cursor-not-allowed'
          )}
        >
          {label}
          {disabledText && disabled && (
            <label
              role="contentinfo"
              style={{ fontSize: 10 }}
              className="flex gap-1.5 ml-3"
            >
              <ClockIcon width={15} />
              {disabledText}
            </label>
          )}
        </button>
      )
    }

    return (
      <>
        {toolTipProps ? (
          <Tooltip
            variant={toolTipProps.variant ?? 'primary'}
            endAdornment={toolTipProps.endAdornment}
            startAdornment={toolTipProps.startAdornment}
            position={toolTipProps.position ?? 'right'}
            content={toolTipProps.content ?? ''}
            noOpacity={toolTipProps.noOpacity}
          >
            {renderTab()}
          </Tooltip>
        ) : (
          renderTab()
        )}
      </>
    )
  }
)

export default Tab
