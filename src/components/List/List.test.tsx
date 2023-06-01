import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import List from './List'
import { XIcon } from '@heroicons/react/outline'

describe('<List/>', () => {
  it('should be render', () => {
    const { getByRole } = render(
      <List>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('unorder-list')).toBeDefined()
  })

  it('should render an order list when ordered prop is true', () => {
    const { getByRole } = render(
      <List ordered>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('order-list')).toBeDefined()
  })

  it('should render the list item', () => {
    const { getByRole } = render(
      <List ordered>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item')).toBeDefined()
  })

  it('should render the list icon', () => {
    const { getByRole } = render(
      <List ordered>
        <List.Item>
          <List.Icon>
            <XIcon />
          </List.Icon>
          Hey!
        </List.Item>
      </List>
    )

    expect(getByRole('list-icon')).toBeDefined()
  })

  it('should have gap has 5 by default', () => {
    const { getByRole } = render(
      <List>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('unorder-list')).toHaveStyle({ gap: '5px' })
  })

  it('should have gap between icon and text has 0 by default', () => {
    const { getByRole } = render(
      <List>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item')).toHaveStyle({ gap: '0px' })
  })

  it('should have the icon color as black by default', () => {
    const { getByRole } = render(
      <List>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item')?.firstChild).toHaveStyle({ color: '#000' })
  })

  it('should have a bullet point icon by default', () => {
    const { getByRole } = render(
      <List>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item')?.firstChild?.textContent).toBe('•')
  })

  it('should have a bullet point icon by default', () => {
    const { getByRole } = render(
      <List>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item')?.firstChild?.textContent).toBe('•')
  })

  it('should have 25px of size the unorder list icon by default', () => {
    const { getByRole } = render(
      <List>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item')?.firstChild).toHaveStyle({ fontSize: '25px' })
  })

  it('should have 16px of size the order list icon by default', () => {
    const { getByRole } = render(
      <List ordered>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item')?.firstChild).toHaveStyle({ fontSize: '16px' })
  })

  it('should have 25px of line height by default', () => {
    const { getByRole } = render(
      <List>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item')?.firstChild).toHaveStyle({
      lineHeight: '25px'
    })
  })

  it('should have an empty prefix and a dot as suffix label by default', () => {
    const { getByRole } = render(
      <List ordered>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item')?.firstChild?.textContent).toBe('1.')
  })

  it('should change the gap', () => {
    const { getByRole } = render(
      <List gap={14}>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('unorder-list')).toHaveStyle({ gap: '14px' })
  })

  it('should change the gap between icon and text', () => {
    const { getByRole } = render(
      <List gapItem={12}>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item')).toHaveStyle({ gap: '12px' })
  })

  it('should change the icon color', () => {
    const { getByRole } = render(
      <List iconColor="#f3f3f3">
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item').firstChild).toHaveStyle({
      color: '#f3f3f3'
    })
  })

  it('should change the icon size', () => {
    const { getByRole } = render(
      <List iconSize={32}>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item').firstChild).toHaveStyle({
      fontSize: '32px'
    })
  })

  it('should change the line height of the icon', () => {
    const { getByRole } = render(
      <List iconLineHeight={24}>
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item').firstChild).toHaveStyle({
      lineHeight: '24px'
    })
  })

  it('should change the prefix and suffix labes in the order list', () => {
    const { getByRole } = render(
      <List ordered prefixLabel="." suffixLabel=")">
        <List.Item>Hey!</List.Item>
      </List>
    )

    expect(getByRole('list-item').firstChild?.textContent).toBe('.1)')
  })
})
