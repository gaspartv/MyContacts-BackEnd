export interface iClientREQ {
  name?: string;
  email?: string;
  password?: string;
  tel?: string;
}

export interface iClientRES {
  id?: string;
  name?: string;
  email?: string;
  tel?: string;
  registered_at?: Date;
}
