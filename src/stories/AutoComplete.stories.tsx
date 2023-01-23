import React, { useState, useEffect } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import AutoCompleteComponent from '../components/AutoComplete'

export default {
    title: 'Form/AutoComplete',
    component: AutoCompleteComponent
} as ComponentMeta<typeof AutoCompleteComponent>

const testProjectData = [
    { id: 1, name: 'Veracruz 45' },
    { id: 2, name: 'México 45' },
    { id: 3, name: 'Xalapa' },
    { id: 4, name: 'Queretaro 34' },
    { id: 5, name: 'Guadalajara 102' }
]

const Template: ComponentStory<typeof AutoCompleteComponent> = (args) => {
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [projects, setProjects] = useState<any[]>([])
    const [currentProject, setCurrentProject] = useState<any>(null)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const onSelected = (item: any) => {
        setCurrentProject(item)
    }

    // request simulate api
    useEffect(() => {
        setIsLoading(true)
        const timeout = setTimeout(() => {
            setIsLoading(false)
            setProjects(testProjectData)
        }, 1200)
        return () => clearTimeout(timeout)
    }, [value])

    return <AutoCompleteComponent {...args} onSelectItem={onSelected} items={projects} value={value} onChange={onChange} isLoading={isLoading} />
}

export const AutoComplete = Template.bind({})
AutoComplete.args = {
    canFindText: 'sin coincidencias',
    isCloseOnBlur: true,
    loadingText: 'Cargando...',
    placeholder: 'search project',
    disabled: true,
    variant: 'success'
}
