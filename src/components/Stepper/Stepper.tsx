export const Stepper = ({ phase, totalPhases }: { phase: number; totalPhases: number }) => {
    const style = phase !== totalPhases ? { borderRightColor: '#1d4ed8', borderBottomColor: '#1d4ed8' } : { borderColor: '#1d4ed8' }

    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center">
                <div style={{ ...style, borderWidth: '5px' }} className="rounded-full h-16 w-16 border-gray-300 flex items-center justify-center">
                    <div className="text-center left-5 text-blue-700 bold text-xs">
                        {phase} / {totalPhases}
                    </div>
                </div>
            </div>
        </div>
    )
}
