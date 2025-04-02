import type { Meta, StoryObj } from '@storybook/react'
import TextComponent from '../components/Typography/Text'

const meta: Meta<typeof TextComponent> = {
  title: 'Typography/Text',
  component: TextComponent
}

export default meta
type Story = StoryObj<typeof TextComponent>

export const Default: Story = {
  args: {
    variant: 'p',
    children: 'Default',
    className: 'text-primary',
    align: 'center',
    bold: true,
    textMuted: false,
    textMuted500: false,
    size: 'base'
  }
}

export const h1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
    className: 'text-primary',
    align: 'center',
    bold: true,
    textMuted: false,
    textMuted500: false
  }
}

export const h2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
    align: 'left',
    bold: false,
    textMuted: false,
    textMuted500: false
  }
}

export const h3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
    align: 'right',
    bold: false,
    textMuted: false,
    textMuted500: false
  }
}

export const h4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
    align: 'center',
    bold: false,
    textMuted: false,
    textMuted500: false
  }
}

export const h5: Story = {
  args: {
    variant: 'h5',
    children: 'Heading 5',
    align: 'justify',
    bold: false,
    textMuted: false,
    textMuted500: false
  }
}

export const h6: Story = {
  args: {
    variant: 'h6',
    children: 'Heading 6',
    bold: false,
    textMuted: false,
    textMuted500: false
  }
}

export const p: Story = {
  args: {
    variant: 'p',
    children: 'Parraph',
    bold: false,
    textMuted: false,
    textMuted500: false
  }
}

export const span: Story = {
  args: {
    variant: 'span',
    children: 'Span',
    bold: false,
    textMuted: false,
    textMuted500: false
  }
}

export const currency: Story = {
  args: {
    variant: 'currency',
    children: '32500',
    bold: false,
    textMuted: false,
    textMuted500: false
  }
}

export const responsive: Story = {
  args: {
    children: 'Responsive',
    size: { sm: '4xl', md: '2xl', lg: '6xl', xl: '9xl', '2xl': 'sm' }
  }
}
