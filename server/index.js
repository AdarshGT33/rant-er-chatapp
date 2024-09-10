import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/authRoute.js'

dotenv.config()

const app = express()

app.use(
    cors({
        origin: process.env.ORIGIN,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    })
);

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`)
})

mongoose
.connect(process.env.MONGODB_URI)
.then(console.log(`yo Mr.White, MongoDB has been connected yo`))
.catch((error) => console.log('Error connecting to mongodb', error.message))