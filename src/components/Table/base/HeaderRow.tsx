import { composeClasses } from 'lib/classes'
import { fontSize, fontWeight } from 'lib/font'

interface HeaderRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    /**
     *  Row content
     */
    children?: React.ReactNode
    /**
     * Row variants
     */
    variant?: 'primary' | 'secondary' | 'tertiary'
}

const headerRowVariant: { [key: string]: string } = {
    primary: `${fontSize.sm} h-12 text-gray-600`,
    secondary: `${fontSize.xxs} h-10 text-gray-500`,
    tertiary: `tertiary ${fontSize.xs} h-8 bg-gray-50`
}

const HeaderRow = ({ variant = 'primary', children, ...props }: HeaderRowProps) => {
    return (
        <tr {...props} className={composeClasses(props.className, fontWeight.bold, headerRowVariant[variant])}>
            {children}
        </tr>
    )
}

export default HeaderRow
