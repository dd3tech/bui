import React from 'react'
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon, ViewGridIcon, ExclamationIcon, ClockIcon } from '@heroicons/react/outline'
import Text from '../Typography'
import Circle from '../Circle'

export interface SideBarProps {
    sideBarList?: Array<{ title: string; active: boolean; to: () => void }>
    sideBarName: string
    sideBarSubTitle?: React.ReactElement
    defaultExpand?: boolean
    dangerZone?: { show: boolean; text: string; callBack?: () => void }
    disabledOptions?: number[]
    disabledOptionsTag?: string
}

const SideBar = ({ sideBarList, sideBarName, sideBarSubTitle, defaultExpand, disabledOptions, disabledOptionsTag, ...props }: SideBarProps) => {
    const [expand, setExpand] = React.useState(false)
    const [timer, setTimer] = React.useState(false)

    const activeStyle = React.useCallback((activeLink: boolean) => {
        return {
            width: '6px',
            height: '64px',
            backgroundColor: `${activeLink ? '#1d4ed8' : 'transparent'}`,
            borderRadius: '0px 8px 8px 0px'
        }
    }, [])

    const shotTimer = () => {
        if (!expand) {
            setTimeout(() => {
                setTimer(true)
            }, 300)
        }

        setTimer(false)
    }

    React.useEffect(() => {
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
            role="container-sidebar"
            className={`shadow-lg border-t-0 ${expand ? 'w-96 h-full' : 'w-20 h-20'} border bg-white fixed transition-all delay-75 duration-200 ease-in z-40`}
        >
            {!expand && (
                <div
                    role="active-sidebar"
                    className="flex items-center justify-center h-full cursor-pointer"
                    onClick={() => {
                        setExpand(true)
                        shotTimer()
                    }}
                >
                    <ChevronDoubleRightIcon className="text-blue-700 hover:text-blue-800 transition-all duration-200 ease-in-out" width={30} />
                </div>
            )}

            {timer && expand && (
                <div className="transition-all delay-300 ease-out">
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
                            key={index.toString()}
                            className={`h-16 mb-2 transition-all duration-300 ease-out letter-spacing-negative flex items-center justify-start gap-6  ${
                                active ? ' bold' : ''
                            } ${disabledOptions?.includes(index) ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
                            onClick={() => {
                                !disabledOptions?.includes(index) && to()
                            }}
                        >
                            <div style={activeStyle(active)}></div>
                            <Text
                                role={`option-${index}`}
                                variant="h5"
                                textMuted500
                                style={{ color: `${disabledOptions?.includes(index) ? '#cdcdcd' : ''}` }}
                                className="flex justify-between w-full"
                            >
                                {title}
                                {disabledOptions?.includes(index) && (
                                    <span className="relative bottom-4 text-xs mr-10 flex items-center gap-1 italic" style={{ color: '#cdcdcd' }}>
                                        <ClockIcon width={15} />
                                        {disabledOptionsTag}
                                    </span>
                                )}
                            </Text>
                        </div>
                    ))}
                    {props.dangerZone?.show && (
                        <div
                            style={{ marginTop: '53px' }}
                            className="flex cursor-pointer group fixed bottom-0 border-t bg-gray-50 border-gray-300 w-96"
                            onClick={() => {
                                if (props.dangerZone?.callBack) {
                                    props.dangerZone?.callBack()
                                }
                            }}
                        >
                            <ExclamationIcon width={17.86} className="text-gray-600 ml-8 group-hover:text-red-600 mt-10 mb-10" />
                            <p className="text-gray-600 text-lg ml-4 mt-10 group-hover:text-red-600 mb-10">{props?.dangerZone?.text}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SideBar
