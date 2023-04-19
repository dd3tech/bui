import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Portal({
  children,
  idRoot
}: {
  children: React.ReactNode | unknown | any
  idRoot?: string
}) {
  const [container] = useState(document.createElement('div'))
  const portalId = idRoot || 'portal-root'

  useEffect(() => {
    let portalRoot = document.getElementById(portalId)

    if (!portalRoot) {
      const newElement = document.createElement('div')
      newElement.id = portalId
      document.body.append(newElement)
      portalRoot = newElement
    }

    portalRoot?.appendChild(container)

    return () => {
      portalRoot?.removeChild(container)
    }
  }, [container])

  return createPortal(children, container)
}
