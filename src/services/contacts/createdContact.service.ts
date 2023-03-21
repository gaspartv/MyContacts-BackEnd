import { AppError } from "../../apperror";
import AppDataSource from "../../data-source";
import Client from "../../entities/clients.entitie";
import Contact from "../../entities/contacts.entitie";
import { iContactREQ, iContactRES } from "../../interfaces/contacts.interfaces";
import contactsResSchema from "../../schemas/contacts/contactsRes.schema";

const createdContactService = async (
  data: iContactREQ,
  clientId: string
): Promise<iContactRES> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const clientFound = await clientRepo.findOne({
    where: { id: clientId },
    relations: { contacts_: true },
  });

  if (!clientFound) throw new AppError("Client not found.", 404);

  const contactExists = clientFound.contacts_.some(
    (el) => el.email === data.email
  );

  if (contactExists) throw new AppError("Contact already registered.");

  const contactRepo = AppDataSource.getRepository(Contact);

  const contact = contactRepo.create({
    ...data,
    client_: clientFound,
  });

  await contactRepo.save(contact);

  const contactReturn: iContactRES = await contactsResSchema.validate(contact, {
    stripUnknown: true,
  });

  return contactReturn;
};

export default createdContactService;
