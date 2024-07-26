/*
 * Copyright (c) DD360 and its affiliates.
 */

import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  CSSProperties
} from 'react'
import Card from '../Card/Card'
import Text from '../Typography/Text'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'

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

const weekDays = {
  es: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ],
  en: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
}

const updateCurrentDate = (
  date: Date,
  options?: {
    day?: number
    month?: number
    year?: number
    isNotAddition?: boolean
  }
) => {
  const newDate = new Date(date)

  if (options?.isNotAddition) {
    if (options?.year !== undefined) newDate.setFullYear(options.year)
    if (options?.month !== undefined) newDate.setMonth(options.month)
    if (options?.day !== undefined) newDate.setDate(options.day)
  } else {
    if (options?.year !== undefined)
      newDate.setFullYear(newDate.getFullYear() + options.year)
    if (options?.month !== undefined)
      newDate.setMonth(newDate.getMonth() + options.month)
  }
  return newDate
}

const getYearList = (startYear: number, size: number) => {
  const yearList = []
  for (let i = startYear - size; i < startYear; i++) {
    yearList.push(i)
  }
  return yearList
}

const btnClassName = (bgColor: string) =>
  composeClasses(
    'px-3 p-1.5 rounded-lg box-content border border-transparent min-w-min',
    'hover:border-primary',
    bgColor
  )

const getInitialOption = (opt?: OptionType): 'day' | 'month' | 'year' => {
  if (opt === 'month-year') return 'month'
  if (opt) return opt
  return 'day'
}

type OptionType = 'day' | 'month' | 'year' | 'month-year'

export interface DatePickerProps {
  className?: string
  style?: CSSProperties
  format?: 'long' | 'short'
  language?: 'es' | 'en'
  value?: Date
  minDate?: Date
  maxDate?: Date
  onChange?: (newDate: Date) => void
  onlyOf?: OptionType
  onDaySelected?: () => void
  classNameInputDatePicker?: string
}

const TOTAL_YEARS = 11
const TODAY = new Date()

const disableMonthBtn = ({
  currentDate,
  minDate,
  maxDate,
  includeDeadline = true
}: {
  currentDate: Date
  minDate?: Date
  maxDate?: Date
  includeDeadline?: boolean
}) => {
  let disabled = false

  if (maxDate) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth())
    const maxMonth = new Date(maxDate.getFullYear(), maxDate.getMonth())
    disabled = includeDeadline
      ? date.getTime() >= maxMonth.getTime()
      : date.getTime() > maxMonth.getTime()
  }

  if (minDate) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth())
    const minMonth = new Date(minDate.getFullYear(), minDate.getMonth())
    if (!disabled) {
      disabled = includeDeadline
        ? date.getTime() <= minMonth.getTime()
        : date.getTime() < minMonth.getTime()
    }
  }

  return {
    disabled,
    className: composeClasses(disabled && 'text-gray-300 border-white')
  }
}

const disabledYearBtn = ({
  year,
  minDate,
  maxDate
}: {
  year: number
  minDate?: Date
  maxDate?: Date
}) => {
  const disabled =
    (minDate && year < minDate?.getFullYear()) ||
    (maxDate && year > maxDate?.getFullYear())

  return {
    disabled,
    className: composeClasses(disabled && 'text-gray-300')
  }
}

