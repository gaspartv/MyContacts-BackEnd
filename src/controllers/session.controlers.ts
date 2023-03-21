import { Request, Response } from "express";
import { iClientRES } from "../interfaces/client.interfaces";
import { iLoginReq } from "../interfaces/login.interfaces";
import loginSerivce from "../services/session/login.service";

const loginController = async (req: Request, res: Response) => {
  const userData: iLoginReq = req.body;
  const {
    token,
    client,
  }: {
    token: string;
    client: iClientRES;
  } = await loginSerivce(userData);
  return res.json({ token, client });
};

export { loginController };
