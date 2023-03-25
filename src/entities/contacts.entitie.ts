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

  @Column({ length: 60 })
  email: string;

  @Column({ length: 60 })
  tel: string;

  @CreateDateColumn()
  registered_at: Date;

  @ManyToOne(() => Clients, (client) => client.contacts_, {
    onDelete: "CASCADE",
  })
  client_: Clients | null;
}

export default Contact;
