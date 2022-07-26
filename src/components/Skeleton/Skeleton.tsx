type SkeletonProps = {
    className?: string
    style?: any
}

export const Skeleton = ({ className, style }: SkeletonProps) => {
    return (
        <div data-testid="skeleton" className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
            <div style={style} className={`${className ?? ''}`} />
        </div>
    )
}
