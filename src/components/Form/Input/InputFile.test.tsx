import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import InputFile from './InputFile'

describe('<InputFile />', () => {
  it('should render without error', () => {
    const { getByRole } = render(<InputFile roleContainer="container" />)

    expect(getByRole('container')).toBeInTheDocument()
  })

  it('should render label and labelAction correctly', () => {
    const { getByText } = render(<InputFile />)

    const label = getByText('Drag & drop your files or')
    const labelAction = getByText('browse from your device')

    expect(label).toBeInTheDocument()
    expect(labelAction).toBeInTheDocument()
  })

  it('should render boxMessage correctly', () => {
    const { getByText } = render(
      <InputFile boxMessage="PDF, PNG, JPG, Peso máximo por archivo 20 MB" />
    )

    expect(
      getByText('PDF, PNG, JPG, Peso máximo por archivo 20 MB').textContent
    ).toEqual('PDF, PNG, JPG, Peso máximo por archivo 20 MB')
  })

  it('handles onDragEnd, onDragLeave, and onDragOver', () => {
    const onChange = vi.fn()
    const { getByRole } = render(
      <InputFile role="input-file" onChange={onChange} />
    )
    const input = getByRole('input-file')
    const borderContainer = getByRole('border')

    fireEvent.dragOver(input)
    expect(borderContainer.className).toContain('border-dashed bg-gray-50')

    fireEvent.dragEnd(input)
    expect(borderContainer.className).not.toContain('border-dashed bg-gray-50')

    fireEvent.dragLeave(input)
    expect(borderContainer.className).not.toContain('border-dashed bg-gray-50')
  })

  it('should be change input file value', () => {
    const onChangeMock = vi.fn()
    const { getByRole } = render(
      <InputFile role="input-file" onChange={onChangeMock} />
    )
    const input = getByRole('input-file')
    fireEvent.change(input)
    expect(onChangeMock).toHaveBeenCalled()
  })

  it('should be show a progress indicator when this is different to 0', () => {
    const { getByRole } = render(
      <InputFile role="input-file" progressIndicator={40} />
    )
    const progressBar = getByRole('progressbar')
    const input = getByRole('input-file')
    expect(progressBar).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  describe('props: errorMessage and hasError', () => {
    const errorMessage = 'Tipo de archivo no permitido o excede el peso máximo'
    it('when hasError is true, should be show the error message', () => {
      const { getByText } = render(
        <InputFile error={{ show: true, message: errorMessage }} />
      )
      expect(getByText(errorMessage)).toBeInTheDocument()
    })

    it('when hasError is false, should be not show the error message', () => {
      const { container } = render(
        <InputFile error={{ show: false, message: errorMessage }} />
      )
      expect(container.querySelector(errorMessage)).not.toBeInTheDocument()
    })
  })
})
