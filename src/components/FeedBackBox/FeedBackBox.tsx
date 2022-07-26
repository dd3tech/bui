import { Text } from '../Typography/Text'
import { Button } from '../Buttons/Button'
import { ExclamationIcon, XIcon, CheckCircleIcon } from '@heroicons/react/outline'

interface IProps {
    type: 'error' | 'success'
    title: string
    description?: string
    onClose?: () => void
    textClose?: string
}

function FeedBackBox({ type, title, description, onClose, textClose }: IProps) {
    const color = type === 'error' ? 'red' : 'green'

    return (
        <div className={`max-w-lg border border-${color}-500 p-4 rounded-lg`}>
            <div className="flex mb-2">
                {type === 'error' ? <ExclamationIcon className="w-4 h-4 text-red-500 mr-2" /> : <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />}
                <Text className={`text-xs text-${color}-500 font-bold`}>{title}.</Text>
                <Text className="ml-1 text-xs text-gray-600 font-semibold">{description}.</Text>
            </div>
            <div>
                <Button onClick={onClose} variant="link" className="font-semibold flex items-center text-xs" padding={0}>
                    <Text className="mr-1">{textClose}</Text>
                    <XIcon className="w-3 h-3 -mb-0.5" />
                </Button>
            </div>
        </div>
    )
}

export default FeedBackBox
