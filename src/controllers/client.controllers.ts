import { Request, Response } from "express";
import { iClientREQ, iClientRES } from "../interfaces/client.interfaces";
import createdClientService from "../services/client/createdClient.service";
import deleteClientService from "../services/client/deleteClient.service";
import editClientService from "../services/client/editClient.service";
import getClientService from "../services/client/getClient.service";

export const createdClientController = async (req: Request, res: Response) => {
  const clientData: iClientREQ = req.body;
  const data: iClientRES = await createdClientService(clientData);
  return res.status(201).json(data);
};

export const getClientController = async (req: Request, res: Response) => {
  const clientId: string = req.clientId;
  const data: iClientRES = await getClientService(clientId);
  return res.status(200).json(data);
};

export const editClientController = async (req: Request, res: Response) => {
  const userData: iClientREQ = req.body;
  const clientId: string = req.clientId;
  const data: iClientRES = await editClientService(userData, clientId);
  return res.json(data);
};

export const deleteClientController = async (req: Request, res: Response) => {
  const clientId: string = req.clientId;
  await deleteClientService(clientId);
  return res.status(200).json({});
};
