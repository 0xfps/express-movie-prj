export const empty = (val: string | number ): boolean => {
    const valString: string = val.toString()

    if (val == undefined || val == null) {
        return false
    }

    if (valString.trim().length == 0) {
        return true
    }

    return false
}