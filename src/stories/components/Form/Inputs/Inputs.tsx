interface InputInterface {
    label?: string
    type?: string
    name?: string
    placeholder?: string
    variant?: string
    required?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onClick?: (event: React.ChangeEvent<any>) => void
    className?: string
}

export const Input = ({ label, type, variant, placeholder, required, className, ...props }: InputInterface) => {
    switch (variant) {
        case 'float-label':
            return (
                <div className="relative form-floating">
                    <input type={type} className={`form-control ${className ?? ''}`} placeholder=" " required={required} {...props} />
                    <label className="inline-block">{label}</label>
                </div>
            )
        default:
            return (
                <div className="relative form-floating">
                    <input type={type} className={`form-control ${className ?? ''}`} placeholder={placeholder} required={required} {...props} />
                    <label>{label}</label>
                </div>
            )
    }
}
