import { Router } from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { getAllContacts, searchContacts } from '../controllers/ContactController.js'

const contactRoutes = Router()

contactRoutes.post("/search", verifyToken, searchContacts)
contactRoutes.get("/get-all-contacts", verifyToken, getAllContacts)

export default contactRoutes