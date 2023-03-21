import { Response, Request, NextFunction } from "express";
import { AnySchema } from "yup";

const validateSchemaMiddleware =
  (serializer: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.body = validatedBody;
      return next();
    } catch (error: any) {
      return res.status(400).json({ message: error.errors });
    }
  };

export default validateSchemaMiddleware;
