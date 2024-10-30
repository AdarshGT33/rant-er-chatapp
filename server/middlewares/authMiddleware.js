import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(token) console.log('token mil gya...')
        if(!token) console.log("token nhi mila")
        if(!token) return res.status(401).send("Authentication Error")
    
        jwt.verify(token, process.env.JWT_KEY, async (error, payload) => {
            if(error) return res.status(403).send("Invalid Token")
    
            req.userId = payload.userId
            next()
        })
    } catch (error) {
        console.log("Token Verification Failed", error)
    }
}