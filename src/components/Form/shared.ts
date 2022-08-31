export const inputVariants: { [key: string]: { input: { borderColor: string }; text: { color: string } } } = {
    active: {
        input: {
            borderColor: 'border-black'
        },
        text: {
            color: 'text-black'
        }
    },
    focus: {
        input: {
            borderColor: 'border-blue-500'
        },
        text: {
            color: 'text-blue-500'
        }
    },
    success: {
        input: {
            borderColor: 'border-green-500'
        },
        text: {
            color: 'text-green-500'
        }
    },
    warning: {
        input: {
            borderColor: 'border-yellow-500'
        },
        text: {
            color: 'text-yellow-500'
        }
    },
    error: {
        input: {
            borderColor: 'border-red-500'
        },
        text: {
            color: 'text-red-500'
        }
    }
}

type InputClassNameOpts = {
    variant: string
    padding?: string
    rounded?: 'sm' | 'md' | 'full'
    border?: boolean
    startAdorment?: boolean
    endAdorment?: boolean
}

export function getInputClassName({ variant, rounded, padding = '2', border, startAdorment, endAdorment }: InputClassNameOpts) {
    const { input, text } = inputVariants[variant]

    return {
        input: `bg-white ${startAdorment ? 'pl-8' : ''} ${endAdorment ? 'pr-8' : ''} ${!border ? 'border-none' : ''} ${rounded ? `rounded-${rounded}` : ''} ${
            padding ? `p-${padding}` : ''
        } ${input.borderColor} mt-1 focus:border-blue-500 transition duration-500 ease-out focus:ease-in border-solid border font-medium w-full`,
        message: `text-xs mt-2 ml-2 font-medium ${text.color}`
    }
}

export function variantIs({ variant, error, success }: { variant: string; error?: boolean; success?: boolean }) {
    if (error) {
        return 'error'
    }

    if (success) {
        return 'success'
    }

    return variant
}
