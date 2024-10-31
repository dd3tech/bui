export type UnitCSS = `${number}${'px' | 'rem' | '%'}` | number

const twGlobalUnits = [
  '0' /* 0px */,
  'px' /* 1px */,
  '0.5' /* 0.125rem - 2px */,
  '1' /* 0.25rem - 4px */,
  '1.5' /* 0.375rem - 6px */,
  '2' /* 0.5rem - 8px */,
  '2.5' /* 0.625rem - 10px */,
  '3' /* 0.75rem - 12px */,
  '3.5' /* 0.875rem - 14px */,
  '4' /* 1rem - 16px */,
  '5' /* 1.25rem - 20px */,
  '6' /* 1.5rem - 24px */,
  '7' /* 1.75rem - 28px */,
  '8' /* 2rem - 32px */,
  '9' /* 2.25rem - 36px */,
  '10' /* 2.5rem - 40px */,
  '11' /* 2.75rem - 44px */,
  '12' /* 3rem - 48px */,
  '14' /* 3.5rem - 56px */,
  '16' /* 4rem - 64px */,
  '20' /* 5rem - 80px */,
  '24' /* 6rem - 96px */,
  '28' /* 7rem - 112px */,
  '32' /* 8rem - 128px */,
  '36' /* 9rem - 144px */,
  '40' /* 10rem - 160px */,
  '44' /* 11rem - 176px */,
  '48' /* 12rem - 192px */,
  '52' /* 13rem - 208px */,
  '56' /* 14rem - 224px */,
  '60' /* 15rem - 240px */,
  '64' /* 16rem - 256px */,
  '72' /* 18rem - 288px */,
  '80' /* 20rem - 320px */,
  '96' /* 24rem - 384px */
] as const

/* ---------------------------------- WIDTH --------------------------------- */

const twWidthValues = [
  ...twGlobalUnits,
  'auto',
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '2/4',
  '3/4',
  '1/5',
  '2/5',
  '3/5',
  '4/5',
  '1/6',
  '2/6',
  '3/6',
  '4/6',
  '5/6',
  '1/12',
  '2/12',
  '3/12',
  '4/12',
  '5/12',
  '6/12',
  '7/12',
  '8/12',
  '9/12',
  '10/12',
  '11/12',
  'full',
  'screen',
  'min',
  'max'
] as const
export type Width = typeof twWidthValues[number]

const twMaxWidthValues = [
  '0',
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  'full',
  'min',
  'max',
  'prose',
  'screen-sm',
  'screen-md',
  'screen-lg',
  'screen-xl',
  'screen-2xl'
] as const
export type MaxWidth = typeof twMaxWidthValues[number]

/* ---------------------------------- HEIGTH --------------------------------- */

const twHeights = [
  ...twGlobalUnits,
  'auto',
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '2/4',
  '3/4',
  '1/5',
  '2/5',
  '3/5',
  '4/5',
  '1/6',
  '2/6',
  '3/6',
  '4/6',
  '5/6',
  'full',
  'screen'
] as const
export type Height = typeof twHeights[number]

/* --------------------------------- PADDING -------------------------------- */

export type Padding = typeof twGlobalUnits[number]

/* --------------------------------- MARGIN --------------------------------- */

export type Margin = typeof twGlobalUnits[number]

/* --------------------------------- GAP --------------------------------- */

export type GapSuffix = 'gap' | 'gap-x' | 'gap-y'
export type GapWithSuffix = `${GapSuffix}-${typeof twGlobalUnits[number]}`
export type Gap = typeof twGlobalUnits[number]

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

/* --------------------------------- Borders -------------------------------- */

const roundedValues = [
  'none' /* 0px */,
  'sm' /* 0.125rem - 2px */,
  'base' /* 0.25rem - 4px */,
  'md' /* 0.375rem - 6px */,
  'lg' /* 0.5rem - 8px */,
  'xl' /* 0.75rem - 12px */,
  '2xl' /* 1rem - 16px */,
  '3xl' /* 1.5rem - 24px */,
  'full' /* 9999px */
] as const

export type Rounded = typeof roundedValues[number]

const borderValues = [
  '0' /* 0px */,
  '2' /* 2px */,
  '4' /* 4px */,
  '8' /* 8px */
] as const

export type Border = typeof borderValues[number]

/* --------------------------------- Shadow --------------------------------- */

const shadowValues = [
  'sm',
  'base',
  'md',
  'lg',
  'xl',
  '2xl',
  'inner',
  'none'
] as const

export type ShadowVariants = typeof shadowValues[number]

/* -------------------------------- Positions ------------------------------- */

export type HorizontalPosition = 'left' | 'right'

export type VerticalPosition = 'top' | 'bottom'

export const twJustifyContentValues = [
  'start',
  'end',
  'center',
  'between',
  'around',
  'evenly'
] as const

export type JustifyContent = typeof twJustifyContentValues[number]

export const twAlignItemsValues = [
  'start',
  'end',
  'center',
  'baseline',
  'stretch'
] as const

export type AlignItems = typeof twAlignItemsValues[number]

const twTextAlignmentValues = [
  'left',
  'center',
  'right',
  'justify',
  'start',
  'end'
] as const

export type TextAlignment = typeof twTextAlignmentValues[number]

const sizeValues = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl'
] as const

export type Size = typeof sizeValues[number]

const weightValues = ['light', 'normal', 'medium', 'semibold', 'bold'] as const

export type Weight = typeof weightValues[number]

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
  | 'muted'

export type PositionVariants = 'right' | 'left' | 'top' | 'bottom'
