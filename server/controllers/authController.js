import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_TOKEN, { expiresIn: maxAge })
}

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if( !email || !password ){
            return res.status('500').send("Email or Password is required")
        }

        const user = await User.create({email, password})
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure:true,
            sameSite: 'None',
        })

        return res.status('201').json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup
            }
        })
    } catch (error) {
        console.log("Trouble signing up", error)
        return res.status('500').send("Internal Server Error")
    }
}