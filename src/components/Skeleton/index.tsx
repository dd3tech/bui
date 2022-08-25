export const Skeleton = ({ className, style }: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div data-testid="skeleton" className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
            <div style={style} className={`${className ?? ''}`} />
        </div>
    )
}
