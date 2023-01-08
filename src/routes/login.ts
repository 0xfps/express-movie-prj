import { response, Router } from "express"
import users from "../db/schema/users"
import { empty } from "../utils/empty"
import { getRandom, hashPassword, verifyPassword } from "../utils/hash"

const loginRoute = Router()


loginRoute.post("/login", async (req, res) => {
    const { username, password } = req.body

    if (!empty(username) && !empty(password)) {
        const findUser = await users.findOne({ username: username })

        if (findUser != null) {
            const usersHash = findUser.password
            if (verifyPassword(password.toString(), usersHash)) {
                req.session.userId = findUser.userId
                res.cookie("userId", findUser.userId, {
                    maxAge: 60 * 60 * 24
                })

                console.log(req.session)
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
    } else {
        res.status(300)
        res.send({
            success: false,
            msg: "Invalid credentials"
        })
    }
})

export default loginRoute