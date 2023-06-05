import { ReactElement } from 'react'
import Flex from '../Layout/Flex/Flex'
import Skeleton from '../Skeleton/Skeleton'
import Text from '../Typography'

export interface SideBarHeaderProps {
  isLoadingHeaderInfo?: boolean
  sideBarName: string
  sideBarSubTitle?: string | ReactElement
}

const SideBarHeader = ({
  isLoadingHeaderInfo,
  sideBarName,
  sideBarSubTitle
}: SideBarHeaderProps) => {
  return (
    <Flex
      justifyContent="center"
      gap="1"
      className="flex-col col-span-2 p-3 w-full"
    >
      {isLoadingHeaderInfo ? (
        <>
          <Skeleton rounded="full" className="h-4 w-32" />
          <Skeleton rounded="full" className="h-3 w-24" />
        </>
      ) : (
        <>
          <Text
            variant="span"
            size="base"
            bold
            className="block w-52 letter-spacing-negative capitalize"
          >
            {sideBarName}
          </Text>
          {sideBarSubTitle && (
            <Text
              variant="small"
              className="text-blue-600 whitespace-nowrap"
              style={{ fontSize: '10px' }}
            >
              {sideBarSubTitle}
            </Text>
          )}
        </>
      )}
    </Flex>
  )
}

export default SideBarHeader
