import Card from 'components/Card'
import Text from 'components/Typography'
import { Portal } from '../../common/Portal'
import { useCallback, useState, useMemo, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { composeClasses } from 'lib/classes'

const monthNames = {
    es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

const weekDays = {
    es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

const updateCurrentDate = (date: Date, options?: { day?: number; month?: number; year?: number; isNotAddition?: boolean }) => {
    const newDate = new Date(date)

    if (options?.isNotAddition) {
        if (options?.year !== undefined) newDate.setFullYear(options.year)
        if (options?.month !== undefined) newDate.setMonth(options.month)
        if (options?.day !== undefined) newDate.setDate(options.day)
    } else {
        if (options?.year !== undefined) newDate.setFullYear(newDate.getFullYear() + options.year)
        if (options?.month !== undefined) newDate.setMonth(newDate.getMonth() + options.month)
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

const btnClassName = (bgColor: string) => composeClasses('px-3 p-1.5 rounded-lg box-content border border-transparent', 'hover:border-blue-500', bgColor)

type OptionType = 'day' | 'month' | 'year'

interface Props {
    className?: string
    format?: 'long' | 'short'
    language?: 'es' | 'en'
    value?: Date
    onChange?: (newDate: Date) => void
    onlyOf?: OptionType
}

const TOTAL_YEARS = 11
const TODAY = new Date()

function Calendar({ format = 'short', language = 'es', value, onlyOf, onChange }: Props) {
    const [currentDate, setCurrentDate] = useState(TODAY)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [currentOption, setCurrentOption] = useState<OptionType>(onlyOf ?? 'day')

    const updateCurrentOption = useCallback(() => {
        let newCurrentOption = currentOption
        if (currentOption === 'day') {
            newCurrentOption = 'month'
        }
        if (currentOption === 'month') {
            newCurrentOption = 'year'
        }
        if (currentOption === 'year') {
            newCurrentOption = 'day'
        }
        setCurrentOption(newCurrentOption)
        selectedDate && setCurrentDate(selectedDate)
    }, [currentOption, currentDate, selectedDate])

    const handleChangeSelectedDate = (newDate: Date) => {
        onChange && onChange(newDate)
        setSelectedDate(newDate)
    }

    const handleSelectMonth = (index: number) => {
        const newDate = updateCurrentDate(currentDate, { month: index, isNotAddition: true })
        handleChangeSelectedDate(newDate)
    }

    const handleSelectDay = (day: number) => {
        const newDate = updateCurrentDate(currentDate, { day, isNotAddition: true })
        handleChangeSelectedDate(newDate)
        setCurrentDate(newDate)
    }

    const handleSelectYear = (year: number) => {
        const newDate = updateCurrentDate(currentDate, { year, isNotAddition: true })
        handleChangeSelectedDate(newDate)
    }

    const handlePrevMonth = () => setCurrentDate(updateCurrentDate(currentDate, { month: -1 }))
    const handleNextMonth = () => setCurrentDate(updateCurrentDate(currentDate, { month: 1 }))

    const handlePrevYear = () => setCurrentDate(updateCurrentDate(currentDate, { year: -1 }))
    const handleNextYear = () => setCurrentDate(updateCurrentDate(currentDate, { year: 1 }))

    const handlePrevRangeYears = () => setCurrentDate(updateCurrentDate(currentDate, { year: -TOTAL_YEARS }))
    const handleNextRangeYears = () => setCurrentDate(updateCurrentDate(currentDate, { year: TOTAL_YEARS }))

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
                    <button role="pevRangeYear" onClick={handlePrevRangeYears}>
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button disabled={!!onlyOf} role="range-years" onClick={updateCurrentOption}>
                        <Text bold size="sm">
                            {yearList[yearList.length - 1]} - {yearList[0]}
                        </Text>
                    </button>
                    <button role="nextRangeYear" onClick={handleNextRangeYears}>
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
                <ul role="list" className="grid grid-cols-3 gap-x-7 gap-y-2 mx-4">
                    {yearList.map((year) => {
                        const isActive = selectedDate?.getFullYear() === year
                        const isToday = TODAY.getFullYear() === year
                        const todayBorder = isToday ? 'border border-blue-500' : ''
                        const bgColor = isActive ? 'bg-blue-500 text-white' : `text-gray-800 ${todayBorder}`

                        return (
                            <button role={year.toString()} key={year} onClick={() => handleSelectYear(year)} className={btnClassName(bgColor)}>
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
                <div className="flex flex-1 justify-between items-center mb-5 text-gray-700">
                    <button role="prevYear" onClick={handlePrevYear}>
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button disabled={!!onlyOf} role="select-year" onClick={updateCurrentOption}>
                        <Text bold size="sm">
                            {currentDate.getFullYear()}
                        </Text>
                    </button>
                    <button role="nextYear" onClick={handleNextYear}>
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
                <ul role="list" className="grid grid-cols-3 gap-x-7 gap-y-2 mx-4">
                    {monthNames[language].map((month, index) => {
                        const isActive = selectedDate?.getMonth() === index && selectedDate?.getFullYear() === currentDate.getFullYear()
                        const isToday = TODAY.getMonth() === index && TODAY.getFullYear() === currentDate.getFullYear()
                        const todayBorder = isToday ? 'border border-blue-500' : ''
                        const bgColor = isActive ? 'bg-blue-500 text-white' : `text-gray-800 ${todayBorder}`

                        return (
                            <button role="month" key={month} onClick={() => handleSelectMonth(index)} className={btnClassName(bgColor)}>
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
                <button role="prevMonth" onClick={handlePrevMonth}>
                    <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button disabled={!!onlyOf} role="select-month" onClick={updateCurrentOption}>
                    <Text bold size="sm">
                        {monthNames[language][currentDate.getMonth()]} {currentDate.getFullYear()}
                    </Text>
                </button>
                <button role="nextMonth" onClick={handleNextMonth}>
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
                        currentDate?.getFullYear() === currentDate.getFullYear()
                    const isToday = day === TODAY.getDate() && TODAY.getMonth() == currentDate.getMonth() && TODAY.getFullYear() === currentDate.getFullYear()
                    const todayBorder = isToday ? 'border border-blue-500' : ''
                    const bgColor = isActive ? 'bg-blue-500 text-white' : `text-gray-800 ${todayBorder}`
                    return (
                        <button
                            role="numberDay"
                            key={day}
                            onClick={() => handleSelectDay(day)}
                            className={composeClasses(
                                'w-6 h-6 select-none font-semibold rounded-full box-content border  border-transparent',
                                'hover:border-blue-500',
                                bgColor,
                                format === 'long' && 'justify-self-center'
                            )}
                        >
                            {day}
                        </button>
                    )
                })}
            </ul>
        </>
    )
}

function DatePicker({ className, ...props }: Props) {
    return (
        <Portal>
            <Card role="calendar-container" width="fit-content" className={composeClasses('p-5', className)} rounded="lg">
                <Calendar {...props} />
            </Card>
        </Portal>
    )
}

export default DatePicker
