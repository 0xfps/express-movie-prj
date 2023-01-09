import { Router } from "express"
import users from "../db/schema/users"
import { empty } from "../utils/empty"
import { verifyPassword } from "../utils/hash"

const loginRoute = Router()


loginRoute.post("/login", async (req, res) => {
    const { username, password } = req.body

    if (empty(username) || empty(password)) {
        res.status(300)
        res.send({
            success: false,
            msg: "Invalid credentials"
        })
    }

    const findUser = await users.findOne({ username: username })

    if (findUser != null) {
        const usersHash: string = findUser.password

        if (verifyPassword(password.toString(), usersHash)) {
            req.session.userId = findUser.userId
            res.cookie("userId", findUser.userId, {
                maxAge: 60 * 60 * 24
            })

            res.status(200)
            res.send({
                success: true,
                msg: "Logged In!"
            })
        } else {
            res.status(500)
            res.send({
                success: false,
                msg: "Invalid password!"
            })
        }
    } else {
        res.status(400)
        res.send({
            success: false,
            msg: "Inexistent username!"
        })
    }
})

export default loginRoute