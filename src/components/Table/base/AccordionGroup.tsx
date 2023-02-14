import React, { useState } from 'react'
import { composeClasses } from 'lib/classes'
import ChevronUpIcon from '@heroicons/react/outline/ChevronUpIcon'

interface AccordionGroupProps {
    children: React.ReactNode[]
    iconPosition?: number
}

const AccordionGroup = ({
    /**
     * Row list
     * The first child is the header
     */
    children,
    /**
     * The column number where the icon will be displayed
     * 0 is the position of the first column
     */
    iconPosition = 0
}: AccordionGroupProps) => {
    const [toggle, setToggle] = useState(false)

    const onClick = () => {
        setToggle(!toggle)
    }

    const content = [...children]
    const firstChild = content.shift() as React.ReactElement

    const modifiedCells = React.Children.map(firstChild.props.children, (cell, index) => {
        if (index === iconPosition) {
            return React.cloneElement(cell, {
                children: (
                    <div className="flex items-center">
                        {cell.props.children}
                        <ChevronUpIcon className={composeClasses('h-4 w-4 duration-300 ease-in ml-3', toggle ? '' : 'transform rotate-180')} />
                    </div>
                )
            })
        } else {
            return cell
        }
    })

    const header = React.cloneElement(firstChild as React.ReactElement, {
        onClick,
        style: { cursor: 'pointer', backgroundColor: '#F9FAFB' },
        children: modifiedCells
    })

    return (
        <>
            {header}
            {toggle && content}
        </>
    )
}

export default AccordionGroup
