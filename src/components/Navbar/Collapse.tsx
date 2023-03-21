import { ReactNode } from 'react'
import { Language } from './Language'

interface Props {
  children: ReactNode
}

export function Collapse({ children }: Props) {
  return (
    <div className="absolute mt-2 right-0 w-64 bg-white border shadow-lg z-20 py-1 rounded-xl">
      {children}
      <div className="p-2">
        <div className="text-sm rounded-lg h-8 flex items-center text-gray-700 hover:bg-gray-100">
          <Language isNavbar />
        </div>
      </div>
    </div>
  )
}
