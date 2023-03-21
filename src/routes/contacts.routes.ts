import { Router } from "express";
import { createdContactController, deleteContactController, editContactController, getContactsController } from "../controllers/contacts.controllers";
import verifyTokenExistsMiddleware from "../middlewares/verifyTokenExistis.middleware";

const contactsRoutes = Router()

contactsRoutes.post("/", verifyTokenExistsMiddleware, createdContactController)

contactsRoutes.get("/", verifyTokenExistsMiddleware, getContactsController)

contactsRoutes.delete("/:id", verifyTokenExistsMiddleware, deleteContactController)

contactsRoutes.patch("/:id", verifyTokenExistsMiddleware, editContactController)

export default contactsRoutes
