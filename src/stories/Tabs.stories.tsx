import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  TabGroup as TabGroupComponent,
  Tab as TabComponent,
  TabPanel as TabPanelComponent
} from '../components'

const meta: Meta<typeof TabGroupComponent> = {
  title: 'Navigation/Tabs',
  component: TabGroupComponent
}

export default meta
type Story = StoryObj<typeof TabGroupComponent>

export const TabGroup: Story = {
  args: {
    orientation: 'vertical',
    indicatorColor: 'var(--primary)',
    variant: 'primary',
    wideLine: 3,
    textColor: 'var(--primary)',
    textDisabledColor: '#D1D5DB'
  },
  render: (args) => {
    const [value, setValue] = useState(0)
    const onChange = (newValue: number) => setValue(newValue)

    return (
      <div className="flex flex-wrap flex-grow">
        <TabGroupComponent
          variant="primary"
          disabledText="proximamente"
          {...args}
          value={value}
          onChange={onChange}
        >
          <TabComponent label="Precio y absorción" />
          <TabComponent label="Competencia" />
          <TabComponent label="Insights de mercado históricos" />
          <TabComponent label="Item four" />
          <TabComponent label="Item five" />
          <TabComponent label="Item six" />
          <TabComponent label="Item seven" />
          <TabComponent label="Item eight" disabled />
          <TabComponent label="Item nine" />
          <TabComponent label="Item ten" />
        </TabGroupComponent>
        <TabPanelComponent value={value} index={0}>
          <p>Item one</p>
        </TabPanelComponent>
        <TabPanelComponent value={value} index={1}>
          <p>Item two</p>
        </TabPanelComponent>
        <TabPanelComponent value={value} index={2}>
          <p>Item three</p>
        </TabPanelComponent>
        <TabPanelComponent value={value} index={3}>
          <p>Item four</p>
        </TabPanelComponent>
        <TabPanelComponent value={value} index={4}>
          <p>Item five</p>
        </TabPanelComponent>
        <TabPanelComponent value={value} index={5}>
          <p>Item six</p>
        </TabPanelComponent>
        <TabPanelComponent value={value} index={6}>
          <p>Item seven</p>
        </TabPanelComponent>
        <TabPanelComponent value={value} index={7}>
          <p>Item eight</p>
        </TabPanelComponent>
        <TabPanelComponent value={value} index={8}>
          <p>Item nine</p>
        </TabPanelComponent>
        <TabPanelComponent value={value} index={9}>
          <p>Item ten</p>
        </TabPanelComponent>
      </div>
    )
  }
}
