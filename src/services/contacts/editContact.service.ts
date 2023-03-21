import { AppError } from "../../apperror";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entitie";
import Contact from "../../entities/contacts.entitie";
import { iContactREQ, iContactRES } from "../../interfaces/contacts.interfaces";
import contactsResSchema from "../../schemas/contacts/contactsRes.schema";

const editContactService = async (
  data: iContactREQ,
  clientId: string,
  contactId: string
): Promise<iContactRES> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const clientFound = await clientRepo.findOne({
    where: { id: clientId },
  });

  if (!clientFound) throw new AppError("Client not found.", 404);

  const contactRepo = AppDataSource.getRepository(Contact);

  const contactFound = await contactRepo.findOne({
    where: { id: contactId },
  });

  if (!contactFound) throw new AppError("Contact not found.", 404);

  const contactEdit = clientRepo.create({ ...contactFound, ...data });

  await contactRepo.save(contactEdit);

  const contactReturn: iContactRES = await contactsResSchema.validate(
    contactEdit,
    {
      stripUnknown: true,
    }
  );

  return contactReturn;
};

export default editContactService;
