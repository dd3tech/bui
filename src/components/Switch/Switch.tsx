import { FC, forwardRef } from 'react'
import { composeClasses } from 'lib/classes'

export interface ISwitchProps {
    toggle: boolean
    setToggle: any
    text?: string
    className?: string
}

const Switch: FC<ISwitchProps> = forwardRef<HTMLDivElement, ISwitchProps>(({ toggle, setToggle, text, ...props }, ref) => {
    return (
        <>
            <div className="flex gap-3" {...props} ref={ref}>
                <div
                    data-testid="switch-toggle"
                    className={composeClasses(
                        'w-12 h-6 flex items-center  rounded-full p-1 cursor-pointer transition duration-500',
                        'md:w-16 md:h-8',
                        toggle ? 'bg-blue-100' : 'bg-gray-300'
                    )}
                    onClick={() => {
                        setToggle((prev: boolean) => !prev)
                    }}
                >
                    <div
                        className={composeClasses(
                            'h-5 w-5 rounded-full shadow-md transform transition-transform duration-500',
                            'md:w-6 md:h-6',
                            toggle && 'transform translate-x-8',
                            toggle ? 'bg-blue-700' : 'bg-white'
                        )}
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
