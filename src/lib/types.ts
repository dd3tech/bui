/* ---------------------------------- WIDTH --------------------------------- */

const twWidthValues = [
    'w-0',
    'w-px',
    'w-0.5',
    'w-1',
    'w-1.5',
    'w-2',
    'w-2.5',
    'w-3',
    'w-3.5',
    'w-4',
    'w-5',
    'w-6',
    'w-7',
    'w-8',
    'w-9',
    'w-10',
    'w-11',
    'w-12',
    'w-14',
    'w-16',
    'w-20',
    'w-24',
    'w-28',
    'w-32',
    'w-36',
    'w-40',
    'w-44',
    'w-48',
    'w-52',
    'w-56',
    'w-60',
    'w-64',
    'w-72',
    'w-80',
    'w-96',
    'w-auto',
    'w-1/2',
    'w-1/3',
    'w-2/3',
    'w-1/4',
    'w-2/4',
    'w-3/4',
    'w-1/5',
    'w-2/5',
    'w-3/5',
    'w-4/5',
    'w-1/6',
    'w-2/6',
    'w-3/6',
    'w-4/6',
    'w-5/6',
    'w-1/12',
    'w-2/12',
    'w-3/12',
    'w-4/12',
    'w-5/12',
    'w-6/12',
    'w-7/12',
    'w-8/12',
    'w-9/12',
    'w-10/12',
    'w-11/12',
    'w-full',
    'w-screen',
    'w-min',
    'w-max'
] as const
export type Width = typeof twWidthValues[number]

const twMaxWidthValues = [
    'max-w-0',
    'max-w-none',
    'max-w-xs',
    'max-w-sm',
    'max-w-md',
    'max-w-lg',
    'max-w-xl',
    'max-w-2xl',
    'max-w-3xl',
    'max-w-4xl',
    'max-w-5xl',
    'max-w-6xl',
    'max-w-7xl',
    'max-w-full',
    'max-w-min',
    'max-w-max',
    'max-w-prose',
    'max-w-screen-sm',
    'max-w-screen-md',
    'max-w-screen-lg',
    'max-w-screen-xl',
    'max-w-screen-2xl'
] as const
export type MaxWidth = typeof twMaxWidthValues[number]

/* ---------------------------------- HEIGTH --------------------------------- */

const twHeights = [
    'h-0',
    'h-px',
    'h-0.5',
    'h-1',
    'h-1.5',
    'h-2',
    'h-2.5',
    'h-3',
    'h-3.5',
    'h-4',
    'h-5',
    'h-6',
    'h-7',
    'h-8',
    'h-9',
    'h-10',
    'h-11',
    'h-12',
    'h-14',
    'h-16',
    'h-20',
    'h-24',
    'h-28',
    'h-32',
    'h-36',
    'h-40',
    'h-44',
    'h-48',
    'h-52',
    'h-56',
    'h-60',
    'h-64',
    'h-72',
    'h-80',
    'h-96',
    'h-auto',
    'h-1/2',
    'h-1/3',
    'h-2/3',
    'h-1/4',
    'h-2/4',
    'h-3/4',
    'h-1/5',
    'h-2/5',
    'h-3/5',
    'h-4/5',
    'h-1/6',
    'h-2/6',
    'h-3/6',
    'h-4/6',
    'h-5/6',
    'h-full',
    'h-screen'
] as const
export type Height = typeof twHeights[number]

/* --------------------------------- PADDING -------------------------------- */

const twPadding = [
    'p-0',
    'p-px',
    'p-0.5',
    'p-1',
    'p-1',
    'p-2',
    'p-2',
    'p-3',
    'p-3',
    'p-4',
    'p-5',
    'p-6',
    'p-7',
    'p-8',
    'p-9',
    'p-10',
    'p-11',
    'p-12',
    'p-14',
    'p-16',
    'p-20',
    'p-24',
    'p-28',
    'p-32',
    'p-36',
    'p-40',
    'p-44',
    'p-48',
    'p-52',
    'p-56',
    'p-60',
    'p-64',
    'p-72',
    'p-80',
    'p-96'
] as const

export type padding = typeof twPadding[number]

const twPaddingX = [
    'px-0',
    'px-px',
    'px-0.5',
    'px-1',
    'px-1',
    'px-2',
    'px-2',
    'px-3',
    'px-3',
    'px-4',
    'px-5',
    'px-6',
    'px-7',
    'px-8',
    'px-9',
    'px-10',
    'px-11',
    'px-12',
    'px-14',
    'px-16',
    'px-20',
    'px-24',
    'px-28',
    'px-32',
    'px-36',
    'px-40',
    'px-44',
    'px-48',
    'px-52',
    'px-56',
    'px-60',
    'px-64',
    'px-72',
    'px-80',
    'px-96'
] as const

export type paddingX = typeof twPaddingX[number]

const twPaddingY = [
    'py-0',
    'py-py',
    'py-0.5',
    'py-1',
    'py-1',
    'py-2',
    'py-2',
    'py-3',
    'py-3',
    'py-4',
    'py-5',
    'py-6',
    'py-7',
    'py-8',
    'py-9',
    'py-10',
    'py-11',
    'py-12',
    'py-14',
    'py-16',
    'py-20',
    'py-24',
    'py-28',
    'py-32',
    'py-36',
    'py-40',
    'py-44',
    'py-48',
    'py-52',
    'py-56',
    'py-60',
    'py-64',
    'py-72',
    'py-80',
    'py-96'
] as const

