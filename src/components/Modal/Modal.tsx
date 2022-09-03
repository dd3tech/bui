import React, { forwardRef } from 'react'
import { css } from '@emotion/css'

export interface ModalCustomProps extends React.HTMLAttributes<HTMLDivElement> {
    active: boolean
    width?: string
    height?: string
    bgHeight?: string
    setCloseModal: () => void
    animation?: boolean
    className?: string
    maxHeight?: string
    overlay?: boolean
}

const animationModal = css`
    animation: popup 0.5s;
    transition: height 0.08s ease-out;
    @keyframes popup {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
`

const Modal = forwardRef<HTMLDivElement, ModalCustomProps>((props: ModalCustomProps, ref) => {
    const { active, children, width, height, overlay = true, setCloseModal, animation, className } = props

    const [isClose, setClose] = React.useState(false)

    const dynamicClassName: () => string = React.useCallback(() => {
        const defaultClassName = 'absolute z-50 flex-wrap text-center flex drop-shadow-lg bg-white rounded-2xl ml-24 mb-6 mt-6'
        return `${defaultClassName} ${className ?? ''} ${animation ? animationModal : ''}`
    }, [className, animation])

    const handleClose = React.useCallback(() => {
        setClose(false)
        setCloseModal()
    }, [])

    const handleKeyUp = React.useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleClose()
        }
    }, [])

    React.useLayoutEffect(() => {
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    React.useEffect(() => {
        setClose(active)
    }, [active])

    if (!isClose) {
        return <></>
    }

    return (
        <>
            <div
                role="modal-custom"
                className={`${!isClose ? 'hidden' : 'fixed'} top-0 w-full z-50 transition duration-1000 ease-in delay-1500`}
                style={{ backgroundColor: overlay ? 'rgba(17, 24, 39, 0.75)' : '', height: `100vh` }}
                onClick={handleClose}
                {...props}
            >
                <div className="flex items-center justify-center h-full">
                    <div onClick={(e) => e.stopPropagation()} className={dynamicClassName()} data-testid="modal-contain" style={{ width, height }}>
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
})

Modal.displayName = 'Modal'
Modal.defaultProps = {
    active: false,
    children: undefined,
    overlay: true,
    animation: true,
    className: undefined
}

export default Modal
