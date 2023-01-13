export function composeClasses(...classes: (string | undefined | null | boolean)[]) {
    return classes.filter(Boolean).join(' ').trim()
}
