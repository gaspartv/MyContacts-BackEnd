import { ILike } from "typeorm";
import { AppError } from "../../apperror";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entitie";
import { iLoginReq } from "../../interfaces/login.interfaces";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { iClientRES } from "../../interfaces/client.interfaces";
import clientResSchema from "../../schemas/client/clientRes.schemas";

const loginSerivce = async ({
  email,
  password,
}: iLoginReq): Promise<{
  token: string;
  client: iClientRES;
}> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const clientFound = await clientRepo.findOne({
    where: { email: ILike(email) },
  });

  if (!clientFound) throw new AppError("Incorrect password or email.", 403);

  const passwordMatch: boolean = await compare(password, clientFound.password);

  if (!passwordMatch) throw new AppError("Incorrect password or email.", 403);

  const token: string = sign(
    { type: clientFound.email },
    process.env.SECRET_KEY!,
    { subject: clientFound.id, expiresIn: "24h" }
  );

  const clientWithoutPassword: iClientRES = await clientResSchema.validate(
    clientFound,
    { stripUnknown: true }
  );

  return { token, client: clientWithoutPassword };
};

export default loginSerivce;
