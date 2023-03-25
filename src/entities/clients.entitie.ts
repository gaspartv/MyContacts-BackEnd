import { hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import Contacts from "./contacts.entitie";

@Entity("client")
class Client {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ length: 60, unique: true })
  tel: string;

  @CreateDateColumn()
  registered_at: Date;

  @OneToMany(() => Contacts, (contacts) => contacts.client_, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  contacts_: Contacts[];
}

export default Client;
