import { useState, useEffect, useRef, forwardRef } from 'react'
import { composeClasses } from 'lib/classes'
import { ANIMATION_LIST } from 'lib/animations'
import { AnimationsTypes } from 'interfaces'
import './transition.css'

interface TransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean
  animationStart?: AnimationsTypes
  animationEnd?: AnimationsTypes
  duration?: number
  delay?: number
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
  alwaysRender?: boolean
  children: React.ReactNode
}

const Transition = forwardRef<HTMLDivElement, TransitionProps>(
  (
    {
      animationStart = 'fadeIn',
      animationEnd = 'fadeOut',
      alwaysRender = false,
      show = true,
      duration = 300,
      delay = 0,
      fillMode = 'both',
      timingFunction = 'linear',
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [animationType, setanimationType] = useState<AnimationsTypes>(
      ANIMATION_LIST[animationStart] as AnimationsTypes
    )

    const timer = useRef<null | ReturnType<typeof setTimeout>>(null)

    useEffect(() => {
      timer.current && clearTimeout(timer.current)

      if (show) {
        setIsVisible(true)
        setanimationType(ANIMATION_LIST[animationStart] as AnimationsTypes)
      } else {
        setanimationType(ANIMATION_LIST[animationEnd] as AnimationsTypes)
        timer.current = setTimeout(() => {
          setIsVisible(false)
        }, duration)
      }
      return () => {
        timer.current && clearTimeout(timer.current)
      }
    }, [show])

    if (!isVisible && !alwaysRender) {
      return null
    }

    return (
      <div
        {...props}
        ref={ref}
        role="transition"
        style={{
          display: 'inline-block',
          animationDuration: `${duration}ms`,
          animationDelay: `${delay}ms`,
          animationFillMode: fillMode,
          animationTimingFunction: timingFunction,
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: timingFunction,
          ...props.style
        }}
        className={composeClasses(animationType, 'transition', props.className)}
      >
        {children}
      </div>
    )
  }
)

export default Transition
