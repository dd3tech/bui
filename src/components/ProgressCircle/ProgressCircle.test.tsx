import { render } from '@testing-library/react'
import ProgressCircle from './ProgressCircle'

const defaultProps = {
    colorComplete: '#34D399',
    colorProgress: '#1D4ED8',
    colorBackground: '#DBEAFE',
    value: 100,
    strokeWidth: 11,
    classNamePercentage: 'w-full text-center text-3xl',
    width: 200,
    children: <p>Completed</p>
}

describe('ProgressCircle', () => {
    it('renders with default props', () => {
        const { getByRole } = render(<ProgressCircle {...defaultProps} />)
        expect(getByRole('container-circular-progress')).toBeInTheDocument()
    })

    it('should set progress color to green when reaching 100', () => {
        const { getByRole } = render(<ProgressCircle {...defaultProps} />)
        const testDiv = getByRole('container-circular-progress')
        const pathElement = testDiv.querySelector('.CircularProgressbar-path')

        expect(pathElement?.getAttribute('style')).toContain('stroke: #34D399')
    })

    it('should set progress color to blue when value is 10', () => {
        const { getByRole } = render(<ProgressCircle {...defaultProps} value={10} />)
        const testDiv = getByRole('container-circular-progress')
        const pathElement = testDiv.querySelector('.CircularProgressbar-path')

        expect(pathElement?.getAttribute('style')).toContain('stroke: #1D4ED8')
    })

    it('should set progress color to the one passed as a prop', () => {
        const { getByRole } = render(<ProgressCircle {...defaultProps} colorProgress="#14f39" value={10} />)
        const testDiv = getByRole('container-circular-progress')
        const pathElement = testDiv.querySelector('.CircularProgressbar-path')

        expect(pathElement?.getAttribute('style')).toContain('stroke: #14f39')
    })

    it('should display 100% when reaching 100', () => {
        const { getByText } = render(<ProgressCircle {...defaultProps} />)
        expect(getByText('100%')).toBeInTheDocument()
    })

    it('should display 10% when value is 10', () => {
        const { getByText } = render(<ProgressCircle {...defaultProps} value={10} />)
        expect(getByText('10%')).toBeInTheDocument()
    })

    it('should display 100% when the value exceeds the maximum (100%)', () => {
        const { getByText } = render(<ProgressCircle {...defaultProps} value={1011} />)
        expect(getByText('100%')).toBeInTheDocument()
    })

    it('should display the content passed as a child', () => {
        const { getByText } = render(<ProgressCircle {...defaultProps} />)
        expect(getByText('Completed')).toBeInTheDocument()
    })

    it('should display the content passed as a child with the proper className', () => {
        const { getByText, getByRole } = render(<ProgressCircle {...defaultProps} children={<div className="text-green-600">Test</div>} />)

        expect(getByText('Test')).toBeInTheDocument()
        expect(getByRole('children-circular').children[0].className).toContain('text-green-600')
    })
})
