/*
 * Copyright (c) DD360 and its affiliates.
 */

import { useState, ChangeEvent, useCallback, useEffect } from 'react'
import { CalendarIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'

import BaseInput, { InputProps } from './BaseInput'
import DatePicker from '../../DatePicker/DatePicker'

const monthNames = {
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
}

function MonthInput({
  className,
  value,
  onChange,
  language,
  pickerType,
  ...props
}: InputProps & { pickerType: 'month' | 'month-year' }) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const handleToggleDatePicker = () => setShowDatePicker(!showDatePicker)
  const [localValue, setLocalValue] = useState(
    typeof value === 'number' ? value : null
  )

  const handleDateChange = useCallback(
    (newDate: Date) => {
      const event = {
        target: { value: newDate.getMonth().toString(), name: props.name }
      }
      setLocalValue(Number(event.target.value))
      setShowDatePicker(!setShowDatePicker)
      onChange && onChange(event as ChangeEvent<HTMLInputElement>)
    },
    [localValue, onChange]
  )

  useEffect(() => {
    if (value === '') setLocalValue(null)
  }, [value])

  return (
    <BaseInput
      {...props}
      type="text"
      disabled
      value={
        localValue !== null
          ? localValue < monthNames.en.length
            ? monthNames[language ?? 'es'][localValue]
            : ''
          : ''
      }
      className={composeClasses('relative', className)}
      endAdornment={
        <>
          <button
            role="active-calendar"
            type="button"
            onClick={handleToggleDatePicker}
          >
            <CalendarIcon width={24} />
          </button>
          {showDatePicker && (
            <DatePicker
              language={language}
              onlyOf={pickerType}
              onChange={handleDateChange}
              className="absolute top-14 right-0 text-black"
            />
          )}
        </>
      }
    />
  )
}

export default MonthInput
