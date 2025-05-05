import { Flex } from 'components/Layout'
import { composeClasses } from 'lib/classes'

interface IBadge {
  value: number
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const variantClasses: Record<
  NonNullable<IBadge['variant']>,
  { badgeColor: string }
> = {
  default: {
    badgeColor: 'bg-blue-800'
  },
  success: {
    badgeColor: 'bg-green-500'
  },
  warning: {
    badgeColor: 'bg-yellow-400'
  },
  error: {
    badgeColor: 'bg-red-500'
  }
}

const Badge = ({ value, variant = 'default' }: IBadge) => {
  const { badgeColor } = variantClasses[variant]

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      className={composeClasses(
        'rounded-full text-xs font-medium px-1 text-white',
        badgeColor
      )}
      style={{ height: 24, width: 24, minWidth: 24, minHeight: 24 }}
    >
      {value}
    </Flex>
  )
}

export default Badge
