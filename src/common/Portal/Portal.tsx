import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Portal({ children, idRoot }: { children: any; idRoot?: string }) {
    const [container] = useState(document.createElement('div'))

    useEffect(() => {
        let portalRoot = idRoot ? document.getElementById(idRoot) : document.getElementById('portal-root')

        if (!portalRoot) {
            const newElement = document.createElement('div')
            newElement.id = 'portal-root'
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
