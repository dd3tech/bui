import React from 'react'
import { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import AutoCompleteComponent from '../components/AutoComplete'

const testProjectData = [
  { id: 1, name: 'Veracruz 45', disabled: true },
  { id: 2, name: 'México 45' },
  { id: 3, name: 'Xalapa', disabled: true },
  { id: 4, name: 'Queretaro 34' },
  { id: 5, name: 'Guadalajara 102' }
]

const meta: Meta<typeof AutoCompleteComponent> = {
  title: 'Form/AutoComplete',
  component: AutoCompleteComponent
}

export default meta
type Story = StoryObj<typeof AutoCompleteComponent>

export const AutoComplete: Story = {
  args: {
    canFindText: 'sin coincidencias',
    isCloseOnBlur: true,
    loadingText: 'Cargando...',
    items: testProjectData,
    placeholder: 'search project',
    disabled: false,
    variant: 'success',
    label: 'Find your project'
  },
  render: function Render(args) {
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [projects, setProjects] = useState<any[]>([])
    const [currentProject, setCurrentProject] = useState<{
      id: number
      name: string
    } | null>(null)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    }

    const onSelected = (item: any) => {
      setCurrentProject(item)
    }

    useEffect(() => {
      setIsLoading(true)
      const timeout = setTimeout(() => {
        setIsLoading(false)
        setProjects(testProjectData)
      }, 1200)
      return () => clearTimeout(timeout)
    }, [value])

    return (
      <>
        <span>Current Project: {currentProject?.name}</span>
        <AutoCompleteComponent
          {...args}
          onSelectItem={onSelected}
          items={projects}
          value={value}
          onChange={onChange}
          isLoading={isLoading}
        />
      </>
    )
  }
}
