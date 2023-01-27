import { cleanup, fireEvent, getByRole, render, RenderResult } from '@testing-library/react'
import { describe, it } from 'vitest'
import DatePicker from './DatePicker'

const monthNames = {
    es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

describe('<DatePicker /> ', () => {
    const today = new Date()

    it('element is rendered', () => {
        const { getByRole } = render(<DatePicker />)
        expect(getByRole('calendar-container')).toBeInTheDocument()
    })

    describe('props: ', () => {
        it('format: long or short renders long or short days and months', () => {
            const { getAllByRole, rerender } = render(<DatePicker format="long" />)

            const days = getAllByRole('day')
            expect(days[0].textContent?.length).not.toEqual(2)
            expect(days[0].textContent).toBe('Domingo')

            rerender(<DatePicker format="short" />)
            expect(days[0].textContent?.length).toEqual(2)
        })

        it('value: of type Date must render the correct day month and year and must also be selected', () => {
            const date = new Date('01-14-2000')
            const { getAllByRole, getByRole } = render(<DatePicker value={date} />)

            const numberDayList = getAllByRole('numberDay')
            const btnSelectMonth = getByRole('select-month')

            expect(numberDayList[date.getDate() - 1].className).toContain('bg-blue-500 text-white')
            expect(btnSelectMonth.textContent).toContain(date.getFullYear())
            fireEvent.click(btnSelectMonth)

            const btnSelectYear = getByRole('select-year')
            expect(getByRole('list').children[date.getMonth()].className).toContain('bg-blue-500 text-white')
            fireEvent.click(btnSelectYear)

            const year = getByRole(date.getFullYear())
            expect(year.className).toContain('bg-blue-500 text-white')
        })

        it('language: should render the correct day and month for this language, either short or long', () => {
            const { getAllByRole, getByRole, rerender } = render(<DatePicker format="long" language="en" />)
            const days = getAllByRole('day')
            const btnSelectMonth = getByRole('select-month')

            expect(days[0].textContent).toEqual('Sunday')
            expect(days[6].textContent).toEqual('Saturday')

            fireEvent.click(btnSelectMonth)
            const grid = getByRole('list')

            expect(grid.children[0].textContent).toEqual('January')
            expect(grid.children[11].textContent).toEqual('December')

            rerender(<DatePicker format="long" language="es" />)

            expect(grid.children[0].textContent).toEqual('Enero')
            expect(grid.children[11].textContent).toEqual('Diciembre')
        })

        it('onChange: prop should listen and return the date you select on the calendar.', () => {
            let value: Date | undefined
            const onChange = (newDate: Date) => {
                value = newDate
            }
            const { getAllByRole, getByRole } = render(<DatePicker onChange={onChange} />)
            fireEvent.click(getAllByRole('numberDay')[5])
            fireEvent.click(getByRole('select-month'))
            fireEvent.click(getAllByRole('month')[1])
            fireEvent.click(getByRole('select-year'))
            fireEvent.click(getByRole('list').children[0])

            expect(value).not.toBeUndefined()
            expect(value?.getDate()).toBe(6)
            expect(value?.getMonth()).toBe(1)
            expect(value?.getFullYear()).toBe(today.getFullYear() - 10)
        })
    })

    describe('clicking header text button - changing ui', () => {
        let renderResult: RenderResult
        const numDaysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

        beforeEach(() => {
            renderResult = render(<DatePicker />)
        })

        afterEach(() => cleanup())

        it('when the days appear, I must change the interface to the ui of months', () => {
            const { getByRole, getAllByRole } = renderResult

            expect(getAllByRole('numberDay').length).toEqual(numDaysInMonth)
            fireEvent.click(getByRole('select-month'))
            expect(getByRole('list').children.length).toBe(12)
        })

        it('when the selected month appears, it should send me to the year range ui', () => {
            const { getByRole } = renderResult

            fireEvent.click(getByRole('select-month'))
            expect(getByRole('list').children.length).toBe(12)
            fireEvent.click(getByRole('select-year'))
            expect(getByRole('list').children.length).toBe(11)
        })

        it('when the date range appears, it should send me to the ui of days', () => {
            const { getByRole, getAllByRole } = renderResult

            fireEvent.click(getByRole('select-month'))
            fireEvent.click(getByRole('select-year'))
            expect(getByRole('list').children.length).toBe(11)
            fireEvent.click(getByRole('range-years'))
            expect(getAllByRole('numberDay').length).toEqual(numDaysInMonth)
        })
    })

    describe('buttons to go back and forward in the calendar', () => {
        describe('ui - days', () => {
            it('prevMonth button should take me to the previous month shown in the header', () => {
                const { getByRole } = render(<DatePicker value={today} language="en" />)

                fireEvent.click(getByRole('prevMonth'))
                today.setMonth(today.getMonth() - 1)
                expect(getByRole('select-month').firstChild?.textContent).toEqual(`${monthNames['en'][today.getMonth()]} ${today.getFullYear()}`)
            })

            it('nextMonth should take me to the month following the month shown in the header', () => {
                const { getByRole } = render(<DatePicker value={today} language="en" />)

                fireEvent.click(getByRole('nextMonth'))
                today.setMonth(today.getMonth() + 1)
                expect(getByRole('select-month').firstChild?.textContent).toEqual(`${monthNames['en'][today.getMonth()]} ${today.getFullYear()}`)
            })
        })

        describe('ui - months', () => {
            it('prevYear should take me to the previous year shown in the header', () => {
                const { getByRole } = render(<DatePicker value={today} />)

                fireEvent.click(getByRole('select-month'))
                fireEvent.click(getByRole('prevYear'))
                today.setFullYear(today.getFullYear() - 1)
                expect(getByRole('select-year').firstChild?.textContent).toEqual(today.getFullYear().toString())
            })

            it('nextYear should take me to the next year shown in the header', () => {
                const { getByRole } = render(<DatePicker value={today} />)

                fireEvent.click(getByRole('select-month'))
                fireEvent.click(getByRole('nextYear'))
                today.setFullYear(today.getFullYear() + 1)
                expect(getByRole('select-year').firstChild?.textContent).toEqual(today.getFullYear().toString())
            })
        })

        describe('ui - rangeYears', () => {
            it('pevRangeYear should take me to display a list of 11 years following the header year', () => {
                const { getByRole } = render(<DatePicker value={today} />)

                fireEvent.click(getByRole('select-month'))
                fireEvent.click(getByRole('select-year'))
                fireEvent.click(getByRole('pevRangeYear'))
                today.setFullYear(today.getFullYear() - 11)
                expect(getByRole('range-years').firstChild?.textContent).toEqual(`${today.getFullYear()} - ${today.getFullYear() - 10}`)
            })

            it('nextRangeYear should take me to display a list of 11 years prior to the year header', () => {
                const { getByRole } = render(<DatePicker value={today} />)

                fireEvent.click(getByRole('select-month'))
                fireEvent.click(getByRole('select-year'))
                fireEvent.click(getByRole('nextRangeYear'))
                today.setFullYear(today.getFullYear() + 11)
                expect(getByRole('range-years').firstChild?.textContent).toEqual(`${today.getFullYear()} - ${today.getFullYear() - 10}`)
            })
        })
    })

    describe("today's date is marked correctly", () => {
        it('day is marked', () => {
            const { getAllByRole } = render(<DatePicker />)
            expect(getAllByRole('numberDay')[today.getDate() - 1].className).toContain('border border-blue-500')
        })

        it('month is marked', () => {
            const { getAllByRole, getByRole } = render(<DatePicker />)
            fireEvent.click(getByRole('select-month'))

            const currentMonth = getAllByRole('month')[today.getMonth()]
            expect(currentMonth.className).toContain('border border-blue-500')
        })

        it('year is marked', () => {
            const { getByRole } = render(<DatePicker />)

            fireEvent.click(getByRole('select-month'))
            fireEvent.click(getByRole('select-year'))
            const currentYear = getByRole(today.getFullYear())
            expect(currentYear.className).toContain('border border-blue-500')
        })
    })

    it('should be rendered in a portal', () => {
        const { getByTestId } = render(<DatePicker usePortal={true} />)
        expect(getByTestId('card-contain').parentElement?.parentElement?.id).toContain('portal-root')
    })

    it('should be render with prop onlyOf=month', () => {
        const date = new Date('01-14-2000')
        const { getAllByRole } = render(<DatePicker value={date} onlyOf="month" />)
        const monthList = getAllByRole('month')
        expect(monthList[1].innerHTML).toBe('Feb')
    })

    it('should be render with prop onlyOf=month-year', () => {
        const date = new Date('01-22-2021')
        const { getAllByRole, getByRole } = render(<DatePicker value={date} onlyOf="month-year" />)
        const monthList = getAllByRole('month')
        expect(monthList[1].innerHTML).toBe('Feb')
        fireEvent.click(getByRole('select-year'))
        fireEvent.click(getByRole('range-years'))
        expect(monthList[2].innerHTML).toBe('Mar')
    })
})
