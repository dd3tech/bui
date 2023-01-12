import { useEffect, useState, useRef, RefObject } from 'react'
import './multiRangeSlider.css'

interface IRage {
    min: number
    max: number
}

export interface MultiRangeSliderProps {
    min: number
    max: number
    onChange: (rage: IRage) => void
    barColor?: string
    sizeBar?: 'small' | 'medium' | 'large'
    size?: 'small' | 'medium' | 'large'
    minValDisabled?: boolean
    maxValDisabled?: boolean
    className?: string
}

const barSizeVariants: { [key: string]: string } = {
    small: 'h-1',
    medium: 'h-1.5',
    large: 'h-2'
}

const thumbMargin: { [key: string]: string } = {
    small: 'mt-0',
    medium: 'mt-px',
    large: 'mt-0.5'
}

export const getPercent = (value: number, min: number, max: number) => Math.round(((value - min) / (max - min)) * 100)

export const updateBar = (input: HTMLInputElement, range: RefObject<HTMLDivElement>, minMaxVal: number, min: number, max: number) => {
    const minPercent = getPercent(input.name === 'max-val' ? minMaxVal : Number(input.value), min, max)
    const maxPercent = getPercent(input.name === 'max-val' ? Number(input.value) : minMaxVal, min, max)

    if (range.current) {
        range.current.style.left = `${minPercent}%`
        range.current.style.width = `${maxPercent - minPercent}%`
    }
}

const MultiRangeSlider = ({ min, max, onChange, barColor, sizeBar = 'small', size, className, minValDisabled, maxValDisabled }: MultiRangeSliderProps) => {
    const [minVal, setMinVal] = useState(min)
    const [maxVal, setMaxVal] = useState(max)
    const minValRef = useRef<HTMLInputElement>(null)
    const maxValRef = useRef<HTMLInputElement>(null)
    const range = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (maxValRef.current) {
            updateBar(maxValRef.current, range, minVal, min, max)
        }
    }, [minVal])

    useEffect(() => {
        if (minValRef.current) {
            updateBar(minValRef.current, range, maxVal, min, max)
        }
    }, [maxVal])

    useEffect(() => {
        onChange({ min: minVal, max: maxVal })
    }, [minVal, maxVal, onChange])

    return (
        <div className={`${className ?? ''} relative multi-slider`}>
            <input
                name="min-val"
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(event) => {
                    // We always obtain a value lower than the maximum selected, since the maximum is reserved for the input maxVal
                    const value = Math.min(Number(event.target.value), maxVal - 1)
                    setMinVal(value)
                    event.target.value = value.toString()
                }}
                disabled={minValDisabled}
                className={`thumb z-30 absolute pointer-events-none h-0 w-full outline-none ${thumbMargin[sizeBar]} ${size}`}
            />
            <input
                name="max-val"
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event) => {
                    // We always obtain a value greater than the selected minimum, since the minimum is reserved for the input minVal
                    const value = Math.max(Number(event.target.value), minVal + 1)
                    setMaxVal(value)
                    event.target.value = value.toString()
                }}
                disabled={maxValDisabled}
                className={`thumb z-40 absolute pointer-events-none h-0 w-full outline-none ${thumbMargin[sizeBar]} ${size}`}
            />

            <div className="relative w-full">
                <div className={`bar absolute w-full rounded bg-blue-100 z-10 ${barSizeVariants[sizeBar]}`} />
                <div
                    role="range-bar"
                    ref={range}
                    className={`absolute rounded bg-blue-800 z-20 ${barSizeVariants[sizeBar]} ${sizeBar}`}
                    style={{ backgroundColor: barColor }}
                />
            </div>
        </div>
    )
}

export default MultiRangeSlider
