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
    variant?: 'main' | 'sub' | 'secundary'
}

const headerRowVariant: { [key: string]: string } = {
    main: `${fontSize.sm} h-12 text-gray-600`,
    sub: `${fontSize.xxs} h-10 text-gray-500`,
    secundary: `secundary ${fontSize.xs} h-8 bg-gray-50`
}

const HeaderRow = ({ variant = 'main', children }: HeaderRowProps) => {
    return <tr className={composeClasses(fontWeight.bold, headerRowVariant[variant])}>{children}</tr>
}

export default HeaderRow
