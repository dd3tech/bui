/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import './progress.css'
import ProgressCircle from './ProgressCircle'
import ProgressLine from './ProgressLine'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * A string representing the type of progress component. It can be either 'circle'
   * or 'linear'.
   */
  type?: 'circle' | 'linear'
  /**
   * The size of the progress circle component in pixels.
   */
  circleSize?: number
  /**
   * The width of the progress line component.
   */
  width?: number | string
  /**
   * The height of the progress line component.
   */
  height?: number | string
  /**
   * The width of the line in the progress circle component.
   */
  lineWidth?: number
  /**
   * The value of the progress component. It must be between 0 and 100.
   */
  value?: number
  /**
   * A boolean indicating whether the progress component is in an indeterminate
   * state. If it is true, it will start a infinite animation.
   */
  indeterminate?: boolean
  /**
   * The color of the progress line.
   */
  progressLineColor?: string
  /**
   * The color of the progress line background.
   */
  backgroundLineColor?: string
  /**
   * The line cap of the progress line. In the progress circle component it is 'butt'
   * by default, and in the progress line component it is 'round' by default.
   */
  lineCap?: 'round' | 'square' | 'butt'
  /**
   * The children of the progress component.
   */
  children?: ReactNode
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      type = 'circle',
      value = 0,
      width = '100%',
      height = '6px',
      circleSize = 80,
      lineWidth = 8,
      indeterminate = false,
      progressLineColor = '#1d4ed8',
      backgroundLineColor = '#e5e7eb',
      lineCap,
      children,
      ...props
    },
    ref
  ) => {
    const [progress, setProgress] = useState<number>(value)

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    const strokeDasharray = useMemo(() => {
      const totalWidth = 2 * Math.PI * 45
      const progressPercentage = progress / 100
      const progressWidth = totalWidth * progressPercentage
      const spaceLineWidth = totalWidth - progressWidth
      return `${progressWidth} ${spaceLineWidth}`
    }, [progress])

    useEffect(() => {
      if (value < 0 || value > 100) return
      const updateProgress = () => {
        setProgress((prevProgress) => {
          const diff = value - prevProgress
          const step = Math.sign(diff)

          if (Math.abs(diff) > 1) {
            return prevProgress + step
          } else {
            return value
          }
        })
      }

      if (value !== progress) {
        timer.current && clearInterval(timer.current)
        timer.current = setInterval(updateProgress, 10)
      }

      return () => {
        timer.current && clearInterval(timer.current)
      }
    }, [value])

    useEffect(() => {
      if (value === progress) {
        timer.current && clearInterval(timer.current)
      }
    }, [progress, value])

    if (type === 'circle') {
      return (
        <ProgressCircle
          ref={ref}
          circleSize={circleSize}
          lineWidth={lineWidth}
          indeterminate={indeterminate}
          progressLineColor={progressLineColor}
          backgroundLineColor={backgroundLineColor}
          lineCap={lineCap}
          strokeDasharray={strokeDasharray}
          children={children}
          {...props}
        />
      )
    }

    return (
      <ProgressLine
        ref={ref}
        width={width}
        height={height}
        indeterminate={indeterminate}
        progressLineColor={progressLineColor}
        backgroundLineColor={backgroundLineColor}
        progress={progress}
        lineCap={lineCap}
        children={children}
        {...props}
      />
    )
  }
)

export default Progress
