import { Router } from "express";
import {
  createdClientController,
  deleteClientController,
  editClientController,
  getClientController,
} from "../controllers/client.controllers";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import verifyTokenExistsMiddleware from "../middlewares/verifyTokenExistis.middleware";
import clientReqSchema from "../schemas/client/clientReq.schemas";

const clientRoutes = Router();

clientRoutes.post(
  "/",
  validateSchemaMiddleware(clientReqSchema),
  createdClientController
);

clientRoutes.get("/", verifyTokenExistsMiddleware, getClientController);

clientRoutes.patch("/", verifyTokenExistsMiddleware, editClientController);

clientRoutes.delete("/", verifyTokenExistsMiddleware, deleteClientController);

export default clientRoutes;
