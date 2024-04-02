import { ChangeEvent, useCallback, useMemo } from 'react'
import { composeClasses } from 'lib/classes'

interface IInputTimePicker {
  name: string
  timeFormat: string[]
  selected: string
  handleSelected: (selected: { [key: string]: string }) => void
  className?: string
}

interface IAmPmPicker {
  selected: string
  className?: string
  handleSelected: (selected: { [key: string]: string }) => void
}

interface IClock {
  readonly value?: { date: Date; time: string }
  readonly handleChanges: (time: { [key: string]: string }) => void
}

const minutesRange = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55'
]
const twelveHour = [
  '12',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11'
]

const InputTimePicker = ({
  name,
  timeFormat,
  selected,
  className,
  handleSelected
}: IInputTimePicker) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    handleSelected({ [target.name]: target.value })
  }

  return (
    <ul
      role="list"
      className={composeClasses(
        'w-full max-h-32 md:max-h-64 overflow-y-auto',
        className
      )}
    >
      {timeFormat.map((val) => (
        <li key={`${name}:${val}`} className="p-1">
          <label
            htmlFor={`select-${name}:${val}`}
            className={composeClasses(
              'block py-1 px-4 text-center transition-colors duration-150 ease-in-out cursor-pointer rounded-md font-medium',
              selected === val
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100 text-gray-800'
            )}
          >
            {val}
            <input
              value={val}
              name={name}
              type="radio"
              className="hidden"
              id={`select-${name}:${val}`}
              onChange={handleOnChange}
            />
          </label>
        </li>
      ))}
    </ul>
  )
}

const AmPmPicker = ({ selected, className, handleSelected }: IAmPmPicker) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    handleSelected({ [target.name]: target.value })
  }

  return (
    <div className={composeClasses('flex', className)}>
      <label
        htmlFor="am"
        className={composeClasses(
          'w-full rounded-l-lg border border-gray-300 border-r-0 text-center p-1 text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-gray-100 cursor-pointer',
          selected === 'AM' &&
            'hover:bg-primary bg-primary border-primary text-white'
        )}
      >
        <span>AM</span>
        <input
          id="am"
          value="AM"
          name="ampm"
          type="radio"
          className="hidden"
          onChange={handleOnChange}
        ></input>
      </label>
      <label
        htmlFor="pm"
        className={composeClasses(
          'w-full rounded-r-lg border border-gray-300 border-l-0 text-center p-1 text-xs font-medium transition-colors duration-150 ease-in-out hover:bg-gray-100 cursor-pointer',
          selected === 'PM' &&
            'hover:bg-primary bg-primary border-primary text-white'
        )}
      >
        <span>PM</span>
        <input
          id="pm"
          value="PM"
          name="ampm"
          type="radio"
          className="hidden"
          onChange={handleOnChange}
        ></input>
      </label>
    </div>
  )
}

export default function Clock({ value, handleChanges }: IClock) {
  const time = useMemo<{
    hour: string
    minutes: string
    ampm: string
  }>(() => {
    if (value) {
      const { date, time } = value
      let rawHours = date.getHours()
      let rawMinutes = date.getMinutes()

      // Check whether AM or PM
      const ampm = rawHours >= 12 ? 'PM' : 'AM'

      // Find current hour in AM-PM Format
      rawHours = rawHours % 12

      // To display "0" as "12"
      rawHours = rawHours ? rawHours : 12
      rawMinutes = rawMinutes < 10 ? 0 + rawMinutes : rawMinutes

      const hour = rawHours < 10 ? `0${rawHours}` : `${rawHours}`
      const minutes = rawMinutes < 10 ? `0${rawMinutes}` : `${rawMinutes}`
      const format = time?.split(' ')?.[1] ?? ampm

      return { hour, minutes, ampm: format }
    }
    return {
      hour: '12',
      minutes: '00',
      ampm: 'AM'
    }
  }, [value])

  const handleSelected = useCallback(
    (newTime: { hour: string; minutes: string; ampm: string }) => {
      handleChanges({ ...time, ...newTime })
    },
    [time]
  )

  return (
    <div role="clock-container" className="grid grid-cols-4 gap-y-4 md:gap-y-2">
      <hr className="col-span-4 md:hidden" />
      <InputTimePicker
        name="hour"
        selected={time.hour}
        timeFormat={twelveHour}
        handleSelected={handleSelected}
        className="col-span-2"
      />
      <InputTimePicker
        name="minutes"
        selected={time.minutes}
        timeFormat={minutesRange}
        handleSelected={handleSelected}
        className="col-span-2"
      />
      <hr className="col-span-4" />
      <AmPmPicker
        selected={time.ampm}
        handleSelected={handleSelected}
        className="col-span-4"
      />
    </div>
  )
}
