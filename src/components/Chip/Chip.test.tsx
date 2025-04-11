import { it, describe } from 'vitest'
import { render } from '@testing-library/react'
import Chip from './Chip'

const ChipContainer = 'container-Chip'

describe('<Chip/>', () => {
  it('should be render', () => {
    const { container } = render(<Chip />)
    expect(container.firstChild).toBeDefined()
  })

  it('the prop className works correctly ', () => {
    const { getByRole } = render(
      <Chip variant="primary" icon="tag" className="text-error" />
    )
    expect(getByRole(ChipContainer).className).toContain('text-error')
  })

  it('the prop classNameIcon works correctly ', () => {
    const { getByRole } = render(
      <Chip variant="primary" icon="tag" classNameIcon="text-error" />
    )
    const classNameIconElement = getByRole(ChipContainer)
      .firstChild as HTMLDivElement
    expect(classNameIconElement.getAttribute('class')).toBe('text-error')
  })

  describe('render with different variants', () => {
    it('Chip contains the className corresponding to the warning variant', () => {
      const { getByRole } = render(<Chip variant="warning" icon="success" />)
      expect(getByRole(ChipContainer).className).toContain(
        'bg-yellow-100 border border-warning text-info'
      )
    })

    it('Chip contains the className corresponding to the infoPrimary variant ', () => {
      const { getByRole } = render(<Chip variant="infoPrimary" />)
      expect(getByRole(ChipContainer).className).toContain(
        'bg-blue-50 border border-blue-300 text-info'
      )
    })

    it('Chip contains the className corresponding to the infoSecondary variant ', () => {
      const { getByRole } = render(<Chip variant="infoSecondary" />)
      expect(getByRole(ChipContainer).className).toContain(
        'bg-transparent border border-blue-300 text-info'
      )
    })

    it('Chip contains the className corresponding to the success variant ', () => {
      const { getByRole } = render(<Chip variant="success" />)
      expect(getByRole(ChipContainer).className).toContain(
        'bg-green-50 border border-green-300 text-info font-medium'
      )
    })

    it('Chip contains the className corresponding to the primary variant ', () => {
      const { getByRole } = render(<Chip variant="primary" />)
      expect(getByRole(ChipContainer).className).toContain(
        'bg-transparent border border-primary text-primary'
      )
    })

    it('Chip contains the className corresponding to the secondary variant ', () => {
      const { getByRole } = render(<Chip variant="secondary" />)
      expect(getByRole(ChipContainer).className).toContain(
        'bg-transparent border border-white text-white hover:bg-gray-50 hover:text-black'
      )
    })

    it('Chip contains the className corresponding to the error variant and the props text works correctly  ', () => {
      const { getByRole } = render(<Chip variant="error" text="Testing" />)
      expect(getByRole(ChipContainer).className).toContain(
        'bg-error border border-red-300 text-info font-medium'
      )
      expect(getByRole(ChipContainer).textContent).contain('Testing')
    })
  })

  describe('prop: icon', () => {
    it('if the prop icon not exist, should be rendered with justify-center', () => {
      const { getByRole } = render(<Chip icon="none" />)
      expect(getByRole(ChipContainer).className).toContain('justify-center')
    })

    it('the props icon works correctly ', async () => {
      const { container, rerender } = render(
        <Chip variant="success" icon="success" />
      )
      expect(container.querySelector(`[id=success]`)).not.toBeNull()
      rerender(<Chip variant="primary" icon="tag" />)
      expect(container.querySelector(`[id=success]`)).toBeNull()
      expect(container.querySelector(`[id=tag]`)).toBeDefined()
    })

    it('if an icon is not provided, one should be assigned by default', () => {
      const { getByRole } = render(<Chip variant="warning" />)
      expect(getByRole(ChipContainer).id).toBe('HomeIcon')
    })

    it('icon tag should be render', () => {
      const { getByRole } = render(<Chip icon="tag" />)
      expect(getByRole(ChipContainer).id).toBe('tag')
    })

    it('icon clock should be render', () => {
      const { getByRole } = render(<Chip icon="clock" />)
      expect(getByRole(ChipContainer).id).toBe('clock')
    })

    it('icon warning should be render', () => {
      const { getByRole } = render(<Chip icon="warning" />)
      expect(getByRole(ChipContainer).id).toBe('warning')
    })

    it('icon check should be render', () => {
      const { getByRole } = render(<Chip icon="check" />)
      expect(getByRole(ChipContainer).id).toBe('check')
    })

    it('success icon should be render', () => {
      const { getByRole } = render(<Chip icon="success" />)
      expect(getByRole(ChipContainer).id).toBe('success')
    })

    it('exclamation icon works correctly', () => {
      const { getByRole } = render(<Chip icon="exclamation" />)
      expect(getByRole(ChipContainer).id).toBe('exclamation')
    })

    it('icon clipboard-copy should be render', () => {
      const { getByRole } = render(<Chip icon="clipboard-copy" />)
      expect(getByRole(ChipContainer).id).toBe('clipboard-copy')
    })

    it('home icon should be render', () => {
      const { getByRole } = render(<Chip icon="HomeIcon" />)
      expect(getByRole(ChipContainer).id).toBe('HomeIcon')
    })

    it('none icon should be render without icon', () => {
      const { getByRole } = render(<Chip icon="none" />)
      expect(getByRole(ChipContainer).id).toBe('none')
    })
  })
})
