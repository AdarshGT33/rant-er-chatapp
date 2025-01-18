import { Router } from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { getAllContacts, getAllLogedInUsers, searchContacts } from '../controllers/ContactController.js'

const contactRoutes = Router()

contactRoutes.post("/search", verifyToken, searchContacts)
contactRoutes.get("/get-all-contacts", verifyToken, getAllContacts)
contactRoutes.get("/get-all-logged-in-users", verifyToken, getAllLogedInUsers)

export default contactRoutes