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
  pickerType = 'month',
  ...props
}: InputProps & { pickerType?: 'month' | 'month-year' }) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const handleToggleDatePicker = () => setShowDatePicker(!showDatePicker)
  const [localValue, setLocalValue] = useState<number | string | null>(
    value as any
  )
  const [displayValue, setDisplayValue] = useState<string | undefined>()

  const handleDateChange = useCallback(
    (newDate: Date) => {
      let value
      if (pickerType === 'month') {
        value = newDate.getMonth().toString()
      } else {
        value = `${newDate.getFullYear().toString()} ${newDate
          .getMonth()
          .toString()}`
      }
      const event = {
        target: { value, name: props.name }
      }
      setLocalValue(Number(event.target.value))
      setShowDatePicker(!setShowDatePicker)
      onChange && onChange(event as ChangeEvent<HTMLInputElement>)
    },
    [localValue, onChange]
  )

  useEffect(() => {
    if (value === '') {
      setDisplayValue(undefined)
      setLocalValue(null)
      return
    }
    if (pickerType === 'month') {
      if (Number(value) > 11) {
        setDisplayValue(undefined)
        setLocalValue(null)
        return
      }
      setDisplayValue(monthNames[language ?? 'es'][Number(value)])
    } else {
      const [year, month] = String(value).split(' ')
      if (Number(month) > 11) {
        setDisplayValue(undefined)
        setLocalValue(null)
        return
      }
      setDisplayValue(`${monthNames[language ?? 'es'][Number(month)]} ${year}`)
    }
  }, [value, pickerType, language])

  return (
    <BaseInput
      {...props}
      type="text"
      disabled
      value={displayValue as any}
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
