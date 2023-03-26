import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Client from "../../../entities/clients.entitie";
import Contact from "../../../entities/contacts.entitie";
import { mockClientRequest } from "../../mocks/client.mock";
import { mockContactRequest } from "../../mocks/contact.mock";

describe("/contacts", () => {
  let connection: DataSource;
  let baseUrl: string = "/contacts";
  let contactRepo: Repository<Contact>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        contactRepo = connection.getRepository(Contact);
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("DELETE /contacts - Can successfully delete the client.", async () => {
    const client = await request(app).post("/client").send(mockClientRequest);

    expect(client.status).toBe(201);

    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(clientLogin.status).toBe(200);
    expect(clientLogin.body).toHaveProperty("token");

    const contact = await request(app)
      .post(baseUrl)
      .send(mockContactRequest)
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(contact.status).toBe(201);

    const contactDelete = await request(app)
      .delete(`/contacts/${contact.body.id}`)
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(contactDelete.status).toBe(200);
  });

  test("DELETE /contacts - Cannot delete client without token.", async () => {
    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(clientLogin.status).toBe(200);
    expect(clientLogin.body).toHaveProperty("token");

    const contact = await request(app)
      .post(baseUrl)
      .send(mockContactRequest)
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(contact.status).toBe(201);

    const res = await request(app).delete(`/contacts/${contact.body.id}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toContain("Invalid token.");
  });
});
