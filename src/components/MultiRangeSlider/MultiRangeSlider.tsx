import { useEffect, useState, useRef, RefObject } from 'react'
import { composeClasses } from 'lib/classes'
import './multiRangeSlider.css'

export interface IRangeSlider {
    min: number
    max: number
}

export interface MultiRangeSliderProps {
    /**
     * Minimum value that can be selected.
     */
    min: number
    /**
     * Maximum value that can be selected.
     */
    max: number
    /**
     * The initial value for the minimum value input. If not provided,
     * it will default to the minimum value.
     */
    initMinValue?: number
    /**
     * The initial value for the maximum value input. If not provided,
     * it will default to the maximum value.
     */
    initMaxValue?: number
    /**
     * A callback function that will be called whenever the selected range changes.
     * It receives an object with the properties min and max.
     * @param range
     */
    onChange: (range: IRangeSlider) => void
    /**
     * Bar color
     */
    barColor?: string
    /**
     * Bar height
     */
    sizeBar?: 'small' | 'medium' | 'large'
    /**
     * Bar controls (thumbs) size
     */
    size?: 'small' | 'medium' | 'large'
    /**
     * Indicates if the minimum value input is disabled.
     */
    minValDisabled?: boolean
    /**
     * Indicates if the maximum value input is disabled
     */
    maxValDisabled?: boolean
    /**
     * The class name to apply to the ConfirmDialog
     */
    className?: string
    /**
     * A boolean that forces the component to update its value with the initMinValue and initMaxValue.
     */
    fireReset?: boolean
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

const getPercent = (value: number, min: number, max: number) => Math.round(((value - min) / (max - min)) * 100)

export const updateBar = (input: HTMLInputElement, range: RefObject<HTMLDivElement>, minMaxVal: number, min: number, max: number) => {
    const minPercent = getPercent(input.name === 'max-val' ? minMaxVal : Number(input.value), min, max)
    const maxPercent = getPercent(input.name === 'max-val' ? Number(input.value) : minMaxVal, min, max)

    if (range.current) {
        range.current.style.left = `${minPercent}%`
        range.current.style.width = `${maxPercent - minPercent}%`
    }
}

const MultiRangeSlider = ({
    min,
    max,
    initMinValue,
    initMaxValue,
    fireReset,
    onChange,
    barColor,
    sizeBar = 'small',
    size,
    className,
    minValDisabled,
    maxValDisabled
}: MultiRangeSliderProps) => {
    const initValue = { min: initMinValue ?? min, max: initMaxValue ?? max }
    const [minVal, setMinVal] = useState(initValue.min)
    const [maxVal, setMaxVal] = useState(initValue.max)
    const minValRef = useRef<HTMLInputElement>(null)
    const maxValRef = useRef<HTMLInputElement>(null)
    const range = useRef<HTMLDivElement>(null)

    const updateMin = (val: number) => {
        // We always obtain a value lower than the maximum selected, since the maximum is reserved for the input maxVal
        const minValue = Math.min(val, maxVal - 1)
        setMinVal(minValue)
        if (minValRef.current) {
            minValRef.current.value = minValue.toString()
        }
        maxValRef.current && updateBar(maxValRef.current, range, minValue, min, max)
    }

    const updateMax = (val: number) => {
        // We always obtain a value greater than the selected minimum, since the minimum is reserved for the input minVal
        const maxValue = Math.max(val, minVal + 1)
        setMaxVal(maxValue)
        if (maxValRef.current) {
            maxValRef.current.value = maxValue.toString()
        }
        minValRef.current && updateBar(minValRef.current, range, maxValue, min, max)
    }

    useEffect(() => {
        onChange({ min: minVal, max: maxVal })
    }, [minVal, maxVal])

    useEffect(() => {
        updateMin(initValue.min)
        updateMax(initValue.max)
    }, [fireReset])

    return (
        <div className={composeClasses('relative multi-slider', className)}>
            <input
                name="min-val"
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(event) => updateMin(Number(event.target.value))}
                disabled={minValDisabled}
                className={composeClasses('thumb z-30 absolute pointer-events-none h-0 w-full outline-none', thumbMargin[sizeBar], size)}
            />
            <input
                name="max-val"
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event) => updateMax(Number(event.target.value))}
                disabled={maxValDisabled}
                className={composeClasses('thumb z-40 absolute pointer-events-none h-0 w-full outline-none', thumbMargin[sizeBar], size)}
            />

            <div className="relative w-full">
                <div className={composeClasses('bar absolute w-full rounded bg-blue-100 z-10', barSizeVariants[sizeBar])} />
                <div
                    role="range-bar"
                    ref={range}
                    className={composeClasses('absolute rounded bg-blue-800 z-20', barSizeVariants[sizeBar], sizeBar)}
                    style={{ backgroundColor: barColor }}
                />
            </div>
        </div>
    )
}

export default MultiRangeSlider
