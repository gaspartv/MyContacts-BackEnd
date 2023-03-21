import { AppError } from "../../apperror";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entitie";
import Contact from "../../entities/contacts.entitie";

const deleteContactService = async (
  contactId: string,
  clientId: string
): Promise<void> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const clientFound = await clientRepo.findOne({
    where: { id: clientId },
  });

  if (!clientFound) throw new AppError("Client not found.", 404);

  const contactRepo = AppDataSource.getRepository(Contact);

  const contactsFound = await contactRepo.findOne({
    where: { id: contactId },
  });

  if (!contactsFound) throw new AppError("Contact not found.", 404);

  await contactRepo.remove(contactsFound);

  return;
};

export default deleteContactService;
