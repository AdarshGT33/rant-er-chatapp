import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_KEY, { expiresIn: maxAge })
}

export const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if( !email || !password ){
            return res.status(500).send("Email or Password is required")
        }

        const user = await User.create({email, password})
        res.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure:true,
            sameSite: 'None',
        })

        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup
            }
        })
    } catch (error) {
        console.log("Trouble signing up", error)
        return res.status(500).send("Internal Server Error")
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if( !email || !password ){
            return res.status(500).send("Email and Password is required")
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).send("User not found")
        }

        const verifyPassword = await bcrypt.compare(password, user.password) 

        if(!verifyPassword){
            return res.status(404).send("Password is incorrect")
        }

        res.cookie("token", createToken(email, user.id), {
            maxAge,
            secure:true,
            sameSite: 'None'
        })

        res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                firstname: user.firstName,
                lastname: user.lastName,
                color: user.color,
                profileSetup: user.profileSetup,
                image: user.image
            }
        })
    } catch (error) {
        console.log("Trouble loging-in", error)
        return res.status(500),send("Internal Server Error")
    }
}

export const getUserInfo = async (req, res, next) => {
    try {
        const userData = await User.findById(req.userId)

        if(!userData){
            return res.status(404).send("User ID not found")
        }

        res.status(201).json({
                id: userData.id,
                email: userData.email,
                firstname: userData.firstName,
                lastname: userData.lastName,
                color: userData.color,
                profileSetup: userData.profileSetup,
                image: userData.image
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}