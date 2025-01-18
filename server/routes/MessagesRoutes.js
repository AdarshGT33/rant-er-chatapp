import {Router} from "express"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { getMessages, uploadFiles } from "../controllers/MessagesController.js"
import multer from "multer"

const messagesRoutes = Router()
const upload = multer({dest: "uploads/files"})

messagesRoutes.post("/get-messages", verifyToken , getMessages)
messagesRoutes.post("/upload-files", verifyToken, upload.single("file"), uploadFiles)

export default messagesRoutes;