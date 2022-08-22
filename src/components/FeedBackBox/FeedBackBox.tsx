import React from 'react'
import { Text } from '../Typography/Text'
import { Button } from '../Buttons/Button'
import { DynamicHeroIcon } from '../DynamicHeroIcon'

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    type: 'error' | 'success'
    title: string
    description?: string
    defaultIsClose?: boolean
    onClose?: () => void
    txtCloseBtn?: string
}

export function FeedBackBox({ type, title, description, defaultIsClose = false, onClose, txtCloseBtn, ...props }: IProps) {
    const [isClose, setIsClose] = React.useState<boolean>(defaultIsClose ?? false)

    const closeBox = React.useCallback(() => {
        setIsClose(true)
        if (onClose) {
            onClose()
        }
    }, [])

    const color = React.useCallback(() => {
        return type === 'error' ? 'red' : 'green'
    }, [type])

    if (isClose) {
        return <></>
    }

    return (
        <div className={`w-max border border-${color}-500 p-4 rounded-lg`} {...props}>
            <div className="flex mb-2">
                {type === 'error' ? (
                    <DynamicHeroIcon icon="ExclamationIcon" className="w-4 h-4 text-red-500 mr-2" />
                ) : (
                    <DynamicHeroIcon icon="CheckCircleIcon" className="w-4 h-4 text-green-500 mr-2" />
                )}
                <Text className={`text-xs text-${color}-500 font-bold`}>{title}.</Text>
                <Text className="ml-1 text-xs text-gray-600 font-semibold">{description}.</Text>
            </div>
            <div>
                <Button onClick={closeBox} variant="link" className="font-semibold flex items-center text-xs" padding={0}>
                    <Text className="mr-1">{txtCloseBtn}</Text>
                    <DynamicHeroIcon icon="XIcon" className="w-3 h-3 -mb-0.5" />
                </Button>
            </div>
        </div>
    )
}
