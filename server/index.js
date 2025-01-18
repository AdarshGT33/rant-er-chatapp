import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/authRoute.js'
import contactRoutes from './routes/ContactRoute.js'
import setupSocket from './socket.js'
import messagesRoutes from './routes/MessagesRoutes.js'

dotenv.config()

const app = express()

app.use(
    cors({
        origin: process.env.ORIGIN,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    })
);

app.use("/uploads/profile", express.static("uploads/profile"))
app.use("/uploads/files", express.static("uploads/files"))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/messages', messagesRoutes)


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`)
})

setupSocket(server)

mongoose
.connect(process.env.MONGODB_URI)
.then(console.log(`yo Mr.White, MongoDB has been connected yo`))
.catch((error) => console.log('Error connecting to mongodb', error.message))