import React from 'react'

export interface KBDProps {
    kbds: Array<string>
    separator?: string
}

export function Kbd({ kbds, separator }: KBDProps) {
    const isLastKbd = React.useCallback(
        (indexOfKey: number) => {
            return kbds.length - 1 === indexOfKey
        },
        [kbds]
    )

    return (
        <p className="text-gray-500 dark:text-gray-400">
            {kbds.map((text, index) => (
                <React.Fragment key={`${index}-text`}>
                    <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                        {text}
                    </kbd>{' '}
                    <span> {!isLastKbd(index) && <>{separator ?? '+'}</>} </span>
                </React.Fragment>
            ))}
        </p>
    )
}
