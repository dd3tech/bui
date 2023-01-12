import Card from 'components/Card'
import Text from 'components/Typography'
import { useCallback, useState, useMemo, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

const monthNames = {
    es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

const weekDays = {
    es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
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

type OptionType = 'day' | 'month' | 'year'

interface Props {
    format?: 'long' | 'short'
    language?: 'es' | 'en'
    value?: Date
    onChange?: (newDate: Date) => void
}

const TOTAL_YEARS = 11

function Calendar({ format = 'short', language = 'es', value, onChange }: Props) {
    const today = new Date()
    const [currentDate, setCurrentDate] = useState(today)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [currentOption, setCurrentOption] = useState<OptionType>('day')

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

    const handlePrevDay = () => setCurrentDate(updateCurrentDate(currentDate, { month: -1 }))
    const handleNextDay = () => setCurrentDate(updateCurrentDate(currentDate, { month: 1 }))

    const handlePrevMonth = () => setCurrentDate(updateCurrentDate(currentDate, { year: -1 }))
    const handleNextMonth = () => setCurrentDate(updateCurrentDate(currentDate, { year: 1 }))

    const handlePrevYear = () => setCurrentDate(updateCurrentDate(currentDate, { year: -TOTAL_YEARS }))
    const handleNextYear = () => setCurrentDate(updateCurrentDate(currentDate, { year: TOTAL_YEARS }))

    const yearList = getYearList(currentDate.getFullYear() + 1, TOTAL_YEARS)

    // Obtener el número de días en el mes actual
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
            <div>
                <div className="flex flex-1 justify-between items-center mb-5 text-gray-700">
                    <button onClick={handlePrevYear}>
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button onClick={updateCurrentOption}>
                        <Text bold size="sm">
                            {yearList[yearList.length - 1]} - {yearList[0]}
                        </Text>
                    </button>
                    <button onClick={handleNextYear}>
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-x-7 gap-y-2 mx-4">
                    {yearList.map((year) => {
                        const isActive = selectedDate?.getFullYear() === year
                        const isToday = today.getFullYear() === year
                        const todayBorder = isToday ? 'border border-blue-500' : ''
                        const bgColor = isActive ? 'bg-blue-500 text-white' : `text-gray-800 ${todayBorder}`
                        return (
                            <button
                                key={year}
                                onClick={() => handleSelectYear(year)}
                                className={`px-3 p-1.5 rounded-lg box-content border border-transparent hover:border-blue-500 ${bgColor}`}
                            >
                                {year}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }

    if (currentOption === 'month') {
        return (
            <div>
                <div className="flex flex-1 justify-between items-center mb-5 text-gray-700">
                    <button onClick={handlePrevMonth}>
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button onClick={updateCurrentOption}>
                        <Text bold size="sm">
                            {currentDate.getFullYear()}
                        </Text>
                    </button>
                    <button onClick={handleNextMonth}>
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-x-7 gap-y-2 mx-4">
                    {monthNames[language].map((month, index) => {
                        const isActive = selectedDate?.getMonth() === index && selectedDate?.getFullYear() === currentDate.getFullYear()
                        const isToday = today.getMonth() === index && today.getFullYear() === currentDate.getFullYear()
                        const todayBorder = isToday ? 'border border-blue-500' : ''
                        const bgColor = isActive ? 'bg-blue-500 text-white' : `text-gray-800 ${todayBorder}`
                        return (
                            <button
                                key={month}
                                onClick={() => handleSelectMonth(index)}
                                className={`px-3 p-1.5 rounded-lg box-content border border-transparent hover:border-blue-500 ${bgColor}`}
                            >
                                {format === 'long' ? month : month.substring(0, 3)}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-1 justify-between items-center mb-5 text-gray-700">
                <button onClick={handlePrevDay}>
                    <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button onClick={updateCurrentOption}>
                    <Text bold size="sm">
                        {monthNames[language][currentDate.getMonth()]} {currentDate.getFullYear()}
                    </Text>
                </button>
                <button onClick={handleNextDay}>
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
            <section className="grid grid-cols-7 gap-x-4 gap-y-2">
                {weekDays[language].map((day) => (
                    <div key={day} className="text-center font-bold">
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
                    const isToday = day === today.getDate() && today.getMonth() == currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear()
                    const todayBorder = isToday ? 'border border-blue-500' : ''
                    const bgColor = isActive ? 'bg-blue-500 text-white' : `text-gray-800 ${todayBorder}`
                    return (
                        <button
                            key={day}
                            onClick={() => handleSelectDay(day as number)}
                            className={`w-6 h-6 select-none font-semibold rounded-full box-content border border-transparent hover:border-blue-500 ${bgColor} ${
                                format === 'long' ? 'justify-self-center' : ''
                            }`}
                        >
                            {day}
                        </button>
                    )
                })}
            </section>
        </div>
    )
}

function DatePicker(props: Props) {
    return (
        <Card width="fit-content" className="p-5" rounded="lg">
            <Calendar {...props} />
        </Card>
    )
}

export default DatePicker
