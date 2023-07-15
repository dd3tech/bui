import {
  Fragment,
  ReactElement,
  ReactNode,
  cloneElement,
  createElement,
  useCallback,
  useEffect
} from 'react'
import { composeClasses } from 'lib/classes'
import useTooltip from 'hooks/useTooltip'
import { Portal } from 'common/Portal/Portal'
import Card from '../Card/Card'
import Text from '../Typography/Text'
import Button from '../Buttons/Button'

export interface ConfirmDialogAddonsProps {
  actionContent: ReactElement
  usePortal?: boolean
}

export interface ConfirmDialogProps extends ConfirmDialogAddonsProps {
  title?: string
  children: ReactNode
  textConfirmBtn?: string
  textCancelBtn?: string
  handleCancel?: () => void
  handleConfirm: () => void
  preventCloseHandleCancel?: boolean
  preventCloseHandleConfirm?: boolean
  className?: string
  width?: number | string
}

function generateUniqueId() {
  const timestamp = new Date().getUTCMilliseconds()
  return timestamp + Math.random().toString(36)
}

const DialogWrapper = ({
  usePortal,
  children
}: Partial<{
  children: ReactNode
  usePortal?: ConfirmDialogProps['usePortal']
}>) => {
  const genericId = generateUniqueId()
  const element = usePortal ? Portal : Fragment
  return createElement(
    element,
    usePortal && ({ idRoot: `dialog-${genericId}` } as any),
    children
  )
}

const ConfirmDialog = ({
  title,
  actionContent,
  children,
  textConfirmBtn = 'Apply',
  textCancelBtn = 'Reset',
  className,
  width,
  handleConfirm,
  handleCancel,
  usePortal = true,
  preventCloseHandleCancel = false,
  preventCloseHandleConfirm = false
}: ConfirmDialogProps) => {
  const { refs, isVisible, handleOnClick, handleSetIsVisible } = useTooltip({
    placement: 'bottom-end'
  })

  const { refElement, popperElement, popperInstance } = refs
  const clonedChildren = cloneElement(actionContent, {
    ref: refElement,
    onClick: handleOnClick
  })

  const handleClickOutside = useCallback((e: globalThis.MouseEvent) => {
    if (!popperInstance?.current) return

    if (
      popperElement.current &&
      !popperElement.current.contains(e.target as Node) &&
      refElement.current &&
      !refElement.current.contains(e.target as Node)
    ) {
      handleSetIsVisible(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
      {clonedChildren}
      <DialogWrapper usePortal={usePortal}>
        {isVisible && (
          <Card
            onClick={(e) => e.stopPropagation()}
            ref={popperElement}
            rounded="lg"
            className={composeClasses('w-max bg-white', className)}
            width={width}
          >
            {title && (
              <Text
                variant="p"
                className="text-info mb-4 text-xxs font-semibold"
              >
                {title}
              </Text>
            )}
            {children}
            <div className="flex gap-4 justify-end mt-1.5">
              {typeof handleCancel !== 'undefined' && (
                <Button
                  role="cancel-btn"
                  variant="link"
                  className="underline text-xs disabled:opacity-75 text-black"
                  style={{ padding: 0, fontWeight: 600 }}
                  onClick={() => {
                    if (!preventCloseHandleCancel) {
                      handleSetIsVisible(false)
                    }

                    handleCancel()
                  }}
                >
                  {textCancelBtn}
                </Button>
              )}
              <Button
                role="confirm-btn"
                variant="link"
                className="underline text-xs disabled:opacity-75 text-blue-500"
                style={{ padding: 0, fontWeight: 600 }}
                onClick={() => {
                  if (!preventCloseHandleConfirm) {
                    handleSetIsVisible(false)
                  }

                  handleConfirm()
                }}
              >
                {textConfirmBtn}
              </Button>
            </div>
          </Card>
        )}
      </DialogWrapper>
    </>
  )
}

export default ConfirmDialog