function Calendar({
  format = 'short',
  language = 'es',
  value,
  onlyOf,
  onChange,
  onDaySelected,
  minDate,
  maxDate
}: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState(TODAY)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentOption, setCurrentOption] = useState<OptionType>(
    getInitialOption(onlyOf)
  )

  const updateCurrentOption = useCallback(() => {
    let newCurrentOption = currentOption
    if (currentOption === 'day') {
      newCurrentOption = 'month'
    }
    if (currentOption === 'month') {
      newCurrentOption = 'year'
    }
    if (currentOption === 'year') {
      if (onlyOf === 'month-year') {
        newCurrentOption = 'month'
      } else {
        newCurrentOption = 'day'
      }
    }
    setCurrentOption(newCurrentOption)
    selectedDate && setCurrentDate(selectedDate)
  }, [currentOption, currentDate, selectedDate])

  const handleChangeSelectedDate = (newDate: Date) => {
    onChange && onChange(newDate)
    setSelectedDate(newDate)
  }

  const handleSelectDay = (day: number) => {
    const newDate = updateCurrentDate(currentDate, { day, isNotAddition: true })
    handleChangeSelectedDate(newDate)
    setCurrentDate(newDate)
    onDaySelected && onDaySelected()
  }

  const handleSelectMonth = (index: number) => {
    const date = onlyOf?.includes('month')
      ? new Date(currentDate.getFullYear(), index + 1, 0)
      : currentDate
    const newDate = updateCurrentDate(date, {
      month: index,
      isNotAddition: true
    })
    handleChangeSelectedDate(newDate)
    setCurrentOption('day')
  }

  const handleSelectYear = (year: number) => {
    const newDate = updateCurrentDate(currentDate, {
      year,
      isNotAddition: true
    })
    handleChangeSelectedDate(newDate)
    setCurrentOption('month')
  }

  const handlePrevMonth = () =>
    setCurrentDate(updateCurrentDate(currentDate, { month: -1 }))
  const handleNextMonth = () =>
    setCurrentDate(updateCurrentDate(currentDate, { month: 1 }))

  const handlePrevYear = () =>
    setCurrentDate(updateCurrentDate(currentDate, { year: -1 }))
  const handleNextYear = () =>
    setCurrentDate(updateCurrentDate(currentDate, { year: 1 }))

  const handlePrevRangeYears = () =>
    setCurrentDate(updateCurrentDate(currentDate, { year: -TOTAL_YEARS }))
  const handleNextRangeYears = () =>
    setCurrentDate(updateCurrentDate(currentDate, { year: TOTAL_YEARS }))

  const yearList = getYearList(currentDate.getFullYear() + 1, TOTAL_YEARS)

  const { days, listOfSpaces } = useMemo(() => {
    const days = []
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    for (let i = 1; i <= numDaysInMonth; i++) {
      days.push(i)
    }
    const listOfSpaces = Array.from(Array(firstDayOfMonth).keys())
    return { days, listOfSpaces }
  }, [currentDate])

  const getControlsMonth = () => (
    <>
      <button role="prevYear" type="button" onClick={handlePrevYear}>
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      <button role="select-year" type="button" onClick={updateCurrentOption}>
        <Text bold size="sm">
          {currentDate.getFullYear()}
        </Text>
      </button>
      <button role="nextYear" type="button" onClick={handleNextYear}>
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </>
  )

  useEffect(() => {
    if (value) {
      setSelectedDate(value)
      setCurrentDate(value)
    }
  }, [value])

  if (currentOption === 'year') {
    return (
      <>
        <div className="flex flex-1 justify-between items-center mb-5 text-gray-700">
          <button
            type="button"
            role="pevRangeYear"
            onClick={handlePrevRangeYears}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={onlyOf === 'year'}
            role="range-years"
            onClick={updateCurrentOption}
          >
            <Text bold size="sm">
              {yearList[yearList.length - 1]} - {yearList[0]}
            </Text>
          </button>
          <button
            role="nextRangeYear"
            type="button"
            onClick={handleNextRangeYears}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
        <ul role="list" className="grid grid-cols-3 gap-x-7 gap-y-2 mx-4">
          {yearList.map((year) => {
            const isActive = selectedDate?.getFullYear() === year
            const isToday = TODAY.getFullYear() === year
            const todayBorder = isToday ? 'border border-primary' : ''
            const bgColor = isActive ? 'bg-primary text-white' : todayBorder

            return (
              <button
                disabled={disabledYearBtn({ year, minDate, maxDate }).disabled}
                role={year.toString()}
                type="button"
                key={year}
                onClick={() => handleSelectYear(year)}
                className={composeClasses(
                  btnClassName(bgColor),
                  disabledYearBtn({ year, minDate, maxDate }).className
                )}
              >
                {year}
              </button>
            )
          })}
        </ul>
      </>
    )
  }

  if (currentOption === 'month') {
    return (
      <>
        <div
          className={composeClasses(
            'flex flex-1 items-center mb-5 text-gray-700',
            !onlyOf && 'justify-between',
            onlyOf === 'month-year' && 'justify-between',
            onlyOf && 'justify-center'
          )}
        >
          {!onlyOf && getControlsMonth()}
          {onlyOf === 'month-year' && getControlsMonth()}
          {onlyOf === 'month' && (
            <Text bold size="sm">
              {
                monthNames[language][
                  selectedDate?.getMonth() ?? TODAY.getMonth()
                ]
              }
            </Text>
          )}
        </div>
        <ul role="list" className="grid grid-cols-3 gap-x-7 gap-y-2 mx-4">
          {monthNames[language].map((month, index) => {
            const isActive =
              selectedDate?.getMonth() === index &&
              selectedDate?.getFullYear() === currentDate.getFullYear()
            const isToday =
              TODAY.getMonth() === index &&
              TODAY.getFullYear() === currentDate.getFullYear()
            const todayBorder = isToday ? 'border border-primary' : ''
            const bgColor = isActive ? 'bg-primary text-white' : todayBorder
            const currentMonth = new Date(currentDate.getFullYear(), index, 1)
            return (
              <button
                disabled={
                  disableMonthBtn({
                    currentDate: currentMonth,
                    minDate,
                    maxDate,
                    includeDeadline: false
                  }).disabled
                }
                role="month"
                type="button"
                key={month}
                onClick={() => handleSelectMonth(index)}
                className={composeClasses(
                  btnClassName(bgColor),
                  disableMonthBtn({
                    currentDate: currentMonth,
                    minDate,
                    maxDate,
                    includeDeadline: false
                  }).className
                )}
              >
                {format === 'long' ? month : month.substring(0, 3)}
              </button>
            )
          })}
        </ul>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-1 justify-between items-center mb-5 text-gray-700">
        <button
          role="prevMonth"
          type="button"
          onClick={handlePrevMonth}
          {...disableMonthBtn({ currentDate, minDate })}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          role="select-month"
          type="button"
          disabled={!!onlyOf}
          onClick={updateCurrentOption}
        >
          <Text bold size="sm">
            {monthNames[language][currentDate.getMonth()]}{' '}
            {currentDate.getFullYear()}
          </Text>
        </button>
        <button
          role="nextMonth"
          type="button"
          onClick={handleNextMonth}
          {...disableMonthBtn({ currentDate, maxDate })}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      <ul role="list" className="grid grid-cols-7 gap-x-4 gap-y-2">
        {weekDays[language].map((day) => (
          <div role="day" key={day} className="text-center font-bold">
            {format === 'long' ? day : day.substring(0, 2)}
          </div>
        ))}
        {listOfSpaces.map((num) => (
          <div key={num}></div>
        ))}
        {days.map((day) => {
          const isActive =
            day === selectedDate?.getDate() &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate?.getFullYear() === currentDate.getFullYear()
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          )
          const isDisabled =
            (minDate && date.getTime() < minDate.getTime()) ||
            (maxDate && date.getTime() > maxDate.getTime())
          const isToday =
            day === TODAY.getDate() &&
            TODAY.getMonth() == currentDate.getMonth() &&
            TODAY.getFullYear() === currentDate.getFullYear()
          const todayBorder = isToday && 'border border-primary'
          const bgColor = isActive && 'bg-primary'
          const textColor = isDisabled
            ? 'text-gray-300'
            : isActive
            ? 'text-white'
            : 'text-gray-800'

          return (
            <button
              role="numberDay"
              type="button"
              key={day}
              onClick={() => handleSelectDay(day)}
              className={composeClasses(
                'w-6 h-6 select-none font-semibold rounded-full box-content border  border-transparent',
                'hover:border-primary',
                bgColor,
                textColor,
                todayBorder,
                format === 'long' && 'justify-self-center'
              )}
              disabled={isDisabled}
            >
              {day}
            </button>
          )
        })}
      </ul>
    </>
  )
}

const stopPropagationCalendar = (event: React.MouseEvent) => {
  event.stopPropagation()
}

function DatePicker({
  className,
  style,
  classNameInputDatePicker,
  ...props
}: DatePickerProps) {
  return (
    <Card
      style={style}
      role="calendar-container"
      width="fit-content"
      className={composeClasses(
        'p-5 bg-white z-10',
        className,
        classNameInputDatePicker
      )}
      rounded="lg"
      onClick={stopPropagationCalendar}
      onMouseDown={stopPropagationCalendar}
    >
      <Calendar {...props} />
    </Card>
  )
}

export default DatePicker
