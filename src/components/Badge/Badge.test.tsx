import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import Badge from './Badge'

const badgeContainer = 'container-badge'

describe('<Badge/>', () => {
  it('should be render', () => {
    const { container } = render(<Badge />)
    expect(container.firstChild).toBeDefined()
  })

  it('the prop className works correctly ', () => {
    const { getByRole } = render(
      <Badge variant="primary" icon="tag" className="text-red-600" />
    )
    expect(getByRole(badgeContainer).className).toContain('text-red-600')
  })

  it('the prop classNameIcon works correctly ', () => {
    const { getByRole } = render(
      <Badge variant="primary" icon="tag" classNameIcon="text-red-600" />
    )
    const classNameIconElement = getByRole(badgeContainer)
      .firstChild as HTMLDivElement
    expect(classNameIconElement.getAttribute('class')).toBe('text-red-600')
  })

  describe('render with different variants', () => {
    it('Badge contains the className corresponding to the warning variant', () => {
      const { getByRole } = render(<Badge variant="warning" icon="success" />)
      expect(getByRole(badgeContainer).className).toContain(
        'bg-yellow-100 border border-warning text-info'
      )
    })

    it('Badge contains the className corresponding to the infoPrimary variant ', () => {
      const { getByRole } = render(<Badge variant="infoPrimary" />)
      expect(getByRole(badgeContainer).className).toContain(
        'bg-blue-50 border border-blue-300 text-info'
      )
    })

    it('Badge contains the className corresponding to the infoSecondary variant ', () => {
      const { getByRole } = render(<Badge variant="infoSecondary" />)
      expect(getByRole(badgeContainer).className).toContain(
        'bg-transparent border border-blue-300 text-info'
      )
    })

    it('Badge contains the className corresponding to the success variant ', () => {
      const { getByRole } = render(<Badge variant="success" />)
      expect(getByRole(badgeContainer).className).toContain(
        'bg-green-50 border border-green-300 text-info font-medium'
      )
    })

    it('Badge contains the className corresponding to the primary variant ', () => {
      const { getByRole } = render(<Badge variant="primary" />)
      expect(getByRole(badgeContainer).className).toContain(
        'bg-transparent border border-primary text-primary'
      )
    })

    it('Badge contains the className corresponding to the secondary variant ', () => {
      const { getByRole } = render(<Badge variant="secondary" />)
      expect(getByRole(badgeContainer).className).toContain(
        'bg-transparent border border-white text-white hover:bg-gray-50 hover:text-black'
      )
    })

    it('Badge contains the className corresponding to the error variant and the props text works correctly  ', () => {
      const { getByRole } = render(<Badge variant="error" text="Testing" />)
      expect(getByRole(badgeContainer).className).toContain(
        'bg-error border border-red-300 text-info font-medium'
      )
      expect(getByRole(badgeContainer).textContent).contain('Testing')
    })
  })

  describe('prop: icon', () => {
    it('if the prop icon not exist, should be rendered with justify-center', () => {
      const { getByRole } = render(<Badge icon="none" />)
      expect(getByRole(badgeContainer).className).toContain('justify-center')
    })

    it('the props icon works correctly ', async () => {
      const { container, rerender } = render(
        <Badge variant="success" icon="success" />
      )
      expect(container.querySelector(`[id=success]`)).not.toBeNull()
      rerender(<Badge variant="primary" icon="tag" />)
      expect(container.querySelector(`[id=success]`)).toBeNull()
      expect(container.querySelector(`[id=tag]`)).toBeDefined()
    })

    it('if an icon is not provided, one should be assigned by default', () => {
      const { getByRole } = render(<Badge variant="warning" />)
      expect(getByRole(badgeContainer).id).toBe('HomeIcon')
    })

    it('icon tag should be render', () => {
      const { getByRole } = render(<Badge icon="tag" />)
      expect(getByRole(badgeContainer).id).toBe('tag')
    })

    it('icon clock should be render', () => {
      const { getByRole } = render(<Badge icon="clock" />)
      expect(getByRole(badgeContainer).id).toBe('clock')
    })

    it('icon warning should be render', () => {
      const { getByRole } = render(<Badge icon="warning" />)
      expect(getByRole(badgeContainer).id).toBe('warning')
    })

    it('icon check should be render', () => {
      const { getByRole } = render(<Badge icon="check" />)
      expect(getByRole(badgeContainer).id).toBe('check')
    })

    it('success icon should be render', () => {
      const { getByRole } = render(<Badge icon="success" />)
      expect(getByRole(badgeContainer).id).toBe('success')
    })

    it('exclamation icon works correctly', () => {
      const { getByRole } = render(<Badge icon="exclamation" />)
      expect(getByRole(badgeContainer).id).toBe('exclamation')
    })

    it('icon clipboard-copy should be render', () => {
      const { getByRole } = render(<Badge icon="clipboard-copy" />)
      expect(getByRole(badgeContainer).id).toBe('clipboard-copy')
    })

    it('home icon should be render', () => {
      const { getByRole } = render(<Badge icon="HomeIcon" />)
      expect(getByRole(badgeContainer).id).toBe('HomeIcon')
    })

    it('none icon should be render without icon', () => {
      const { getByRole } = render(<Badge icon="none" />)
      expect(getByRole(badgeContainer).id).toBe('none')
    })
  })
})
