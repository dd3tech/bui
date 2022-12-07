import React, { forwardRef, LegacyRef } from 'react'

export interface KBDProps {
    kbds: Array<string>
    separator?: string
}

const Kbd = forwardRef<HTMLElement, KBDProps>((props: KBDProps, ref) => {
    const { kbds, separator } = props

    const isLastKbd = React.useCallback(
        (indexOfKey: number) => {
            return kbds.length - 1 === indexOfKey
        },
        [kbds]
    )

    return (
        <p className="text-gray-500 dark:text-gray-400" ref={ref as LegacyRef<HTMLParagraphElement>}>
            {kbds.map((text, index) => (
                <React.Fragment key={`${index}-text`}>
                    <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                        {text}
                    </kbd>{' '}
                    <span>{!isLastKbd(index) && separator} </span>
                </React.Fragment>
            ))}
        </p>
    )
})

Kbd.displayName = 'Kbd'
Kbd.defaultProps = {
    kbds: ['Ctrl', 'Shift', 'R'],
    separator: '+'
}

export default Kbd
