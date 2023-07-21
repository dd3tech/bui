/*
 * Copyright (c) DD360 and its affiliates.
*/

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
          className="h-8"
        >
          <Flex alignItems="center" justifyContent="start" className="w-12">
            <Flex
              alignItems="center"
              justifyContent="start"
              className="w-6 h-6 ml-2.5"
            >
              <Skeleton rounded="base" height={20} width={20} />
            </Flex>
          </Flex>
          <Skeleton rounded="full" className="h-4 w-full mr-3" />
        </Flex>
      ))}
    </>
  )
}

export default SkeletonSideBarList
