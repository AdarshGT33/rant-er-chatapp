import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt
    if(!token) return res.status(401).send("User not authenticated")

    jwt.verify('token', process.env.JWT_KEY, async (error, payload) => {
        if(error) return res.status(403).send("Invalid Token")

        req.userId = payload.userId
        next()
    })
}