export type paddingY = typeof twPaddingY[number]

/* --------------------------------- MARGIN --------------------------------- */

const twMargin = [
    'm-0',
    'm-px',
    'm-0.5',
    'm-1',
    'm-1',
    'm-2',
    'm-2',
    'm-3',
    'm-3',
    'm-4',
    'm-5',
    'm-6',
    'm-7',
    'm-8',
    'm-9',
    'm-10',
    'm-11',
    'm-12',
    'm-14',
    'm-16',
    'm-20',
    'm-24',
    'm-28',
    'm-32',
    'm-36',
    'm-40',
    'm-44',
    'm-48',
    'm-52',
    'm-56',
    'm-60',
    'm-64',
    'm-72',
    'm-80',
    'm-96'
] as const

export type margin = typeof twMargin[number]

const twMarginX = [
    'mx-0',
    'mx-px',
    'mx-0.5',
    'mx-1',
    'mx-1',
    'mx-2',
    'mx-2',
    'mx-3',
    'mx-3',
    'mx-4',
    'mx-5',
    'mx-6',
    'mx-7',
    'mx-8',
    'mx-9',
    'mx-10',
    'mx-11',
    'mx-12',
    'mx-14',
    'mx-16',
    'mx-20',
    'mx-24',
    'mx-28',
    'mx-32',
    'mx-36',
    'mx-40',
    'mx-44',
    'mx-48',
    'mx-52',
    'mx-56',
    'mx-60',
    'mx-64',
    'mx-72',
    'mx-80',
    'mx-96'
] as const

export type marginX = typeof twMarginX[number]

const twMarginY = [
    'my-0',
    'my-px',
    'my-0.5',
    'my-1',
    'my-1',
    'my-2',
    'my-2',
    'my-3',
    'my-3',
    'my-4',
    'my-5',
    'my-6',
    'my-7',
    'my-8',
    'my-9',
    'my-10',
    'my-11',
    'my-12',
    'my-14',
    'my-16',
    'my-20',
    'my-24',
    'my-28',
    'my-32',
    'my-36',
    'my-40',
    'my-44',
    'my-48',
    'my-52',
    'my-56',
    'my-60',
    'my-64',
    'my-72',
    'my-80',
    'my-96'
] as const

export type marginY = typeof twMarginY[number]

const twTopMargins = [
    'mt-0',
    'mt-0.5',
    'mt-1',
    'mt-1.5',
    'mt-2',
    'mt-2.5',
    'mt-3',
    'mt-3.5',
    'mt-4',
    'mt-5',
    'mt-6',
    'mt-7',
    'mt-8',
    'mt-9',
    'mt-10',
    'mt-11',
    'mt-12',
    'mt-14',
    'mt-16',
    'mt-20',
    'mt-24',
    'mt-28',
    'mt-32',
    'mt-36',
    'mt-40',
    'mt-44',
    'mt-48',
    'mt-52',
    'mt-56',
    'mt-60',
    'mt-64',
    'mt-72',
    'mt-80',
    'mt-96',
    '-mt-0.5',
    '-mt-1',
    '-mt-1.5',
    '-mt-2',
    '-mt-2.5',
    '-mt-3',
    '-mt-3.5',
    '-mt-4',
    '-mt-5',
    '-mt-6',
    '-mt-7',
    '-mt-8',
    '-mt-9',
    '-mt-10',
    '-mt-11',
    '-mt-12',
    '-mt-14',
    '-mt-16',
    '-mt-20',
    '-mt-24',
    '-mt-28',
    '-mt-32',
    '-mt-36',
    '-mt-40',
    '-mt-44',
    '-mt-48',
    '-mt-52',
    '-mt-56',
    '-mt-60',
    '-mt-64',
    '-mt-72',
    '-mt-80',
    '-mt-96'
] as const

export type MarginTop = typeof twTopMargins[number]

/* --------------------------------- COLORS --------------------------------- */

const baseColorValues = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose'
] as const

export type Color = typeof baseColorValues[number]

const twJustifyContentValues = ['justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly'] as const

export type JustifyContent = typeof twJustifyContentValues[number]

const twAlignItemsValues = ['items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch'] as const

export type AlignItems = typeof twAlignItemsValues[number]

const twTextAlignmentValues = ['text-left', 'text-center', 'text-right', 'text-justify', 'text-start', 'text-end'] as const

export type TextAlignment = typeof twTextAlignmentValues[number]

const sizeValues = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export type Size = typeof sizeValues[number]

export type Importance = 'primary' | 'secondary'

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'outline'
    | 'link'
    | 'ghost'
    | 'cancel'
    | 'success'
    | 'outlineWhite'
    | 'outlineBlue'
    | 'disabled'
    | 'danger'
    | 'outlineWhiteRed'

export type HorizontalPosition = 'left' | 'right'

export type VerticalPosition = 'top' | 'bottom'
