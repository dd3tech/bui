import { composeClasses } from 'lib/classes'

type unit = `${number}${'px' | 'rem'}`

interface HeaderCellProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
    /**
     *  Cell content
     */
    children?: React.ReactNode
    /**
     * Set the left sticky distance of the cell
     */
    stickyLeft?: unit
    /**
     * Set the top sticky distance of the cell
     */
    stickyTop?: unit
    /**
     * Set the right sticky distance of the cell
     */
    stickyRight?: unit
    /**
     * Set the bottom sticky distance of the cell
     */
    stickyBottom?: unit
}

const HeaderCell = ({ stickyLeft, stickyTop, stickyRight, stickyBottom, ...props }: HeaderCellProps) => {
    return (
        <th
            {...props}
            className={composeClasses((stickyLeft || stickyTop || stickyRight || stickyBottom) && 'sticky', props.className)}
            style={{
                left: stickyLeft,
                top: stickyTop,
                right: stickyRight,
                bottom: stickyBottom,
                ...props.style
            }}
        >
            {props.children}
        </th>
    )
}

export default HeaderCell
