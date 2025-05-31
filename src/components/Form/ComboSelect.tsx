import { CSSProperties, ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { Button } from 'components/Buttons'
import { Flex } from 'components/Layout'
import Text from 'components/Typography'

export interface ComboSelectProps {
  /**
   * Text displayed as the ComboSelect title
   */
  label: string
  /**
   * Child elements to be rendered inside the ComboSelect
   */
  children: ReactNode
  /**
   * Text displayed on the submit/apply button
   */
  submitText?: string
  /**
   * Text displayed on the clear/cancel button
   */
  clearText?: string
  /**
   * Additional CSS classes to customize the ComboSelect
   */
  className?: string
  /**
   * Inline CSS styles to customize the ComboSelect
   */
  style?: CSSProperties
  /**
   * Indicates whether to hide the divider between the content and actions
   */
  hideDivider?: boolean
  /**
   * Function executed when clicking the submit/apply button
   */
  onSubmit?: () => void
  /**
   * Function executed when clicking the clear/cancel button
   */
  onClear?: () => void
}

export const ComboSelect = ({
  label,
  children,
  submitText,
  clearText,
  hideDivider = false,
  className,
  style,
  onSubmit,
  onClear
}: ComboSelectProps) => {
  return (
    <div
      role="combo-select"
      className={composeClasses(
        className,
        'relative left-0 z-50 w-full bg-white overflow-y-auto top-1 rounded-lg shadow-lg'
      )}
      style={{ maxWidth: 350, ...style }}
    >
      <div role="combo-select-content" className="p-3">
        <Text role="combo-select-label" size="sm">
          {label}
        </Text>
        {children}
        <Flex
          role="combo-select-actions"
          justifyContent="between"
          alignItems="end"
          className={composeClasses(!hideDivider && 'border-t h-10')}
        >
          <Button
            role="combo-select-clear"
            className="w-full h-7"
            variant="ghost"
            size="small"
            onClick={onClear}
          >
            {clearText}
          </Button>
          <Button
            role="combo-select-submit"
            className="w-full h-7"
            size="small"
            paddingX="2"
            paddingY="0"
            onClick={onSubmit}
          >
            {submitText}
          </Button>
        </Flex>
      </div>
    </div>
  )
}

export default ComboSelect
