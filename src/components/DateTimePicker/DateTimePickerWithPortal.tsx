/*
 * Copyright (c) DD360 and its affiliates.
 */

import DateTimePicker, { DateTimePickerProps } from './DateTimePicker'
import { Portal } from '../../common/Portal'

const DateTimePickerWithPortal = ({ ...props }: DateTimePickerProps) => {
  return (
    <Portal>
      <DateTimePicker {...props} />
    </Portal>
  )
}

export default DateTimePickerWithPortal
