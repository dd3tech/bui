export interface ITopHeader {
    colSpan?: number
    children: React.ReactNode
}

export interface IHeader {
    title: string
    key: string
    className?: string
    withCurrencyFormat?: boolean
}
