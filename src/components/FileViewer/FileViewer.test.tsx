import { fireEvent, prettyDOM, render } from '@testing-library/react'
import { it, describe, expect, vi } from 'vitest'

import FileViewer from './FileViewer'
import { DownloadIcon, TrashIcon, ArrowsExpandIcon, XIcon } from '@heroicons/react/outline'

describe('<FileViewer/>', () => {
    const mockClick = vi.fn()

    beforeEach(() => {
        const modalRoot = document.createElement('div')
        modalRoot.setAttribute('id', 'portal-root')
        document.body.appendChild(modalRoot)
    })

    it('should render correctly', () => {
        const { getByRole } = render(<FileViewer role="file-viewer">is ok</FileViewer>)

        expect(getByRole('file-viewer')).toBeDefined()
    })

    it('should display the file name', () => {
        const { getByText } = render(
            <FileViewer>
                <FileViewer.ViewerActions fileName="test.pdf" />
            </FileViewer>
        )

        expect(getByText('test.pdf')).toBeDefined()
    })

    it('should display the status badge', () => {
        const { getByText } = render(
            <FileViewer>
                <FileViewer.ViewerActions fileName="test.pdf" status="badge" />
            </FileViewer>
        )

        expect(getByText('badge')).toBeDefined()
    })

    it('should not display the status badge when status property is undefined', () => {
        const { queryByRole } = render(
            <FileViewer>
                <FileViewer.ViewerActions fileName="test.pdf" />
            </FileViewer>
        )

        expect(queryByRole('text-badge')).toBeNull()
    })

    it('should display the backgroundcolor passed through the className and should not set the backgroundColor to the style tag', () => {
        const { getByRole } = render(
            <FileViewer className="bg-purple-200">
                <FileViewer.ViewerActions fileName="test.pdf" />
            </FileViewer>
        )

        expect(getByRole('viewer-modal').style.getPropertyValue('background-color')).toBe('')
        expect(getByRole('viewer-modal').className).toContain('bg-purple-200')
    })

    it("should show the DownloadIcon by default if I didn't pass an icon to it", () => {
        const { getByRole } = render(
            <FileViewer>
                <FileViewer.ViewerActions>
                    <FileViewer.BtnAction role="btnDownload" onClick={mockClick} />
                </FileViewer.ViewerActions>
            </FileViewer>
        )

        const btn = getByRole('btnDownload').firstChild as HTMLElement
        expect(btn.getAttribute('id')).toBe('DownloadIcon')
    })

    it('should show the children that happened to it instead of an svg icon', () => {
        const { getByText } = render(
            <FileViewer>
                <FileViewer.ViewerActions>
                    <FileViewer.BtnAction variant="primary">is a custom children</FileViewer.BtnAction>
                </FileViewer.ViewerActions>
            </FileViewer>
        )

        expect(getByText('is a custom children')).toBeDefined()
    })

    it('should run the download file function when download button is clicked', () => {
        const { getByRole } = render(
            <FileViewer role="file-viewer">
                <FileViewer.ViewerActions>
                    <FileViewer.BtnAction role="btnDownload" icon={<DownloadIcon className="h-5 w-5" />} onClick={mockClick} />
                    <FileViewer.BtnAction role="deleteIcon" icon={<TrashIcon className="h-5 w-5" />} onClick={mockClick} />
                    <FileViewer.BtnAction role="expandIcon" icon={<ArrowsExpandIcon className="h-5 w-5" />} onClick={mockClick} />
                    <FileViewer.BtnAction role="closeModal" icon={<XIcon className="h-5 w-5" />} onClick={mockClick} />
                </FileViewer.ViewerActions>
            </FileViewer>
        )

        expect(getByRole('btnDownload')).toBeDefined()
        expect(getByRole('deleteIcon')).toBeDefined()
        expect(getByRole('expandIcon')).toBeDefined()
        expect(getByRole('closeModal')).toBeDefined()

        fireEvent.click(getByRole('btnDownload'))
        expect(mockClick).toHaveBeenCalled()
        fireEvent.click(getByRole('deleteIcon'))
        expect(mockClick).toHaveBeenCalled()
        fireEvent.click(getByRole('expandIcon'))
        expect(mockClick).toHaveBeenCalled()
        fireEvent.click(getByRole('closeModal'))
        expect(mockClick).toHaveBeenCalled()
    })

    it('should display the viewer container', () => {
        const { getByRole, queryByRole } = render(
            <FileViewer>
                <FileViewer.FileContent url="https://dd360-url-test.com" fileType="pdf" />
            </FileViewer>
        )

        expect(getByRole('viewer-file-container')).toBeDefined()
        fireEvent.click(getByRole('viewer-file-container'))
        expect(queryByRole('viewer-spinner')).toBeNull()
    })

    it('should display the spinner when url is empty', () => {
        const { getByRole, queryByRole } = render(
            <FileViewer>
                <FileViewer.FileContent fileType="pdf" />
            </FileViewer>
        )

        expect(queryByRole('viewer-file-container')).toBeNull()
        expect(getByRole('viewer-spinner')).toBeDefined()
    })

    it('should display the viewer file when file type is not an image', () => {
        const { getByRole, queryByRole } = render(
            <FileViewer>
                <FileViewer.FileContent url="https://dd360-url-test.com" fileType="pdf" />
            </FileViewer>
        )

        expect(queryByRole('viewer-image')).toBeNull()
        expect(getByRole('viewer-file')).toBeDefined()
    })

    it('should display the viewer image when file type is an image', () => {
        const { getByRole, queryByRole } = render(
            <FileViewer>
                <FileViewer.FileContent url="https://dd360-url-test.com" fileType="png" />
            </FileViewer>
        )

        expect(getByRole('viewer-image')).toBeDefined()
        expect(queryByRole('viewer-file')).toBeNull()
    })

    it('should have the iframe the right url', () => {
        const { getByRole } = render(
            <FileViewer>
                <FileViewer.FileContent url="https://dd360-url-test.com" fileType="pdf" />
            </FileViewer>
        )
        const fileViewer = getByRole('viewer-file') as HTMLIFrameElement
        const encodedUrl = encodeURIComponent('https://dd360-url-test.com')

        expect(fileViewer.src).toBe(`https://docs.google.com/gview?url=${encodedUrl}&embedded=true`)
    })
})
