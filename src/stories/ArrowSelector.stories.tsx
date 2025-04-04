import type { Meta, StoryObj } from '@storybook/react'
import { ArrowSelector as ArrowSelectorComponent } from '../components/Filters'

const meta: Meta<typeof ArrowSelectorComponent> = {
  title: 'Filters/ArrowSelector',
  component: ArrowSelectorComponent
}

export default meta
type Story = StoryObj<typeof ArrowSelectorComponent>

export const ArrowSelector: Story = {
  args: {
    label: 'Label',
    onClickLeft: () => console.log('Left'),
    onClickRight: () => console.log('Right'),
    toggleOptions: {
      firstOption: 'Option 1',
      secondOption: 'Option 2',
      optionSelected: 'Option 1',
      onOptionChange: () => console.log('Option changed')
    }
  }
}
