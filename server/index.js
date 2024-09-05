import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express()

app.use(
    cors({
        origin: process.env.ORIGIN,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true
    })
);

app.use(cookieParser())
app.use(express.json())

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Mongodb is connected successfully!'))
.catch((error) => console.log('Error connecting to mongodb', error.message))




const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`)
})