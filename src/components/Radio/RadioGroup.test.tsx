import { useState } from 'react'
import { render } from '@testing-library/react'
import Radio from './Radio'
import RadioGroup, { IRadioGroup } from './RadioGroup'

const RadioGroupComponent = (
  props: Omit<IRadioGroup, 'children' | 'onChange' | 'value'>
) => {
  const [selectedValue, setSelectedValue] = useState('A')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  return (
    <RadioGroup
      title={props.title}
      name={props.name}
      value={selectedValue}
      onChange={handleChange}
      row={props.row}
    >
      <Radio
        label="Lorem A"
        value="A"
        inputProps={{ 'aria-label': 'A' }}
        className="mr-3"
      />
      <Radio label="Lorem B" value="B" inputProps={{ 'aria-label': 'B' }} />
      <Radio
        label="Lorem C"
        value="C"
        inputProps={{ 'aria-label': 'C' }}
        color="success"
      />
      NoRadioButton
    </RadioGroup>
  )
}

describe('<RadioGroup/>', () => {
  it('should be render with 3 Radios childrens, the first child with mr-6 class', () => {
    const { getByRole } = render(<RadioGroupComponent />)
    const radioGroup = getByRole('radio-group')

    expect(radioGroup).toBeDefined()
    expect(radioGroup.childElementCount).toEqual(3)
    expect(radioGroup.children[0].className).toContain('mr-3')
  })

  it('should be render like row and with title "Example"', () => {
    const { getByRole } = render(<RadioGroupComponent title="Example" row />)

    expect(getByRole('title').textContent).toEqual('Example')
    expect(getByRole('radio-group').className).toContain('flex-row')
  })

  it('should be render each Radio with the name "radio-buttons-group"', () => {
    const { getByRole } = render(
      <RadioGroupComponent name="radio-buttons-group" />
    )
    const radioList = Array.from(getByRole('radio-group').children)

    radioList.forEach((radio) => {
      const input = radio.querySelector(
        'input[type="radio"]'
      ) as HTMLInputElement
      expect(input.name).toEqual('radio-buttons-group')
    })
  })

  it('should be render even if it has children that are not of type Radio"', () => {
    const { getByRole } = render(
      <RadioGroupComponent name="radio-buttons-group" />
    )
    const radioGroup = getByRole('radio-group')
    expect(radioGroup.textContent).toContain('NoRadioButton')
  })
})
