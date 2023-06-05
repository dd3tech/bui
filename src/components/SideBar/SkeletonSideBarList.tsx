import Skeleton from '../Skeleton/Skeleton'
import Flex from '../Layout/Flex/Flex'

export interface SkeletonSideBarListProps {
  childs: number
}

const SkeletonSideBarList = ({ childs }: SkeletonSideBarListProps) => {
  return (
    <>
      {Array.from(Array(childs).keys()).map((key) => (
        <Flex
          key={key}
          alignItems="center"
          justifyContent="start"
          gap="1"
          className="w-72 h-16"
        >
          <Flex alignItems="center" className="w-16">
            <Flex alignItems="center" className="w-6 h-6 ml-5">
              <Skeleton rounded="base" height={20} width={20} />
            </Flex>
          </Flex>
          <Skeleton rounded="full" className="h-3 w-24" />
        </Flex>
      ))}
    </>
  )
}

export default SkeletonSideBarList
