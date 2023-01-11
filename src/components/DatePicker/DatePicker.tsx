import Card from 'components/Card'
import Text from 'components/Typography'
import { HTMLProps, useCallback, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

interface RowProps extends HTMLProps<HTMLButtonElement> {
    index: number
    isActive?: boolean
}

function Row({ children, index, onClick, isActive }: RowProps) {
    return (
        <td key={index}>
            <button onClick={onClick} className={`w-8 h-8 font-semibold ${isActive ? 'bg-blue-500 text-white rounded-full' : 'text-gray-800'}`}>
                {children}
            </button>
        </td>
    )
}

const monthNames = {
    es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

const weekDays = {
    es: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
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
}

const TOTAL_YEARS = 11

function Calendar({ format = 'short', language = 'es' }: Props) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [currentOption, setCurrentOption] = useState<OptionType>('month')
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

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

    const handleSelectMonth = (index: number) => {
        const newDate = updateCurrentDate(currentDate, { month: index, isNotAddition: true })
        setSelectedDate(newDate)
    }

    const handleSelectDay = (day: number) => {
        const newDate = updateCurrentDate(currentDate, { day, isNotAddition: true })
        setSelectedDate(newDate)
        setCurrentDate(newDate)
    }

    const handleSelectYear = (year: number) => {
        const newDate = updateCurrentDate(currentDate, { year, isNotAddition: true })
        setSelectedDate(newDate)
    }

    const handlePrevDay = () => setCurrentDate(updateCurrentDate(currentDate, { month: -1 }))
    const handleNextDay = () => setCurrentDate(updateCurrentDate(currentDate, { month: 1 }))

    const handlePrevMonth = () => setCurrentDate(updateCurrentDate(currentDate, { year: -1 }))
    const handleNextMonth = () => setCurrentDate(updateCurrentDate(currentDate, { year: 1 }))

    const handlePrevYear = () => setCurrentDate(updateCurrentDate(currentDate, { year: -TOTAL_YEARS }))
    const handleNextYear = () => setCurrentDate(updateCurrentDate(currentDate, { year: TOTAL_YEARS }))

    const yearList = getYearList(currentDate.getFullYear(), TOTAL_YEARS)

    // Obtener el número de días en el mes actual
    const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    let days = []
    for (let i = 1; i <= numDaysInMonth; i++) {
        days.push(i)
    }
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.unshift('')
    }

    const rows: any[] = []
    let cells: any[] = []
    days.forEach((day, index) => {
        const onClick = () => typeof day === 'number' && handleSelectDay(day)
        const isActive = day === selectedDate?.getDate() && selectedDate?.getFullYear() === currentDate.getFullYear()
        if (index % 7 !== 0) {
            cells.push(
                <Row isActive={isActive} onClick={onClick} index={index}>
                    {day}
                </Row>
            )
        } else {
            rows.push(cells)
            cells = []
            cells.push(
                <Row isActive={isActive} onClick={onClick} index={index}>
                    {day}
                </Row>
            )
        }
        if (index === days.length - 1) {
            rows.push(cells)
        }
    })

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
                <div className="grid grid-cols-3 gap-0.5">
                    {yearList.map((year) => (
                        <button
                            key={year}
                            onClick={() => handleSelectYear(year)}
                            className={`px-3 p-1.5 rounded-lg ${selectedDate?.getFullYear() === year ? 'border bg-blue-500 text-white' : ''}`}
                        >
                            {year}
                        </button>
                    ))}
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
                <div className="grid grid-cols-3 gap-0.5">
                    {monthNames[language].map((month, index) => (
                        <button
                            key={month}
                            onClick={() => handleSelectMonth(index)}
                            className={`px-3 p-1.5 rounded-lg ${
                                selectedDate?.getMonth() === index && selectedDate?.getFullYear() === currentDate.getFullYear()
                                    ? 'border bg-blue-500 text-white'
                                    : ''
                            }`}
                        >
                            {format === 'long' ? month : month.substring(0, 3)}
                        </button>
                    ))}
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
            <table>
                <thead>
                    <tr className="text-sm">
                        {weekDays[language].map((day, index) => (
                            <th className={index === weekDays[language].length - 1 ? '' : 'pr-4'} key={day}>
                                {format === 'long' ? day : day.substring(0, 3)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((day, index) => (
                        <tr key={index} className="text-sm">
                            {day}
                        </tr>
                    ))}
                </tbody>
            </table>
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
