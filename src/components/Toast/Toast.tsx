import { toast } from 'react-toastify'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid'

const styleToast = { width: '436px', marginTop: '80px', marginRight: '300px' }

export const toastSuccess = (title: string, subTitle?: string, opt?: any) => {
    toast.success(
        <div>
            <div className="flex gap-3">
                <CheckCircleIcon width={16} className="text-green-500" /> <p className="text-green-600 bold">{title}</p>
            </div>
            {subTitle && <small className="text-green-500">{subTitle}</small>}
        </div>,
        {
            ...opt,
            style: styleToast
        }
    )
}

export const toastInfo = (title: string, subTitle?: string) => {
    toast.info(
        <div>
            <div className="flex gap-3">
                <ExclamationCircleIcon width={16} className="text-yellow-700" /> <p className="text-yellow-700 bold">{title}</p>
            </div>
            {subTitle && <small className="text-yellow-600">{subTitle}</small>}
        </div>,
        {
            style: styleToast
        }
    )
}

export const toastError = (title: string, subTitle?: string, opt?: any) => {
    toast.error(
        <div>
            <div className="flex gap-3">
                <ExclamationCircleIcon width={16} className="text-red-700" /> <p className="text-red-700 bold">{title}</p>
            </div>
            {subTitle && <small className="text-red-200">{subTitle}</small>}
        </div>,
        {
            ...opt,
            style: styleToast
        }
    )
}
