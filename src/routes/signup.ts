import { response, Router } from "express"
import users from "../db/schema/users"
import { getRandom, hashPassword } from "../utils/hash"

const signupRoute = Router()

const allowedChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_."

/**
 * A few rules to note:
 * Username must:
 * - Be within 5 and 15 characters.
 * - Not have spaces.
 * - Not be in the DB.
 * @param name 
 */
const validateUsername = async (username: string) => {
    let isValid: boolean = true
    let validUsername: string | undefined = undefined

    const passedUsername: string = username.trim()
    const usernameLength: number = passedUsername.length

    // Validate username length.
    if (usernameLength < 5 || usernameLength > 15) {
        isValid = false
        validUsername = "Username must be between 5 and 15 characters!"
    }

    // Check the username contents.
    if (isValid) {
        for (let i = 0; i < passedUsername.length; i++) {
            // If username character is not included in the allowed characters
            // Break and return
            if (!allowedChars.includes(username[i])) {
                isValid = false
                validUsername = "Invalid character in username!"
                break
            }
        }
    }

    // Check uniqueness in db.
    if (isValid) {
        const oneUsername = await users.findOne({username: passedUsername})
        if (oneUsername != null) {
            isValid = false
            validUsername = "Username exists."
        } else {
            // All has passed and the user is unique.
            validUsername = passedUsername
        }
    }

    return [isValid, validUsername]
}

const validateEmail = (email: string): [boolean, string] => {
    let emailIsOK: boolean = true
    let msg: string = ""
    const validMail = email.trim()

    if (!validMail.includes("@") || !validMail.includes(".com", validMail.length - 4)) {
        emailIsOK = false
        msg = "Invalid email!"
    } else {
        msg = validMail
    }

    return [emailIsOK, msg]
}

const validatePassword = (password: string): [boolean, string] => {
    let passwordOK: boolean = true
    let pass: string = password

    if (password.toString().length < 8 || password.toString().length > 20) {
        passwordOK = false
        pass = "Password must be within 8 and 20 characters"
    }

    return [passwordOK, pass]
}

signupRoute.post("/signup", async (req, res) => {
    const { username, email, password } = req.body
    const [ isValidUsername, returnedUsername ] = await validateUsername(username)
    const [ isValidEmail, returnedMail ] = validateEmail(email)
    const [ isValidPass, returnedPass ] = validatePassword(password)

    if (isValidUsername && isValidEmail && isValidPass) {
        const hashedPassword = hashPassword(returnedPass)
        const userId = getRandom()
        const [ username, email, password ] = [returnedUsername, returnedMail, hashedPassword]
        const newUser = await users.create({ userId, username, email, password })
        
        if (newUser != null) {
            req.session.userId = userId

            res.cookie("userId", userId, {
                maxAge: 60 * 60 * 24
            })

            res.status(201)
            res.send({
                success: true,
                msg: "Account created!"
            })
        } else {
            res.status(500)
            res.send({
                success: false,
                msg: "Server Error!"
            })
        }
    } else {
        res.status(500)
        res.send({
            success: false,
            msg: [
                returnedUsername,
                returnedMail,
                returnedPass
            ]
        })
    }
})

export default signupRoute