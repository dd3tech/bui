import { useState, useMemo, ChangeEvent, useCallback, useEffect } from 'react'
import BaseInput, { InputProps } from './BaseInput'
import DatePicker from '../../DatePicker/DatePicker'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'
import { composeClasses } from 'lib/classes'

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\d\d$/
function getDateFormat(value: string) {
    if (value.match(dateRegex)) return value
    let newValue = value.replace(/[^0-9]/g, '')
    let splitValue = newValue.split('')
    if (splitValue.length >= 2) {
        splitValue.splice(2, 0, '/')
    }
    if (splitValue.length >= 5) {
        splitValue.splice(5, 0, '/')
    }
    if (splitValue.length >= 9) {
        splitValue.splice(10, 5, '')
    }
    newValue = splitValue.join('')
    return newValue
}

function formatInput(date: string) {
    let inputText = date
    inputText = inputText.replace(/\D/g, '')
    if (inputText.length > 2 && inputText.charAt(2) !== '/') inputText = inputText.slice(0, 2) + '/' + inputText.slice(2, inputText.length)
    if (inputText.length > 5 && inputText.charAt(5) !== '/') inputText = inputText.slice(0, 5) + '/' + inputText.slice(5, inputText.length)

    return inputText.slice(0, 10)
}

function DateInput({ className, value, onChange, language, disabled, variant, ...props }: InputProps) {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [date, setDate] = useState(getDateFormat(String(value ?? '')))
    const handleToggleDatePicker = () => setShowDatePicker(!showDatePicker)

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.target.value = formatInput(event.target.value)
            setDate(event.target.value)
            onChange && onChange(event)
        },
        [onChange, date]
    )

    const handleDateChange = useCallback(
        (newDate: Date) => {
            const dateString = newDate.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
            setDate(dateString)
            const event = { target: { value: dateString, name: props.name } }
            onChange && onChange(event as ChangeEvent<HTMLInputElement>)
        },
        [onChange, date]
    )

    const onDaySelected = useCallback(() => setShowDatePicker(false), [showDatePicker])

    const currentDate = useMemo(() => {
        const dateArray = date.split('/')
        let newDate = undefined
        if (dateArray.length) {
            const day = dateArray[0]
            const month = dateArray[1]
            const year = dateArray[2]
            const format = `${year}/${month}/${day}`
            if (!isNaN(Date.parse(format))) {
                newDate = new Date(format)
            }
        }
        return newDate
    }, [date])

    const showVariant = useMemo(() => {
        if (variant) return variant
        if (!date.length) return 'active'
        if (!currentDate) return 'error'
        if (date?.length !== 10) return 'error'

        return 'active'
    }, [currentDate, variant])

    useEffect(() => {
        if (value) setDate(getDateFormat(String(value)))
    }, [value])

    return (
        <BaseInput
            {...props}
            type="text"
            disabled={disabled}
            variant={showVariant}
            onChange={handleChange}
            value={date}
            className={composeClasses('relative', className)}
            endAdornment={
                <>
                    <button role="active-calendar" type="button" disabled={disabled} onClick={handleToggleDatePicker}>
                        <CalendarIcon width={24} />
                    </button>
                    {showDatePicker && (
                        <DatePicker
                            language={language}
                            onChange={handleDateChange}
                            onDaySelected={onDaySelected}
                            value={currentDate}
                            className="absolute top-14 right-0 text-black"
                            minDate={props.min ? new Date(props.min) : undefined}
                            maxDate={props.max ? new Date(props.max) : undefined}
                        />
                    )}
                </>
            }
        />
    )
}

export default DateInput
