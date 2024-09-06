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

mongoose
.connect(process.env.MONGODB_URI)
.then(console.log(`MongoDB connection is a success`))
.catch((error) => console.log('Error connecting to mongodb', error.message))

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`)
})