import { ChangeEvent, useState } from 'react'
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog'
import Input from 'components/Form/Input'
import Text from 'components/Typography/Text'

export interface IRange {
    minVal?: number
    maxVal?: number
}

export interface FilterRangeProps {
    /**
     * Title displayed in the ConfirmDialog
     */
    title?: string
    /**
     * Text displayed above the minimum value input
     */
    textMin?: string
    /**
     * Text displayed above the maximum value input
     */
    textMax?: string
    /**
     * Minimum number allowed
     */
    min?: number
    /**
     * Maximum number allowed
     */
    max?: number
    /**
     * Minimum value by default in the input
     */
    defaultMin?: number
    /**
     * Maximum value by default in the input
     */
    defaultMax?: number
    /**
     * Text displayed on the button to apply
     */
    textApplyBtn?: string
    /**
     * Text displayed on the button to reset
     */
    textResetBtn?: string
    /**
     * The position in which the ConfirmDialog will be displayed
     */
    position?: { show: boolean; left: number; top: number }
    /**
     * The class name to apply to the ConfirmDialog
     */
    className?: string
    /**
     * The width of the ConfirmDialog
     */
    width?: number | string
    /**
     * Callback fired when the apply button is clicked
     * @param {IRange} range
     */
    onApply: (range: IRange) => void
    /**
     * Callback fired when the reset button is clicked
     */
    onReset?: () => void
}

const FilterRange = ({
    title,
    min = 0,
    max = 999999999,
    textMin = 'Minimum',
    textMax = 'Maximum',
    defaultMin,
    defaultMax,
    textApplyBtn = 'Apply',
    textResetBtn = 'Reset',
    position = { show: false, left: 0, top: 0 },
    className,
    width,
    onApply,
    onReset
}: FilterRangeProps) => {
    const [range, setRange] = useState<IRange>({ minVal: defaultMin, maxVal: defaultMax })

    const [inputMinVariant, setInputMinVariant] = useState<'active' | 'error'>('active')
    const [inputMaxVariant, setInputMaxVariant] = useState<'active' | 'error'>('active')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRange({
            ...range,
            [event.target.name]: Number(event.target.value)
        })
    }

    const apply = () => {
        setInputMinVariant('active')
        setInputMaxVariant('active')

        if (!range.minVal || (min && range.minVal && range.minVal < min)) {
            setInputMinVariant('error')
            return
        }
        if (!range.maxVal || (max && range.maxVal && range.maxVal > max)) {
            setInputMaxVariant('error')
            return
        }
        if (range.maxVal && range.minVal && range.maxVal < range.minVal) {
            setInputMinVariant('error')
            setInputMaxVariant('error')
            return
        }
        onApply(range)
    }

    const reset = () => {
        setRange({ minVal: defaultMin, maxVal: defaultMax })
        onReset && onReset()
    }

    return (
        <ConfirmDialog
            title={title}
            onConfirm={apply}
            onCancel={reset}
            textConfirmBtn={textApplyBtn}
            textCancelBtn={textResetBtn}
            position={position}
            className={className}
            width={width}
        >
            <div className="flex mb-3">
                <div className="grid">
                    <Text className="mb-1 text-xxs" fontBold="medium">
                        {textMin}
                    </Text>
                    <Input
                        data-testid="minVal"
                        name="minVal"
                        type="number"
                        placeholder={min?.toString()}
                        className="h-7 w-full pl-4 text-xs bg-white"
                        min={min}
                        value={range.minVal || ''}
                        onChange={handleChange}
                        variant={inputMinVariant}
                    />
                </div>
                <hr className="w-2.5 ml-3.5 mr-3.5 mb-3.5 mt-auto border-gray-900" style={{ minWidth: 12, borderTopWidth: 1.2 }} />
                <div className="grid">
                    <Text className="mb-1 text-xxs" fontBold="medium">
                        {textMax}
                    </Text>
                    <Input
                        data-testid="maxVal"
                        name="maxVal"
                        type="number"
                        placeholder={max?.toString()}
                        className="h-7 w-full text-xs bg-white"
                        max={max}
                        value={range.maxVal || ''}
                        onChange={handleChange}
                        variant={inputMaxVariant}
                    />
                </div>
            </div>
        </ConfirmDialog>
    )
}

export default FilterRange
