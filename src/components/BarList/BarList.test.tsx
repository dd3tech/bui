import { it, describe } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import BarList from './BarList'

const barListProps = {
  listData: [
    {
      title: 'Snapchat',
      value: 0,
      endIcon: <div data-testid="end-icon" />
    },
    { title: 'Linkedin', value: 25 },
    {
      title: 'Twitter',
      href: 'https://twitter.com/',
      value: 50,
      startIcon: <div data-testid="start-icon" />
    },
    { title: 'Facebook', value: 75 },
    { title: 'Instagram', value: 100 }
  ],
  titleMetrics: 'Redes',
  titleValues: 'Usuarios'
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
    const { getByTestId } = renderComponent()

    expect(getByTestId('container-bar-list')).toBeDefined()
  })

  it('should render the titles', () => {
    const { getByText } = renderComponent()

    expect(getByText('Redes')).toBeDefined()
    expect(getByText('Usuarios')).toBeDefined()
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

  it('when passing the prop heightBar it should be rendered in the className of each items background container', () => {
    const { getAllByTestId } = renderComponent()

    const items = getAllByTestId('item-background')
    items.forEach((item) => {
      expect(item?.className).toContain('h-screen')
    })
  })

  it('when passing the prop classNameBar it should be rendered in the className of each items background container', () => {
    const { getAllByTestId } = renderComponent()

    const items = getAllByTestId('item-background')
    items.forEach((item) => {
      expect(item?.className).toContain('font-bold')
    })
  })

  it('when an item contains an href, a link must be rendered', () => {
    const { getByTestId } = renderComponent()

    expect(getByTestId('title-link')).toBeDefined()
  })

  it('when an item does not contain an href, a text must be rendered', () => {
    const { getAllByTestId } = renderComponent()

    expect(getAllByTestId('title-text')).toHaveLength(4)
  })
})
