import { render } from '@testing-library/react'
import Checkbox from 'components/Checkbox'
import FormControlLabel, { directionLabel } from './FormControlLabel'

describe('<FormControlLabel /> ', () => {
  it('renders a required control, which can be any jsx element', () => {
    const { getByRole } = render(
      <FormControlLabel
        control={<input role="radio" type="radio" value="Test" />}
        label="Test"
      />
    )

    expect(getByRole('radio')).toBeDefined()
    expect(getByRole('radio')).toHaveAttribute('value', 'Test')
  })

  it('Label prop is required', () => {
    const { getByTestId } = render(
      <FormControlLabel
        data-testid="control"
        label="Test Label"
        control={<p>child</p>}
      />
    )

    expect(getByTestId('control')).toHaveTextContent('Test Label')
  })

  describe('disabled', () => {
    it('should have the disabled class', () => {
      const { getByRole } = render(
        <FormControlLabel
          disabled
          control={<Checkbox />}
          label="Control Disabled"
        />
      )

      expect(getByRole('checkbox')).toHaveAttribute('disabled')
    })

    it('should be overridden by props', () => {
      const { getByRole } = render(
        <FormControlLabel
          disabled
          control={<Checkbox disabled={false} />}
          label="Control Disabled But Checkbook disabled='false'"
        />
      )

      expect(getByRole('checkbox')).not.toHaveAttribute('disabled')
    })
  })

  describe('position label', () => {
    it('top', () => {
      const { getByRole } = render(
        <FormControlLabel
          role="control"
          control={<Checkbox />}
          label="top"
          labelPlacement="top"
        />
      )

      expect(getByRole('control').className).toContain(directionLabel.top)
    })

    it('bottom', () => {
      const { getByRole } = render(
        <FormControlLabel
          role="control"
          control={<Checkbox />}
          label="bottom"
          labelPlacement="bottom"
        />
      )

      expect(getByRole('control').className).toContain(directionLabel.bottom)
    })

    it('start', () => {
      const { getByRole } = render(
        <FormControlLabel
          role="control"
          control={<Checkbox />}
          label="start"
          labelPlacement="start"
        />
      )

      expect(getByRole('control').className).toContain(directionLabel.start)
    })

    it('end', () => {
      const { getByRole } = render(
        <FormControlLabel
          role="control"
          control={<Checkbox />}
          label="end"
          labelPlacement="end"
        />
      )

      expect(getByRole('control').className).toContain(directionLabel.end)
    })
  })
})
