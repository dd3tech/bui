import { useState, useMemo, ChangeEvent, useCallback } from 'react'
import BaseInput, { InputProps } from './BaseInput'
import DatePicker from '../../DatePicker/DatePicker'
import { CalendarIcon } from '@heroicons/react/outline'
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

function DateInput({ className, value, onChange, language, ...props }: InputProps) {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [date, setDate] = useState(getDateFormat(String(value ?? '')))
    const handleToggleDatePicker = () => setShowDatePicker(!showDatePicker)

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.target.value = getDateFormat(event.target.value)
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
        if (!date.length) return 'active'
        if (!currentDate) return 'error'
        return 'active'
    }, [currentDate])

    return (
        <BaseInput
            {...props}
            type="text"
            variant={showVariant}
            onChange={handleChange}
            value={date}
            className={composeClasses('relative', className)}
            endAdornment={
                <>
                    <button role="active-calendar" onClick={handleToggleDatePicker}>
                        <CalendarIcon width={24} />
                    </button>
                    {showDatePicker && (
                        <DatePicker language={language} onChange={handleDateChange} value={currentDate} className="absolute top-14 right-0 text-black" />
                    )}
                </>
            }
        />
    )
}

export default DateInput
