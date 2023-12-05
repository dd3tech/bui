import React, { useEffect, useState } from 'react'
import { composeClasses } from 'lib/classes'
import ChevronUpIcon from '@heroicons/react/outline/ChevronUpIcon'

export interface AccordionProps {
  /**
   * Row list
   * The first child is the header
   */
  children: React.ReactNode[]
  /**
   * The column number where the icon will be displayed
   * 0 is the position of the first column
   */
  iconPosition?: number
  /**
   * Indicates if the accordion is expanded default false
   */
  isExpanded?: boolean
  /**
   * The callback function that will be called whenever the accordion is expanded or collapsed
   */
  onClick?: () => void
}

const Accordion = ({
  children,
  iconPosition = 0,
  isExpanded = false,
  onClick: onClickFn
}: AccordionProps) => {
  const [toggle, setToggle] = useState(isExpanded)

  const onClick = () => {
    onClickFn?.()
    setToggle(!toggle)
  }

  useEffect(() => {
    setToggle(isExpanded)
  }, [isExpanded])

  const [firstChild, ...childs] = children as React.ReactElement[]

  const modifiedCells = React.Children.map(
    firstChild.props.children,
    (cell, index) => {
      if (index === iconPosition) {
        return React.cloneElement(cell, {
          children: (
            <div className="flex items-center">
              {cell.props.children}
              <ChevronUpIcon
                className={composeClasses(
                  'h-4 w-4 duration-300 ease-in ml-3',
                  !toggle && 'transform rotate-180'
                )}
              />
            </div>
          )
        })
      } else {
        return cell
      }
    }
  )

  const header = React.cloneElement(firstChild as React.ReactElement, {
    onClick,
    style: { cursor: 'pointer', backgroundColor: '#F9FAFB' },
    children: modifiedCells
  })

  return (
    <>
      {header}
      {toggle && childs}
    </>
  )
}

export default Accordion
