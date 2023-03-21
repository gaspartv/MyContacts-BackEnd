import { AppError } from "../../apperror";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entitie";
import { iClientRES } from "../../interfaces/client.interfaces";
import clientResSchema from "../../schemas/client/clientRes.schemas";

const getClientService = async (clientId: string): Promise<iClientRES> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const clientFound = await clientRepo.findOne({
    where: { id: clientId },
  });

  if (!clientFound) throw new AppError("Client not found.", 404);

  const clientWithoutPassword: iClientRES = await clientResSchema.validate(
    clientFound,
    { stripUnknown: true }
  );

  return clientWithoutPassword;
};

export default getClientService;
