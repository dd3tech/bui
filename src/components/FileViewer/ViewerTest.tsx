import React from 'react'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import '@cyntler/react-doc-viewer/dist/index.css'

export const ViewerTest = () => {
  const docs = [
    {
      uri: 'https://eloquentjs-es.thedojo.mx/Eloquent_JavaScript.pdf'
    }
  ]
  return (
    <div>
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
    </div>
  )
}

ViewerTest.displayName = 'ViewerTest'

export default ViewerTest
