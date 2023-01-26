import { TextAlignment, Size, ButtonVariant, Importance, HorizontalPosition, VerticalPosition } from './types'

export const TextAlignments: { [key: string]: TextAlignment } = {
    Left: 'text-left',
    Center: 'text-center',
    Right: 'text-right',
    Justify: 'text-justify',
    Start: 'text-start',
    End: 'text-end'
}

export const Sizes: { [key: string]: Size } = {
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl'
}

export const Importances: { [key: string]: Importance } = {
    Primary: 'primary',
    Secondary: 'secondary'
}

export const ButtonVariants: { [key: string]: ButtonVariant } = {
    Primary: 'primary',
    Secondary: 'secondary',
    Tertiary: 'tertiary',
    Outline: 'outline',
    Link: 'link',
    Ghost: 'ghost',
    Cancel: 'cancel',
    Success: 'success',
    OutlineWhite: 'outlineWhite',
    OutlineBlue: 'outlineBlue',
    Disabled: 'disabled',
    Danger: 'danger',
    OutlineWhitered: 'outlineWhiteRed'
}

export const HorizontalPositions: { [key: string]: HorizontalPosition } = {
    Left: 'left',
    Right: 'right'
}

export const VerticalPositions: { [key: string]: VerticalPosition } = {
    Top: 'top',
    Bottom: 'bottom'
}
