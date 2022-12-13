import { FC, forwardRef } from 'react'

interface ISwitchProps {
    toggle: boolean
    setToggle: any
    text?: string
    className?: string
}

const Switch: FC<ISwitchProps> = forwardRef<HTMLDivElement, ISwitchProps>(({ toggle, setToggle, text, ...props }, ref) => {
    const toggleClass = 'transform translate-x-8'

    const toggleStyle = 'transition-transform duration-500'

    const divSwitchStyle = 'transition duration-500'

    return (
        <>
            <div className="flex gap-3" {...props} ref={ref}>
                <div
                    data-testid="switch-toggle"
                    className={`md:w-16 md:h-8 w-12 h-6 flex items-center  rounded-full p-1 cursor-pointer ${divSwitchStyle} ${
                        toggle ? 'bg-blue-100' : 'bg-gray-300'
                    }`}
                    onClick={() => {
                        setToggle((prev: boolean) => !prev)
                    }}
                >
                    <div
                        className={
                            ` ${toggleStyle} ${toggle ? 'bg-blue-700' : 'bg-white'} md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform ` +
                            (toggle ? toggleClass : null)
                        }
                    ></div>
                </div>
                <div>
                    <label className="bold">{text}</label>
                </div>
            </div>
        </>
    )
})

export default Switch
