/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  forwardRef,
  HTMLAttributes,
  ElementType,
  useMemo,
  ReactNode
} from 'react'
import { composeClasses, spacing, borderRadius, border } from 'lib'

import Flex from '../Layout/Flex'
import Text from '../Typography'

type Variants = 'success' | 'info' | 'warning' | 'error'

export const calloutVariants: { [Variants: string]: string } = {
  success: 'bg-green-50 border-green-500 text-green-700',
  info: 'bg-blue-50 border-blue-500 text-blue-700',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
  error: 'bg-red-50 border-red-500 text-red-700'
}

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * This prop is used to render an icon in the Callout.
   * rendered before the title.
   */
  icon?: ElementType
  /**
   * This prop is used to render a description in the Callout.
   */
  description?: string
  /**
   * This prop is used to set the variant of the Callout.
   * It expects a value of 'info', 'warning', 'error' or 'success'
   * type that represents the variant of the Callout.
   */
  variant?: Variants
  /**
   * This prop is used to render a title in the Callout.
   * required.
   */
  title: string
  /**
   * This prop is used to render a call-to-action element within the Callout.
   * It can be a button, link, or any other interactive element that prompts
   * the user to take a specific action.
   */
  callToAction?: ReactNode
}

const Callout = forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const {
    title,
    description,
    variant = 'success',
    icon: Icon,
    className,
    callToAction,
    ...otherProps
  } = props

  const calloutClasses = useMemo(
    () =>
      composeClasses(
        calloutVariants[variant],
        spacing.lg.paddingRight,
        spacing.xxl.paddingLeft,
        border.lg.left,
        borderRadius.md.all,
        spacing.lg.paddingY,
        className
      ),
    [variant, className]
  )

  return (
    <div ref={ref} className={calloutClasses} {...otherProps} role="alert">
      <Flex alignItems="start">
        {Icon && (
          <Icon
            className={composeClasses('h-5 w-5', spacing.xs.marginRight)}
            aria-hidden="true"
            data-testid="callout-icon"
          />
        )}
        <Text variant="h4" size="sm" bold>
          {title}
        </Text>
      </Flex>
      <Flex justifyContent="between">
        <Text variant="p" size="sm" className={spacing.sm.marginTop}>
          {description}
        </Text>
        {callToAction}
      </Flex>
    </div>
  )
})

Callout.displayName = 'Callout'
export default Callout
