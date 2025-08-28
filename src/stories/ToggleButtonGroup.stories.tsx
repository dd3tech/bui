import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ToggleButtonGroup from '../components/Buttons/ToggleButtonGroup'
import type { ToggleOption } from '../components/Buttons/ToggleButtonGroup'

const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Buttons/ToggleButtonGroup',
  component: ToggleButtonGroup,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof ToggleButtonGroup>

// Example data arrays
const STATUS_OPTIONS: ToggleOption[] = [
  { id: 'sold', label: 'Vendidas' },
  { id: 'deeded', label: 'Escrituradas' }
]

const SIX_OPTIONS: ToggleOption[] = [
  { id: 'opt1', label: 'option 1' },
  { id: 'opt2', label: 'option 2' },
  { id: 'opt3', label: 'option 3' },
  { id: 'opt4', label: 'option 4' },
  { id: 'opt5', label: 'option 5' },
  { id: 'opt6', label: 'option 6' }
]

const SINGLE_TOGGLE: ToggleOption[] = [{ id: 'kpi', label: 'Mostrar KPIs' }]

// Single Toggle Story
export const SingleToggle: Story = {
  render: () => {
    const [on, setOn] = useState(false)

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <ToggleButtonGroup
            items={SINGLE_TOGGLE}
            kind="single"
            value={on}
            onChange={(value) => setOn(Boolean(value))}
          />
          <span className="text-sm text-gray-600">
            Status: {on ? 'ON' : 'OFF'}
          </span>
        </div>

        {on && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">KPIs are now visible!</p>
          </div>
        )}
      </div>
    )
  }
}

// Group Story
export const Group: Story = {
  render: () => {
    const [tab, setTab] = useState<string | null>('sold')

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <ToggleButtonGroup
            items={STATUS_OPTIONS}
            kind="group"
            value={tab}
            onChange={(value) => setTab(value as string | null)}
          />
          <span className="text-sm text-gray-600">
            Selected: {tab || 'none'}
          </span>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          {tab === 'sold' && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Ventas Panel</h3>
              <p className="text-gray-600">Showing sales data and metrics...</p>
            </div>
          )}
          {tab === 'deeded' && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">
                Escrituradas Panel
              </h3>
              <p className="text-gray-600">Showing deeded properties data...</p>
            </div>
          )}
          {!tab && <p className="text-gray-500 italic">No tab selected</p>}
        </div>
      </div>
    )
  }
}

// Group with Allow Deselect Story
export const GroupWithAllowDeselect: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>('opt3')

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <ToggleButtonGroup
            items={SIX_OPTIONS}
            kind="group"
            value={selected}
            allowDeselect={true}
            onChange={(value) => setSelected(value as string | null)}
          />
        </div>

        <p className="text-sm text-gray-600">
          Selected: <span className="font-mono">{selected || 'none'}</span>
          <br />
          <span className="text-xs text-gray-500">
            Click the active option again to deselect it
          </span>
        </p>
      </div>
    )
  }
}

// Sizes Story
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Extra Small</h3>
        <ToggleButtonGroup
          items={STATUS_OPTIONS}
          kind="group"
          size="xs"
          defaultValue="sold"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Small</h3>
        <ToggleButtonGroup
          items={STATUS_OPTIONS}
          kind="group"
          size="sm"
          defaultValue="sold"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Medium (Default)</h3>
        <ToggleButtonGroup
          items={STATUS_OPTIONS}
          kind="group"
          size="md"
          defaultValue="sold"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Large</h3>
        <ToggleButtonGroup
          items={STATUS_OPTIONS}
          kind="group"
          size="lg"
          defaultValue="sold"
        />
      </div>
    </div>
  )
}

// Uncontrolled Examples
export const Uncontrolled: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">
          Uncontrolled Group (default: option 3)
        </h3>
        <ToggleButtonGroup
          items={SIX_OPTIONS}
          kind="group"
          defaultValue="opt3"
          onChange={(value) => console.log('Selected:', value)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">
          Uncontrolled Single Toggle (default: ON)
        </h3>
        <ToggleButtonGroup
          items={SINGLE_TOGGLE}
          kind="single"
          defaultValue={true}
          onChange={(value) => console.log('Toggle:', value)}
        />
      </div>
    </div>
  )
}
