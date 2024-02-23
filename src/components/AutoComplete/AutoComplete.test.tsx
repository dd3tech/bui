import { fireEvent, render } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import AutoComplete from './AutoComplete'

const testProjectData = [
  { id: 1, name: 'Veracruz 45' },
  { id: 2, name: 'México 45' },
  { id: 3, name: 'Xalapa' },
  { id: 4, name: 'Queretaro 34' },
  { id: 5, name: 'Guadalajara 102' }
]

describe('<AutoComplete />', () => {
  describe('render autocomplete input', () => {
    it('must allow entering alphanumeric characters', () => {
      const { getByRole } = render(<AutoComplete items={[]} />)

      fireEvent.change(getByRole('autocomplete'), {
        target: { value: 'is one test 45' }
      })

      expect(getByRole('autocomplete')).toHaveProperty(
        'value',
        'is one test 45'
      )
    })
  })

  describe('disabled', () => {
    it('should have the disabled class', () => {
      const { getByRole } = render(<AutoComplete items={[]} disabled />)

      expect(getByRole('autocomplete')).toHaveAttribute('disabled')
    })

    it('should be overridden by props', () => {
      const { getByRole } = render(<AutoComplete items={[]} disabled={false} />)

      expect(getByRole('autocomplete')).not.toHaveAttribute('disabled')
    })

    describe('renders a different children according to the following cases', () => {
      it('renders a loading message when the property is loading', () => {
        const { getByRole, getByTestId } = render(
          <AutoComplete items={[]} isLoading />
        )

        expect(getByRole('loader')).toHaveTextContent('Loading...')
        expect(getByTestId('container').children.length).toBe(1)
        expect(getByTestId('container').children[0]).toBe(getByRole('loader'))
      })

      it('renders a non-matching message when there are no elements in the array "items{[]}"', () => {
        const { getByRole } = render(
          <AutoComplete items={[]} isLoading={false} />
        )
        expect(getByRole('dialog')).toHaveTextContent('no matches')
        expect(getByRole('dialog').children[0].className).toContain(
          'text-red-700'
        )
      })

      it('render a list of elements when the array contains at least one element', () => {
        const { getByRole, getAllByRole } = render(
          <AutoComplete items={testProjectData} isLoading={false} />
        )
        expect(getByRole('list')).toBeInTheDocument()
        expect(getAllByRole('row').length).toEqual(testProjectData.length)
      })
    })

    describe('with rendered elements', () => {
      it('if I click on an element it should change the text of the input to the string of the selected element', () => {
        const { getByRole, getAllByRole } = render(
          <AutoComplete items={testProjectData} />
        )
        fireEvent.click(getAllByRole('row')[3])
        expect(getByRole('autocomplete')).toHaveProperty(
          'value',
          testProjectData[3].name
        )
      })

      it('if i select an element it should close the container of all elements', () => {
        const { getByRole, getAllByRole } = render(
          <AutoComplete items={testProjectData} />
        )
        fireEvent.change(getByRole('autocomplete'), {
          target: { value: 'show items' }
        })
        expect(getByRole('panel').className).not.toContain('hidden')
        fireEvent.click(getAllByRole('row')[1])
        expect(getByRole('panel').className).toContain('hidden')
      })

      it('should not close the element container when doing onBlur to input by default', () => {
        vi.useFakeTimers()
        const { getByRole } = render(
          <AutoComplete items={testProjectData} isCloseOnBlur={false} />
        )
        fireEvent.change(getByRole('autocomplete'), {
          target: { value: 'is one test 45' }
        })
        expect(getByRole('panel').className).not.toContain('hidden')
        fireEvent.blur(getByRole('autocomplete'))
        setTimeout(
          () => expect(getByRole('panel').className).not.toContain('hidden'),
          300
        )
        vi.runAllTimers()
      })

      it('should close the element container if I do onBlur and the property isCloseOnBlur="true"', () => {
        vi.useFakeTimers()
        const { getByRole } = render(
          <AutoComplete items={testProjectData} isCloseOnBlur={true} />
        )
        fireEvent.change(getByRole('autocomplete'), {
          target: { value: 'is one test 45' }
        })
        expect(getByRole('panel').className).not.toContain('hidden')
        fireEvent.blur(getByRole('autocomplete'))
        setTimeout(
          () => expect(getByRole('panel').className).toContain('hidden'),
          300
        )
        vi.runAllTimers()
      })

      it('the element container should appear another round on input focus only if the property isCloseOnBlur={true} after onBlur', () => {
        vi.useFakeTimers()
        const { getByRole } = render(
          <AutoComplete
            items={testProjectData}
            value="is ok"
            isCloseOnBlur={true}
          />
        )
        fireEvent.change(getByRole('autocomplete'), {
          target: { value: 'show container' }
        })
        expect(getByRole('panel').className).not.toContain('hidden')
        fireEvent.blur(getByRole('autocomplete'))
        setTimeout(
          () => expect(getByRole('panel').className).toContain('hidden'),
          300
        )
        vi.runAllTimers()
        fireEvent.focus(getByRole('autocomplete'))
        expect(getByRole('panel').className).not.toContain('hidden')
      })
    })

    it('executing the onChange function', () => {
      let value = ''
      const onChange = (event: any) => {
        value = event.target.value
      }
      const { getByRole } = render(
        <AutoComplete
          onChange={onChange}
          value={value}
          items={testProjectData}
        />
      )
      fireEvent.change(getByRole('autocomplete'), {
        target: { value: 'hello test' }
      })

      expect(getByRole('autocomplete')).toHaveProperty('value', value)
    })

    it('If the onSelect, removeSelect function is executed, the container elements should disappear', () => {
      const onSelected = vi.fn()
      const removeSelected = vi.fn()
      const { getByRole, getAllByRole } = render(
        <AutoComplete
          removeSelectedItem={removeSelected}
          onSelectItem={onSelected}
          items={testProjectData}
        />
      )

      fireEvent.change(getByRole('autocomplete'), {
        target: { value: 'show list' }
      })
      expect(getByRole('panel').className).not.toContain('hidden')
      fireEvent.click(getAllByRole('row')[1])
      expect(getByRole('panel').className).toContain('hidden')
    })

    it('should disable list option', () => {
      const onSelected = vi.fn()
      const { getAllByRole } = render(
        <AutoComplete
          onSelectItem={onSelected}
          items={[
            ...testProjectData,
            { id: 6, name: 'Palapas 30', disabled: true }
          ]}
        />
      )

      fireEvent.click(getAllByRole('row')[5])

      expect(onSelected).not.toHaveBeenCalled()
    })

    describe('should respects the componentsProps if passed', () => {
      it('canFindText is working', () => {
        const canFindText = 'no hay coincidencias'
        const { getByRole } = render(
          <AutoComplete items={[]} canFindText={canFindText} />
        )

        expect(getByRole('dialog')).toHaveTextContent(canFindText)
      })

      it('loadingText is working', () => {
        const loadingText = 'cargando elementos...'
        const { getByRole } = render(
          <AutoComplete items={[]} isLoading loadingText={loadingText} />
        )

        expect(getByRole('loader')).toHaveTextContent(loadingText)
      })

      it('placeholder is working', () => {
        const placeholder = 'search project'
        const { getByRole } = render(
          <AutoComplete items={[]} placeholder={placeholder} />
        )

        expect(getByRole('autocomplete')).toHaveProperty(
          'placeholder',
          placeholder
        )
      })
    })
  })
})
