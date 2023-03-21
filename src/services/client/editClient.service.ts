import { hashSync } from "bcryptjs";
import { AppError } from "../../apperror";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entitie";
import { iClientREQ, iClientRES } from "../../interfaces/client.interfaces";
import clientResSchema from "../../schemas/client/clientRes.schemas";

const editClientService = async (
  data: iClientREQ,
  clientId: string
): Promise<iClientRES> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const clientFound = await clientRepo.findOne({
    where: { id: clientId },
  });

  if (!clientFound) throw new AppError("Client not found.", 404);

  if (data.password) data.password = hashSync(data.password, 10);

  const clientEdit = clientRepo.create({ ...clientFound, ...data });

  await clientRepo.save(clientEdit);

  const clientWithoutPassword: iClientRES = await clientResSchema.validate(
    clientEdit,
    { stripUnknown: true }
  );

  return clientWithoutPassword;
};

export default editClientService;
