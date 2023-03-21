import { iClientRES } from "./client.interfaces";

export interface iContactREQ {
  name: string;
  email: string;
  tel: string;
}

export interface iContactRES {
  id?: string;
  name?: string;
  email?: string;
  tel?: string;
  registered_at?: Date;
  client_?: iClientRES;
}
