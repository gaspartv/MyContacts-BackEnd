import { AppError } from "../../apperror";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entitie";
import { iContactRES } from "../../interfaces/contacts.interfaces";

const getContactsService = async (clientId: string): Promise<iContactRES[]> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const clientFound = await clientRepo.findOne({
    where: { id: clientId },
    relations: { contacts_: true },
  });

  if (!clientFound) throw new AppError("Client not found.", 404);

  return clientFound.contacts_;
};

export default getContactsService;
