import { composeClasses } from 'lib/classes'

interface BodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    /**
     *  Body content
     */
    children?: React.ReactNode
}

const Body = (props: BodyProps) => {
    return (
        <tbody {...props} className={composeClasses(props.className, 'body text-xs')}>
            {props.children}
        </tbody>
    )
}

export default Body
