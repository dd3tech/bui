import { ReactNode, useCallback, useState } from 'react'
import { composeClasses } from 'lib/classes'
import { Button } from 'components/Buttons'
import Tooltip from 'components/Tooltip'

export interface ToggleButtonProps {
  /** Whether the button is initially active */
  isActive: boolean
  /** Icon to display when the button is toggled on */
  iconOn: ReactNode
  /** Icon to display when the button is toggled off */
  iconOff: ReactNode
  /** Function to call when the button is toggled */
  onToggle: (isActive: boolean) => void
  /** Whether the button is disabled */
  disabled?: boolean
  /** Tooltip label to display when hovering over the button */
  tooltipLabel?: string
}

const ToggleButton = ({
  isActive,
  iconOn,
  iconOff,
  disabled,
  tooltipLabel,
  onToggle
}: ToggleButtonProps) => {
  const [isToggled, setIsToggled] = useState(isActive)

  const handleClick = useCallback(() => {
    if (disabled) return
    const newState = !isToggled
    setIsToggled(newState)
    onToggle(newState)
  }, [disabled, isToggled, onToggle])

  const toogleButtonComponent = () => (
    <Button
      role="toggle-button"
      variant="ghost"
      className={composeClasses(
        disabled
          ? 'text-white bg-gray-100 cursor-not-allowed'
          : 'text-blue-700 bg-white hover:bg-blue-500 hover:text-white',
        'w-9 h-9 flex items-center justify-center flex-shrink-0 border rounded-full transition ease-in duration-300'
      )}
      onClick={handleClick}
    >
      {isToggled ? iconOn : iconOff}
    </Button>
  )

  return tooltipLabel ? (
    <Tooltip content={tooltipLabel}>{toogleButtonComponent()}</Tooltip>
  ) : (
    toogleButtonComponent()
  )
}

export default ToggleButton
