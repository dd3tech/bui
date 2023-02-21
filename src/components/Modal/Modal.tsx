import { useCallback, useEffect, useLayoutEffect, useState, forwardRef } from 'react'
import { composeClasses } from 'lib/classes'
import './modal.css'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    active: boolean
    animation?: boolean
    bgHeight?: string
    blur?: boolean
    className?: string
    fullScreen?: boolean
    height?: string
    maxHeight?: string
    overlay?: boolean
    preventClose?: boolean
    setCloseModal: () => void
    width?: string
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
    (
        {
            active,
            animation,
            bgHeight,
            blur,
            children,
            className,
            fullScreen,
            height,
            maxHeight,
            overlay = true,
            preventClose,
            setCloseModal,
            width,
            ...props
        }: ModalProps,
        ref
    ) => {
        const [isClose, setClose] = useState<boolean>(false)

        const containerClasses = composeClasses(
            'top-0 w-full z-50 transition duration-1000 ease-in delay-1500 h-screen',
            blur && 'blur-sm',
            !isClose ? 'hidden' : 'fixed'
        )

        const dynamicClassName = composeClasses(
            'absolute z-50 flex-wrap text-center flex drop-shadow-lg bg-white bottom-0 rounded-t-2xl',
            'md:bottom-auto md:w-auto md:rounded-2xl md:mb-6 md:mt-6',
            animation && 'animation-modal',
            className
        )

        const handleClose = useCallback(() => {
            setClose(false)
            setCloseModal()
        }, [])

        const handleKeyUp = useCallback((event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose()
            }
        }, [])

        useLayoutEffect(() => {
            document.addEventListener('keyup', handleKeyUp)
            return () => {
                document.removeEventListener('keyup', handleKeyUp)
            }
        }, [])

        useEffect(() => {
            setClose(active)
        }, [active])

        if (!isClose) return null

        return (
            <>
                <div
                    ref={ref}
                    role="modal-custom"
                    className={containerClasses}
                    style={{ backgroundColor: overlay && !blur ? 'rgba(17, 24, 39, 0.75)' : '' }}
                    onClick={() => !preventClose && handleClose()}
                    {...props}
                >
                    <div className="flex items-center justify-center h-full">
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={dynamicClassName}
                            data-testid="modal-content"
                            style={{ width: !fullScreen ? width : '100%', height: !fullScreen ? height : '100%' }}
                        >
                            <div role="btn-close" onClick={handleClose} className="absolute top-0 right-0  mr-6 cursor-pointer mt-6">
                                <svg className="cursor-pointer" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 17L17 1M1 1L17 17" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
