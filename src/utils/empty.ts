export const empty = (val: string | number ): boolean => {
    const valString: string = val.toString()

    if (val == undefined || val == null) {
        return true
    }

    if (valString.trim().length == 0) {
        return true
    }

    return false
}

export const emptyArray = (arr: Array<object>): boolean => {
    if (arr.length > 0) return false
    return true
}

export const emptyObject = (obj: object): boolean => {
    if (Object.getOwnPropertyNames(obj).length > 0) return false
    return true
}