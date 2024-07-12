/*
 * Copyright (c) DD360 and its affiliates.
 */

import { ReactNode } from 'react'
import Flex from '../Layout/Flex/Flex'
import Skeleton from '../Skeleton/Skeleton'
import Text from '../Typography'

export interface SideBarHeaderProps {
  /**
   * Header information loading indicator
   */
  isLoadingHeaderInfo?: boolean
  /**
   * Sidebar name displayed at the top
   */
  sideBarName: string
  /**
   * Sidebar subtitle displayed at the top
   */
  sideBarSubTitle?: ReactNode
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
              className="block w-52 letter-spacing-negative capitalize max-h-11 whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                maxWidth: 160
              }}
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
    </Flex>
  )
}

export default SideBarHeader
