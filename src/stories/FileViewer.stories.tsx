import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FileViewer } from '../components/FileViewer'

export default {
  title: 'Modals/FileViewer',
  component: FileViewer
} as ComponentMeta<typeof FileViewer>

const Template: ComponentStory<typeof FileViewer> = ({
  fileType,
  url,
  fileName,
  className
}: any) => (
  <FileViewer className={className}>
    <FileViewer.ViewerActions fileName={fileName}>
      <FileViewer.BtnAction
        icon="DownloadIcon"
        onClick={() => console.log('Download clicked')}
      />
      <FileViewer.BtnAction
        icon="TrashIcon"
        onClick={() => console.log('Delete clicked')}
      />
      <FileViewer.BtnAction
        icon="ArrowsExpandIcon"
        onClick={() => console.log('Reload clicked')}
      />
    </FileViewer.ViewerActions>
    <FileViewer.FileContent url={url} fileType={fileType} />
  </FileViewer>
)

export const FileViewerImage = Template.bind({})
FileViewerImage.args = {
  className: 'bg-gray-200',
  fileName: '4.%20Disposicion%206M-1674683560914.png',
  fileType: 'png',
  url: 'https://lendd3r-files.s3.amazonaws.com/4.%20Disposicion%206M-1674683560914.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQI4VCMBZRB2N5XPR%2F20230218%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230218T232132Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIAvQvEFJWnB8IRD9LxEoZZT7NKfgfYFnvdKmSIIharkTAiBU6javvzJMgBPM7xPUAWvLqSi5QJg5h8CTDHbo%2B6x69Sq4AwiA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDAxOTEwMzExMzMzMSIM9MDc16XDZJ3xImwnKowDHDjDfnF9LwVX9P8pO%2BLa%2BVVrsPAVa4gklYHD7VTNBlYwotcW7tLhjMldqwTp6gCaVB6pai7bRFW%2BFOo7jM6mB7zr3l8qZ%2BA6uFG4gtXQxVCrRDdb%2BJ9vK970uYo9RTPIZdE3SOjIkghtHvfgCHvkrxoNhqu%2BY1iMY9tfc23M%2ByHiwVEZGJZZR9HM7uuQJXBA7HPe0YwufcuNFKgE4WXklr6nSpA0amINwxxQpGqkeGQdfD1T%2BV8QNJ3vtojfyLaPyG1GniR0JNkbdstKkkaSXn1QvY4b3ro9EFJ3%2FkUmmjXkDHkusZi6JB0BCyvuEjM8EldEL%2FCpBLb0PpKQKNSOt0m%2FPKGVUqppeyq6aznFnOCVKc9QA9Is4yC0RagMHKfromm4fpCgWb99i8X8oSTD9VAhBCJ6RiPCaop5osei7LjD0A9Op2YOB3BhB6uHgqGWKr2gooQf2ylW9g%2FT4zI1aowHXE6kHw1%2BYSud1QFOMKEjCtjs3IJoOWV7cqPQip9HNA4oe7wRBJsY%2F3HKMPC6xZ8GOp4BwDqqjjm%2BrRpYDKhKMIm%2BabxzFI0ew3TCSHRshBZRjqttZD2BjXTJcuTEtHiKrjc1ykooVj%2BnuN6qrlNwL7v5d4TvWVT%2BYF3mJVQ7Wcfk7TvuFJ4cUGjiHKV5aDynlVVktoI469zIwjqs%2FpZ97cega%2BTpBjeD9C3SHfaO3yJwhcU%2BfmOmGTxKBDezbyih7vVo%2Fbap5xQRJ7ply75nE6Y%3D&X-Amz-Signature=890b3a6aa4e3ca714ee72ff716300f88cd0a0816b677bcad88a51ca4ab43455a&X-Amz-SignedHeaders=host'
}
export const FileViewerDocument = Template.bind({})
FileViewerDocument.args = {
  className: '',
  fileName: 'Eloquent_JavaScript.pdf',
  fileType: 'pdf',
  url: 'https://eloquentjs-es.thedojo.mx/Eloquent_JavaScript.pdf'
}
