import { Router } from "express"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { createChannel } from "../controllers/ChannelController.js"

const channelRoutes = Router()

export default channelRoutes.post("/create-channel", verifyToken, createChannel)