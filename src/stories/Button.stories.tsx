import type { Meta, StoryObj } from '@storybook/react'
import Button from '../components/Buttons/Button'

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button
}

export default meta
type Story = StoryObj<typeof Button>

export const BtnPrimary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
    onClick: () => console.log('CLICK')
  }
}

export const BtnPrimaryLoading: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
    isLoading: true,
    disabled: true,
    onClick: () => console.log('CLICK')
  }
}

export const BtnSecondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary'
  }
}

export const BtnSuccess: Story = {
  args: {
    variant: 'success',
    children: 'Success'
  }
}

export const BtnError: Story = {
  args: {
    variant: 'error',
    children: 'Error'
  }
}

export const BtnDanger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger'
  }
}

export const BtnOutlineRed: Story = {
  args: {
    variant: 'outlineWhiteRed',
    children: 'Danger'
  }
}

export const BtnOutlineWhite: Story = {
  args: {
    variant: 'outlineWhite',
    children: 'Contacto',
    paddingX: '14',
    paddingY: '3',
    className: 'text-base rounded-lg px-'
  }
}
