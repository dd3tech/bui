/*
 * Copyright (c) DD360 and its affiliates.
*/

import { forwardRef } from 'react'
import { useModalManager } from 'hooks'
import { composeClasses } from 'lib/classes'
import './modal.css'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Required.
   * This prop indicates if the modal is active or not.
   */
  active: boolean
  /**
   * Optional.
   * This prop indicates if an animation should be applied to the modal.
   */
  animation?: boolean
  /**
   * Optional.
   * This prop defines the height of the modal's background.
   */
  bgHeight?: string
  /**
   * Optional.
   * This prop indicates if a blur effect should be applied to the modal's background.
   */
  blur?: boolean
  /**
   * Optional.
   * Prop to assign additional CSS classes to the modal.
   */
  className?: string
  /**
   * Optional.
   * Indicates if the modal should occupy the entire screen or not
   */
  fullScreen?: boolean
  /**
   * Optional.
   * This prop defines the height of the modal.
   */
  height?: string
  /**
   * Optional.
   * This prop defines the maxHeight of the modal.
   */
  maxHeight?: string
  /**
   * Optional.
   * This prop indicates if a dark overlay should be shown behind the modal.
   */
  overlay?: boolean
  /**
   * Optional.
   * This prop indicates if the modal should prevent closing.
   */
  preventClose?: boolean
  /**
   * Required.
   * This prop indicates callback that is executed when the modal is closed.
   */
  setCloseModal: () => void
  /**
   * Optional.
   * This prop defines the width of the modal.
   */
  width?: string
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      active,
      animation,
      blur,
      children,
      className,
      fullScreen,
      height,
      overlay = true,
      preventClose,
      setCloseModal,
      width,
      ...props
    }: ModalProps,
    ref
  ) => {
    const { isOpen, handleModalClose } = useModalManager({
      open: active,
      onClose: setCloseModal,
      preventClose
    })

    const containerClasses = composeClasses(
      'top-0 left-0 right-0 bottom-0 w-full z-50 transition duration-1000 ease-in delay-1500 h-screen',
      blur && 'blur-sm',
      !isOpen ? 'hidden' : 'fixed'
    )

    const dynamicClassName = composeClasses(
      'absolute z-50 flex-wrap text-center flex drop-shadow-lg bg-white bottom-0 rounded-t-2xl',
      'md:bottom-auto md:w-auto md:rounded-2xl md:mb-6 md:mt-6',
      animation && 'animation-modal',
      className
    )

    if (!isOpen) return null

    return (
      <>
        <div
          ref={ref}
          role="modal-custom"
          className={containerClasses}
          style={{
            backgroundColor: overlay && !blur ? 'rgba(17, 24, 39, 0.75)' : ''
          }}
          onClick={handleModalClose}
          {...props}
        >
          <div className="flex items-center justify-center h-full">
            <div
              onClick={(e) => e.stopPropagation()}
              className={dynamicClassName}
              data-testid="modal-content"
              style={{
                width: !fullScreen ? width : '100%',
                height: !fullScreen ? height : '100%'
              }}
            >
              <div
                role="btn-close"
                onClick={handleModalClose}
                className="absolute top-0 right-0  mr-6 cursor-pointer mt-6"
              >
                <svg
                  className="cursor-pointer"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 17L17 1M1 1L17 17"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="mt-4 mb-4 w-full">{children}</div>
            </div>
          </div>
        </div>
      </>
    )
  }
)

Modal.displayName = 'Modal'
Modal.defaultProps = {
  active: false,
  animation: true,
  children: undefined,
  className: undefined,
  overlay: true,
  blur: false,
  preventClose: false,
  fullScreen: false
}

export default Modal
