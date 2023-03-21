import { Router } from "express";
import { loginController } from "../controllers/session.controlers";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import loginCheckFieldShema from "../schemas/session/login.schema";

const sessionRoutes = Router();

sessionRoutes.post(
  "/",
  validateSchemaMiddleware(loginCheckFieldShema),
  loginController
);

export default sessionRoutes;
