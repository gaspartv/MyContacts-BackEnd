import { hashSync } from "bcryptjs";
import { AppError } from "../../apperror";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entitie";
import { iClientREQ, iClientRES } from "../../interfaces/client.interfaces";
import clientResSchema from "../../schemas/client/clientRes.schemas";

const createdClientService = async (data: iClientREQ): Promise<iClientRES> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const clientFound = await clientRepo.findOne({
    where: { email: data.email },
  });

  if (clientFound) throw new AppError("E-mail already registered.");

  data.password = hashSync(data.password, 10);

  const client = clientRepo.create(data);
  
  await clientRepo.save(client);

  const clientWithoutPassword: iClientRES = await clientResSchema.validate(
    client,
    { stripUnknown: true }
  );

  return clientWithoutPassword;
};

export default createdClientService;
