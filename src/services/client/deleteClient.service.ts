import { AppError } from "../../apperror";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entitie";

const deleteClientService = async (clientId: string): Promise<void> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const clientFound = await clientRepo.findOne({
    where: { id: clientId },
  });

  if (!clientFound) throw new AppError("Client not found.", 404);

  await clientRepo.remove(clientFound);

  return;
};

export default deleteClientService;
