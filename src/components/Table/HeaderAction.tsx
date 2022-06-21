import { useState } from 'react'
import { HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi'

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
                    {isAsecendIcon ? (
                        <HiOutlineSortAscending size={20} className="text-gray-500" />
                    ) : (
                        <HiOutlineSortDescending size={20} className="text-gray-500" />
                    )}
                </div>
            </th>
        )
    }
    return <th className="p-2 text-gray-500 bold text-sm select-none">{title}</th>
}
