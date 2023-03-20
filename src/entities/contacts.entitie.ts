import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import Clients from "./clients.entitie";

@Entity("contact")
class Contact {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 60, unique: true })
  tel: string;

  @CreateDateColumn()
  registered_at: Date;

  @ManyToOne(() => Clients, (client) => client.contacts_)
  client_: Clients | null;
}

export default Contact;
