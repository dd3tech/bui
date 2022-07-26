import { useState } from 'react'
import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline'

export function HeaderAction({ title, filter, onClick }: { title: string; filter?: boolean; onClick?: () => any }) {
    const [isAsecendIcon, setIsAscendIcon] = useState(false)
    const handleClick = () => {
        setIsAscendIcon(!isAsecendIcon)
        onClick && onClick()
    }
    if (filter) {
        return (
            <th className="p-2 text-gray-500 bold text-sm select-none" onClick={handleClick}>
                <div className="flex justify-center items-center gap-2 cursor-pointer">
                    {title}
                    {isAsecendIcon ? <SortAscendingIcon className="text-gray-500 h-5 w-5" /> : <SortDescendingIcon className="text-gray-500 h-5 w-5" />}
                </div>
            </th>
        )
    }
    return <th className="p-2 text-gray-500 bold text-sm select-none">{title}</th>
}
