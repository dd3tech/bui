import { useEffect, useState, ReactElement, useLayoutEffect, useCallback } from 'react'
import { css } from '@emotion/css'

interface PopUpProps {
    active: boolean
    children?: ReactElement
    width?: string
    height?: string
    bgHeight?: string
    setClosePopUp: () => void
    animation?: boolean
    className?: string
    maxHeight?: string
}

export const PopUpCustom = ({ active, children, width, height, setClosePopUp, animation, className, ...props }: PopUpProps) => {
    const [isClose, setClose] = useState(false)

    const handleClose = () => {
        setClose(false)
        setClosePopUp()
    }

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handleClose()
        }
    }, [])

    const animationPopup = css`
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
    useEffect(() => {
        setClose(active)
    }, [active])

    useLayoutEffect(() => {
        document.addEventListener('keyup', handleKeyUp)
        return () => {
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return (
        <>
            <div
                role="popup-custom"
                className={`${!isClose ? 'hidden' : 'fixed'} top-0 w-full z-50 transition duration-1000 ease-in delay-1500`}
                style={{ backgroundColor: 'rgba(17, 24, 39, 0.75)', height: `100vh` }}
                onClick={handleClose}
                {...props}
            >
                <div className="flex items-center justify-center h-full">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute z-50 flex-wrap text-center flex drop-shadow-lg bg-white rounded-2xl ml-24 mb-6 mt-6  ${
                            animation ? animationPopup : ''
                        } ${className}`}
                        data-testid="popup-contain"
                        style={{ width, height }}
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
