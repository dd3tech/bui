import { ReactElement, useEffect, useState } from 'react'
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon, ViewGridIcon } from '@heroicons/react/outline'
import { Text, Circle } from '../index'
import { css } from '@emotion/css'

export const SideBar = ({
    sideBarList,
    sideBarName = 'Álvaro Obregón 182',
    sideBarSubTitle,
    defaultExpand
}: {
    sideBarList?: Array<{ title: string; active: boolean; to: () => void }>
    sideBarName?: string
    sideBarSubTitle?: ReactElement
    defaultExpand?: boolean
}) => {
    const [expand, setExpand] = useState(false)
    const [timer, setTimer] = useState(false)

    const activeStyle = (activeLink: boolean) => {
        return css`
            width: 6px;
            height: 64px;
            background: ${activeLink ? '#1d4ed8' : 'transparent'};
            border-radius: 0px 8px 8px 0px;
        `
    }

    const shotTimer = () => {
        if (!expand) {
            setTimeout(() => {
                setTimer(true)
            }, 300)
        }

        setTimer(false)
    }

    const widthSideBar = css`
        width: 4.5rem;
    `

    useEffect(() => {
        if (defaultExpand) {
            setExpand(true)
            shotTimer()
        }
        return () => {
            setExpand(false)
            shotTimer()
            defaultExpand = false
        }
    }, [defaultExpand])

    return (
        <div
            className={`shadow-lg border-t-0 ${
                expand ? 'w-96 h-full' : `${widthSideBar} h-20`
            } border bg-white fixed transition-all delay-75 duration-200 ease-in z-40`}
        >
            {!expand && (
                <div
                    className="flex items-center justify-center h-full cursor-pointer"
                    onClick={() => {
                        setExpand(true)
                        shotTimer()
                    }}
                >
                    <ChevronDoubleRightIcon className="text-blue-700 hover:text-blue-800 transition-all duration-200 ease-in-out" width={30} />
                </div>
            )}
            <div className={`${timer ? 'block' : 'hidden'}  transition-all delay-300 ease-out`}>
                <div className="grid grid-cols-3 justify-between border-b items-center w-full">
                    <div className="flex items-center gap-4 col-span-2 p-3 w-full h-24">
                        <Circle>
                            <ViewGridIcon className="text-blue-700" width={20} />
                        </Circle>
                        <Text variant="span" className="font-bold text-lg letter-spacing-negative capitalize">
                            {sideBarName}
                            {sideBarSubTitle}
                        </Text>
                    </div>
                    <div
                        className="w-full flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            setExpand(false)
                            shotTimer()
                        }}
                    >
                        <ChevronDoubleLeftIcon className="text-blue-700 hover:text-blue-800 transition-all duration-200 ease-in-out" width={25} />
                    </div>
                </div>

                {sideBarList?.map(({ title, active, to }, index: number) => (
                    <div
                        key={index}
                        className={`h-20 transition-all duration-300 ease-out hover:bg-gray-100 letter-spacing-negative flex items-center justify-start gap-6 cursor-pointer ${
                            active ? ' bold' : ''
                        }`}
                        onClick={() => to()}
                    >
                        <div className={activeStyle(active)}></div>
                        <Text variant="span" className="text-lg text-gray-500 ">
                            {title}
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    )
}
