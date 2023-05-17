import RangeSlider, { RangeSliderProps, RangeValues } from './RangeSlider'

export type { RangeSliderProps as MultiRangeSliderProps }
export type { RangeValues as IRangeSlider }

/**
 * @deprecated Use `import { RangeSlider } from 'dd360-ds/RangeSlider'`
 */
export function MultiRangeSlider(props: RangeSliderProps) {
  console.warn(
    "[DEPRECATED] This component is deprecated. Instead use `import { RangeSlider } from 'dd360-ds/RangeSlider'` with a prop called multi."
  )
  return <RangeSlider {...props} multi />
}
