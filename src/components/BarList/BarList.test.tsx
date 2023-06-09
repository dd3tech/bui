import { it, describe } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import BarList from './BarList'

const barListProps = {
  listData: [
    {
      label: 'Snapchat',
      value: 0,
      endIcon: <div data-testid="end-icon" />
    },
    { label: 'Linkedin', value: 25 },
    {
      label: 'Twitter',
      href: 'https://twitter.com/',
      value: 50,
      startIcon: <div data-testid="start-icon" />
    },
    { label: 'Facebook', value: 75 },
    { label: 'Instagram', value: 100 }
  ],
  titleMetrics: 'Networks',
  titleValues: 'Users'
}

const renderComponent = () => {
  return render(
    <BarList
      {...barListProps}
      heightBar="screen"
      classNameBar="font-bold"
      className="max-w-lg"
    />
  )
}

describe('<BarList />', () => {
  afterEach(cleanup)

  it('should be render', () => {
    const { container } = renderComponent()

    expect(container.firstChild).toBeDefined()
  })

  it('should render the titles', () => {
    const { getByText } = renderComponent()

    expect(getByText('Networks')).toBeDefined()
    expect(getByText('Users')).toBeDefined()
  })

  it('should render the icons', () => {
    const { getByTestId } = renderComponent()

    expect(getByTestId('end-icon')).toBeDefined()
    expect(getByTestId('start-icon')).toBeDefined()
  })

  it('the items of the dataList should be rendered', () => {
    const { getAllByTestId } = renderComponent()

    expect(getAllByTestId('item-bar')).toHaveLength(5)
  })

  it('when passing the prop className, the className must be inserted in the container of the <BarList />', () => {
    const { getByTestId } = renderComponent()

    expect(getByTestId('container-bar-list').className).toContain('max-w-lg')
  })

  it('applies the "h-screen" class to the bar of each element when using the "heightBar" property', () => {
    const { getAllByTestId } = renderComponent()

    const items = getAllByTestId('item-background')
    items.forEach((item) => {
      expect(item?.className).toContain('h-screen')
    })
  })

  it('when an item contains an href, a link must be rendered', () => {
    const { getByTestId } = renderComponent()

    expect(getByTestId('label-link')).toBeDefined()
  })
})
