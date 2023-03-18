import { StyleObject } from 'lib/styles'

export type InputType = 'text' | 'currency' | 'password' | 'email' | 'date' | 'year' | 'month' | 'number' | 'percentage' | 'file'

export type InputVariant = 'default' | 'active' | 'success' | 'warning' | 'error' | 'disabled'

interface IInputVariants {
    input: { borderColor: string; color?: string }
    text: { color: string }
    bgIcon?: { color: string }
}

export const inputVariants: { [key in InputVariant]: IInputVariants } = {
    default: {
        input: {
            borderColor: 'border-gray-300'
        },
        text: {
            color: 'text-gray-900'
        }
    },
    active: {
        input: {
            borderColor: 'border-blue-500'
        },
        text: {
            color: 'text-gray-500'
        }
    },
    success: {
        input: {
            borderColor: 'border-green-500'
        },
        text: {
            color: 'text-green-500'
        },
        bgIcon: {
            color: 'bg-green-50'
        }
    },
    warning: {
        input: {
            borderColor: 'border-yellow-500'
        },
        text: {
            color: 'text-yellow-500'
        },
        bgIcon: {
            color: 'bg-yellow-50'
        }
    },
    error: {
        input: {
            borderColor: 'border-red-600',
            color: ''
        },
        text: {
            color: 'text-red-600'
        },
        bgIcon: {
            color: 'bg-red-50'
        }
    },
    disabled: {
        input: {
            borderColor: 'border-gray-300'
        },
        text: {
            color: 'text-gray-500'
        }
    }
}

type InputClassNameOpts = {
    variant: InputVariant
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

/**
 * This function receives a `className` string and a `pseudoclass` string, and returns a string with the classes corresponding to the specified pseudoclass.
 * @param className A string with classes separated by spaces, for example: 'text-sm border disabled:bg-red-500 disabled:text-gray-300'
 * @param pseudoclass A string with the name of the pseudoclass to search for, for example: 'disabled'
 * @returns A string with the classes that contain the specified pseudoclass, without including the pseudoclass, separated by spaces, for example: 'bg-red-500 text-gray-300'
 */
export function getClassesByPseudoClass(className: string, pseudoclass: string): string {
    // Split each class in the className string into an array using the split method with the ' ' separator.
    const classes = className.split(' ')

    // Select only the classes that contain the specified pseudoclass, using the filter method and the includes method of strings.
    const selectedClasses = classes.filter((c) => c.includes(`${pseudoclass}`))

    // Transform each selected class into its corresponding class without the specified pseudoclass, using the map method and the replace method with a regular expression that searches for the pseudoclass and replaces it with an empty string.
    const transformedClasses = selectedClasses.map((c) => c.replace(`${pseudoclass}:`, ''))

    // Join the resulting classes into a single string using the join method with the ' ' separator.
    return transformedClasses.join(' ')
}

export const getAnimationLabel = (isLabelScalded: boolean): StyleObject => {
    return {
        top: isLabelScalded ? 0 : 10,
        fontSize: isLabelScalded ? 10 : 14,
        fontWeight: isLabelScalded ? 400 : 700,
        transformOrigin: 'left top',
        transform: 'translate(0, 5px) scale(1)',
        transition: 'all 300ms cubic-bezier(0.25, 0.8, 0.5, 1) 0s'
    }
}

export const getPaddingInput = (hasLabel: boolean): StyleObject => {
    return {
        paddingTop: hasLabel ? 15 : 10,
        paddingBottom: hasLabel ? 5 : 10
    }
}
