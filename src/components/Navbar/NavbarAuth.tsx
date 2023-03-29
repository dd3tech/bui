import React from 'react'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  CogIcon,
  BellIcon
} from '@heroicons/react/outline'
import Wrapper from '../Wrapper/Wrapper'
import { Anchor } from '../Navigation'
import Text from '../Typography'
import Circle from '../Circle'
import Button from '../Buttons/Button'

interface ILink {
  name: string
  link: string
  active?: string
}

interface IProps {
  LinkComponent?: React.ComponentType<any>
  logo?: string | any
  avatarUrl?: string
  logoWidth?: number
  logoHeight?: number
  userName?: string
  nickname?: string
  bgColor?: string
  callToActionName?: string
  callToAction?: () => void
  links: ILink[]
  Collapse?: React.ReactNode
}

export const NavbarAuth = ({
  LinkComponent,
  logo,
  logoHeight,
  logoWidth,
  avatarUrl,
  userName,
  nickname,
  bgColor = 'white',
  callToAction,
  callToActionName,
  links,
  Collapse
}: IProps) => {
  const [isShowCollapse, setIsShowCollapse] = React.useState(false)
  return (
    <nav
      className="sticky shadow-sm border-b-2"
      style={{ backgroundColor: bgColor }}
    >
      <Wrapper
        className="flex items-center justify-between"
        paddingY="6"
        maxWidth="full"
      >
        <div className="flex gap-16 items-center">
          <Anchor LinkComponent={LinkComponent} to="/">
            <figure className="block">
              <img
                width={logoWidth}
                height={logoHeight}
                src={logo}
                alt="Lendd3r"
              />
            </figure>
          </Anchor>
          <div className="flex gap-14">
            {links.map(({ name, link, active }, index) => (
              <div key={index}>
                <Anchor
                  LinkComponent={LinkComponent}
                  to={link}
                  className={active ? 'font-bold' : 'text-base'}
                >
                  {name}
                </Anchor>
                {active && (
                  <div className="w-16 bottom-0 absolute border-b-2 border-primary h-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
          {callToAction && (
            <div className="ml-5 mr-10 flex items-center">
              <Button
                variant="secondary"
                className="w-36 text-sm rounded-lg"
                onClick={callToAction}
              >
                {callToActionName}
              </Button>
            </div>
          )}
          <Circle
            backgroundColor="transparent"
            className="mr-7"
            border="1px solid #D1D5DB"
          >
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-black focus:outline-none"
            >
              <CogIcon className="w-6 h-6 text-primary" />
            </button>
          </Circle>
          <Circle
            backgroundColor="transparent"
            className="mr-7"
            border="1px solid #D1D5DB"
          >
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-black focus:outline-none"
            >
              <BellIcon className="w-6 h-6 text-primary" />
            </button>
          </Circle>
          <div className="relative">
            <button
              className="flex items-center"
              onClick={() => setIsShowCollapse(!isShowCollapse)}
            >
              <figure className="bg-gray-800 flex text-sm rounded-full w-12 h-12 overflow-hidden">
                <img
                  className="rounded-full w-full object-cover"
                  width={40}
                  height={40}
                  src={avatarUrl ?? ''}
                  alt={userName}
                />
              </figure>
              <Text className="p-2 flex items-center gap-2 text-xs">
                {nickname}{' '}
                {isShowCollapse ? (
                  <ChevronDownIcon className="w-3 h-3" />
                ) : (
                  <ChevronUpIcon className="w-3 h-3" />
                )}{' '}
              </Text>
            </button>
            {isShowCollapse && Collapse}
          </div>
        </div>
      </Wrapper>
    </nav>
  )
}
