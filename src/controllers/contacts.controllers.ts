import { Request, Response } from "express";
import { iContactREQ, iContactRES } from "../interfaces/contacts.interfaces";
import createdContactService from "../services/contacts/createdContact.service";
import deleteContactService from "../services/contacts/deleteContact.service";
import editContactService from "../services/contacts/editContact.service";
import getContactsService from "../services/contacts/getContacts.service";

export const createdContactController = async (req: Request, res: Response) => {
  const contactData: iContactREQ = req.body;
  const clientId: string = req.clientId;
  const data: iContactRES = await createdContactService(contactData, clientId);
  return res.status(201).json(data);
};

export const getContactsController = async (req: Request, res: Response) => {
  const clientId: string = req.clientId;
  const data: iContactRES[] = await getContactsService(clientId);
  return res.json(data);
};

export const deleteContactController = async (req: Request, res: Response) => {
  const clientId: string = req.clientId;
  const contactId: string = req.params.id;
  await deleteContactService(contactId, clientId);
  return res.status(200).json({});
};

export const editContactController = async (req: Request, res: Response) => {
  const contactData: iContactREQ = req.body;
  const clientId: string = req.clientId;
  const contactId: string = req.params.id;
  const data: iContactRES = await editContactService(contactData, clientId, contactId);
  return res.json(data);
};
