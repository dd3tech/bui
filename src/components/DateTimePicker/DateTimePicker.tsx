/*
 * Copyright (c) DD360 and its affiliates.
 */
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { CalendarIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'
import BaseInput, { InputProps } from 'components/Form/Input/BaseInput'

import Calendar from './Calendar'
import Clock from './Clock'

export interface IDateTimePicker {
  minDate?: Date
  maxDate?: Date
  readonly style?: CSSProperties
  readonly className?: string
  readonly handleDateChange?: (date: Date) => void
  readonly pickerClassName?: string
}

export type DateTimePickerProps = IDateTimePicker & InputProps

function formatInput(date: string) {
  let inputText = date
  if (inputText.length > 2 && inputText.charAt(2) !== '/') {
    inputText =
      inputText.slice(0, 2) + '/' + inputText.slice(2, inputText.length)
  }
  if (inputText.length > 5 && inputText.charAt(5) !== '/') {
    inputText =
      inputText.slice(0, 5) + '/' + inputText.slice(5, inputText.length)
  }
  if (inputText.length > 10 && inputText.charAt(10) !== ' ') {
    inputText =
      inputText.slice(0, 10) + ' ' + inputText.slice(10, inputText.length)
  }
  if (inputText.length > 13 && inputText.charAt(13) !== ':') {
    inputText =
      inputText.slice(0, 13) + ':' + inputText.slice(13, inputText.length)
  }
  if (inputText.length > 16 && inputText.charAt(16) !== ' ') {
    inputText =
      inputText.slice(0, 16) + ' ' + inputText.slice(16, inputText.length)
  }

  return inputText.slice(0, 19).toUpperCase()
}

function validateDate(date: Date, minDate?: Date, maxDate?: Date) {
  if (minDate && maxDate)
    return (
      date.valueOf() >= minDate?.valueOf() &&
      date.valueOf() <= maxDate?.valueOf()
    )
  if (minDate) return date.valueOf() >= minDate?.valueOf()
  if (maxDate) return date.valueOf() <= maxDate?.valueOf()
  return true
}

const DateTimePicker = ({
  className,
  value,
  onChange,
  variant,
  isDisabled,
  handleDateChange,
  pickerClassName,
  minDate,
  maxDate,
  ...props
}: DateTimePickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showDateTimePicker, setShowDateTimePicker] = useState<boolean>(false)
  const [dateTime, setDateTime] = useState(formatInput(String(value ?? '')))
  const currentDate = useMemo(() => {
    const [date, time, amPm] = dateTime.split(' ')
    const dateArray = date.split('/')

    let newDate = undefined
    let timeFormat = '00:00'

    if (dateArray.length === 3) {
      const [day, month, year] = dateArray

      const timeArray = time?.split(':')
      if (timeArray?.length) {
        const [hour, minutes] = timeArray
        timeFormat = `${hour ?? '00'}:${minutes ?? '00'}`
      }
      const format = `${year}-${month}-${day} ${timeFormat}`
      const current = new Date(format)
      const dateTimeObj = {
        date: current,
        time: `${timeFormat} ${amPm}`
      }

      newDate = !isNaN(current.getTime()) ? dateTimeObj : undefined
    }
    return newDate
  }, [dateTime])

  const showVariant = useMemo(() => {
    if (variant) return variant
    if (!dateTime.length) return 'default'
    if (!currentDate?.date) return 'error'
    if (dateTime?.length !== 19) return 'error'
    if (!validateDate(currentDate.date, minDate, maxDate)) return 'error'

    return 'default'
  }, [currentDate, variant])

  // handlers
  const handleReturnDateTime = useCallback(
    (dateTimeInput?: string) => {
      if (!dateTimeInput) return
      const dateTimeArr = dateTimeInput.split(' ')
      if (dateTimeArr.length === 3) {
        const [date, time, amPm] = dateTimeArr
        const [day, month, year] = date.split('/')
        const [hour, minutes] = time.split(':')

        const twentyFourHours = amPm === 'PM' ? Number(hour) + 12 : Number(hour)
        const correctHour =
          twentyFourHours === 12 || twentyFourHours === 24
            ? twentyFourHours - 12
            : twentyFourHours

        const timeFormat = `${correctHour}:${minutes}`
        const newDate = new Date(`${year}-${month}-${day} ${timeFormat}`)
        validateDate(newDate, minDate, maxDate)
        handleDateChange && handleDateChange(newDate)
      }
    },
    [handleDateChange]
  )

  const handleTogglePicker = useCallback(
    () => setShowDateTimePicker(!showDateTimePicker),
    [showDateTimePicker]
  )

  const handleInputChanges = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.value = formatInput(event.target.value)
      setDateTime(event.target.value)
      onChange && onChange(event)
      handleReturnDateTime(event.target.value)
    },
    [onChange, dateTime]
  )
  const handlePickerChanges = useCallback(
    (val: { [key: string]: string }) => {
      const { date, hour, minutes, ampm } = val
      let newDate
      setDateTime((prev) => {
        const [datePrev, timePrev, amPmPrev] = prev.split(' ')
        newDate = date
          ? `${date} ${timePrev ?? ''} ${amPmPrev ?? ''}`
          : `${datePrev} ${hour}:${minutes} ${ampm}`
        return newDate
      })
      handleReturnDateTime(newDate)
    },
    [dateTime]
  )

  const handleClickOutside = useCallback(
    (e: globalThis.MouseEvent) => {
      const container = containerRef?.current
      if (container && !container.contains(e.target as Node)) {
        setShowDateTimePicker(false)
      }
    },
    [containerRef]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef}>
      <BaseInput
        {...props}
        type="text"
        value={dateTime}
        disabled={isDisabled}
        variant={showVariant}
        onChange={handleInputChanges}
        className={composeClasses('relative', className)}
        min={props.min}
        max={props.max}
        endAdornment={
          <>
            <button
              type="button"
              role="active-calendar"
              disabled={isDisabled}
              onClick={handleTogglePicker}
            >
              <CalendarIcon
                width={24}
                className={composeClasses(
                  'cursor-pointer transition-all duration-150 ease-in-out',
                  showDateTimePicker && 'text-blue-400',
                  isDisabled && 'cursor-not-allowed'
                )}
              />
            </button>
            {showDateTimePicker && (
              <div
                className={composeClasses(
                  'flex gap-4 flex-col md:flex-row absolute mt-2 top-full right-0 rounded-lg bg-white border p-4 w-auto',
                  pickerClassName
                )}
              >
                <Calendar
                  {...props}
                  value={currentDate?.date}
                  onChange={handlePickerChanges}
                />
                <Clock
                  value={currentDate}
                  handleChanges={handlePickerChanges}
                />
              </div>
            )}
          </>
        }
      />
    </div>
  )
}

export default DateTimePicker
