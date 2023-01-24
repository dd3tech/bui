export interface StyleObject {
    [key: string]: string | number | null | undefined | boolean
}

export function composeStyles(styleObjects: StyleObject[] | null): StyleObject {
    if (!styleObjects) return {}
    return styleObjects.reduce((acc, curr) => {
        const entries = Object.entries(curr).filter(([_key, value]) => value !== null && value !== undefined && typeof value !== 'boolean')
        const filteredObject = Object.fromEntries(entries)
        return { ...acc, ...filteredObject }
    }, {})
}
