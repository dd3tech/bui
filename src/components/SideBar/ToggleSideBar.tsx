import { ChevronLeftIcon } from '@heroicons/react/outline'
import { SizeTypes } from 'hooks/useResize'
import { composeClasses } from 'lib/classes'
import Flex from '../Layout/Flex/Flex'

const ToggleSideBar = ({
  expand,
  setExpand,
  postiton,
  size
}: {
  expand: boolean
  setExpand: (expand: boolean) => void
  size: SizeTypes
  postiton: {
    top: number
    left: number
  }
}) => {
  const isHidden = (size?.width ?? 0) <= 1024
  console.log(postiton)

  return (
    <div
      role="active-sidebar"
      className={composeClasses(
        'fixed lg:absolute mx-2 border rounded-full bg-white text-primary cursor-pointer transition-all duration-300 ease-in-out',
        'focus:bg-primary focus:text-white',
        'hover:bg-blue-50',
        expand && 'absolute right-2'
      )}
      onClick={() => setExpand(!expand)}
      style={
        isHidden && !expand
          ? {
              top: postiton.top + 12,
              left: postiton.left
            }
          : undefined
      }
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        className={composeClasses(
          'w-9 h-9 transform transition-all duration-200 ease-in-out',
          expand ? 'rotate-0' : 'rotate-180'
        )}
      >
        <ChevronLeftIcon
          className="transition-all duration-200 ease-in-out"
          width={18}
        />
      </Flex>
    </div>
  )
}

export default ToggleSideBar
