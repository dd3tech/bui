import { useEffect, useState } from 'react'
// import PageNotFoundImg from '../../assets/404.svg'

interface IProps {
    toRedirect?: () => void
    subTitle?: string
    returnMessage?: string
    codeError?: number
}

const PageNotFound = ({ toRedirect, subTitle, returnMessage, codeError = 404 }: IProps) => {
    const [sg, setSg] = useState(10)

    useEffect(() => {
        const counter = setInterval(() => {
            setSg((seconds) => seconds - 1)
        }, 1000)

        const timer = setTimeout(() => {
            clearInterval(counter)
            toRedirect && toRedirect()
        }, 10000)

        return () => {
            clearTimeout(timer)
            clearInterval(counter)
        }
    }, [])

    return (
        <div className="flex items-center justify-center h-screen my-6">
            {/* <img className="lg:w-1/2" src={PageNotFoundImg} alt="Page not found" /> */}
            <div className="absolute text-center">
                <p className="font-black leading-none text-blue-600 notfound-title">{codeError}</p>
                <p className="font-bold text-3xl text-white">{subTitle}</p>
                <p className="font-bold text-white">
                    {returnMessage} {sg}
                </p>
            </div>
        </div>
    )
}

export default PageNotFound
