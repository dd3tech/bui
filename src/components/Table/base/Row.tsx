import { composeClasses } from 'lib/classes'
import { fontSize, fontWeight } from 'lib/font'

export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    /**
     *  Row content
     */
    children?: React.ReactNode
    /**
     *  Row variants
     */
    variant?: 'headerBody' | 'bottomResult' | 'none'
}

const rowVariant: { [key: string]: string } = {
    none: `${fontSize.xs} text-gray-600`,
    headerBody: `${fontSize.sm} ${fontWeight.bold} text-gray-900 bg-gray-100`,
    bottomResult: `${fontSize.xs} ${fontWeight.bold} text-gray-700 bg-gray-50`
}

const Row = ({ variant = 'none', ...props }: RowProps) => {
    return (
        <tr {...props} className={composeClasses('h-8 hover:bg-gray-50', fontWeight.medium, rowVariant[variant])}>
            {props.children}
        </tr>
    )
}

export default Row
