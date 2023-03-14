import { composeClasses } from 'lib/classes'
import { AlignItems, Gap } from '../../../interfaces/types'
import { NavbarContentActiveColor, NavbarContentVariants } from '../NavbarContent'
import { NavbarContentProvider } from '../NavbarContentContext'
import { useNavbarCollapseContext } from './NavbarCollapseContext'
import { XIcon } from '@heroicons/react/outline'
import Text from 'components/Typography/Text'

export interface NavbarCollapseContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    title: string
    activeColor?: NavbarContentActiveColor
    variant?: NavbarContentVariants
    gap?: Gap
    align?: AlignItems
}

const NavbarCollapseContent = ({
    title,
    children,
    variant = 'default',
    activeColor = 'primary',
    align = 'center',
    gap = '0',
    ...props
}: NavbarCollapseContentProps) => {
    const collapseContext = useNavbarCollapseContext()

    return (
        <NavbarContentProvider value={{ activeColor, variant }}>
            <div
                {...props}
                className={composeClasses(
                    'w-full h-screen fixed top-0 left-0 px-7 py-2 flex flex-col bg-white transition-transform transform z-50',
                    collapseContext.isCollapsed ? 'translate-x-0' : '-translate-x-full',
                    `items-${align}`,
                    `gap-${gap}`
                )}
            >
                <div className="relative w-full h-16 flex justify-center items-center">
                    <button
                        role="close"
                        className="absolute left-0 w-8 h-8 flex justify-center items-center"
                        onClick={() => collapseContext?.setIsCollapsed((prev) => !prev)}
                    >
                        <XIcon className="w-5 h-5 text-blue-700" viewBox="4 4 16 16" />
                    </button>
                    <Text size="2xl" bold>
                        {title}
                    </Text>
                </div>
                {children}
            </div>
        </NavbarContentProvider>
    )
}

export default NavbarCollapseContent
