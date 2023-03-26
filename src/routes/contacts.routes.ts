import { Router } from "express";
import {
  createdContactController,
  deleteContactController,
  editContactController,
  getContactsController,
} from "../controllers/contacts.controllers";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import verifyTokenExistsMiddleware from "../middlewares/verifyTokenExistis.middleware";
import contactsReqSchema from "../schemas/contacts/contactsReq.schema";

const contactsRoutes = Router();

contactsRoutes.post(
  "/",
  validateSchemaMiddleware(contactsReqSchema),
  verifyTokenExistsMiddleware,
  createdContactController
);

contactsRoutes.get("/", verifyTokenExistsMiddleware, getContactsController);

contactsRoutes.delete(
  "/:id",
  verifyTokenExistsMiddleware,
  deleteContactController
);

contactsRoutes.patch(
  "/:id",
  verifyTokenExistsMiddleware,
  editContactController
);

export default contactsRoutes;
