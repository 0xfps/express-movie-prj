import bcryptjs from "bcryptjs"

export const hashPassword = (pass: string): string => {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(pass, salt)
    return hash
}

export const verifyPassword = (pass: string, hash: string): boolean => {
    const isMatch: boolean = bcryptjs.compareSync(pass, hash)
    return isMatch
}

export const getRandom = (): string => {
    var result = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var charactersLength = characters.length

    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
}