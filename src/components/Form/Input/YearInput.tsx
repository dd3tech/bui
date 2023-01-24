import { useState, useMemo, ChangeEvent, useCallback } from 'react'
import { CalendarIcon } from '@heroicons/react/outline'
import BaseInput, { InputProps } from './BaseInput'
import DatePicker from 'components/DatePicker/DatePicker'
import { composeClasses } from 'lib/classes'

function YearInput({ className, value, onChange, ...props }: InputProps) {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [year, setYear] = useState<string>(String(value ?? ''))
    const handleToggleDatePicker = () => setShowDatePicker(!showDatePicker)

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!event.target.value.match(/^\d{0,4}$/)) return
            setYear(event.target.value)
            onChange && onChange(event)
        },
        [onChange, year]
    )

    const handleDateChange = useCallback(
        (newDate: Date) => {
            const newYear = newDate.getFullYear().toString()
            const event = { target: { value: newYear, name: props.name } }
            setYear(newYear)
            setShowDatePicker(!showDatePicker)
            onChange && onChange(event as ChangeEvent<HTMLInputElement>)
        },
        [onChange, year]
    )

    const currentDate = useMemo(() => {
        if (!year.length || Number(year) < 500) return undefined
        return new Date(`${year}/01/01`)
    }, [year])

    return (
        <BaseInput
            {...props}
            type="text"
            onChange={handleChange}
            value={year}
            maxLength={4}
            className={composeClasses('relative', className)}
            endAdornment={
                <>
                    <button role="toggle-calendar" onClick={handleToggleDatePicker}>
                        <CalendarIcon width={24} />
                    </button>
                    {showDatePicker && (
                        <DatePicker onlyOf="year" onChange={handleDateChange} value={currentDate} className="absolute top-14 right-0 text-black" />
                    )}
                </>
            }
        />
    )
}

export default YearInput
