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

  test("PATCH /contacts - Can successfully edit the contacts.", async () => {
    const client = await request(app).post("/client").send(mockClientRequest);

    expect(client.status).toBe(201);

    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(clientLogin.status).toBe(200);
    expect(clientLogin.body).toHaveProperty("token");

    const contact = await request(app)
      .post("/contacts")
      .send(mockContactRequest)
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(contact.status).toBe(201);

    const clientEdit = await request(app)
      .patch(`/contacts/${contact.body.id}`)
      .set("Authorization", `Bearer ${clientLogin.body.token}`)
      .send({
        name: "Test Edit Contacts",
      });

    expect(clientEdit.status).toBe(200);
    expect(clientEdit.body).toHaveProperty("id");
    expect(clientEdit.body).toHaveProperty("name");
    expect(clientEdit.body).toHaveProperty("email");
    expect(clientEdit.body).toHaveProperty("tel");
    expect(clientEdit.body).toHaveProperty("registered_at");
    expect(clientEdit.body).not.toHaveProperty("password");
    expect(typeof clientEdit.body.id).toBe("string");
  });

  test("PATCH /contacts - Cannot edit contacts without token.", async () => {
    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(clientLogin.status).toBe(200);
    expect(clientLogin.body).toHaveProperty("token");

    const contact = await request(app)
      .post("/contacts")
      .send({
        name: "Test 2",
        email: "test2@mail.com",
        tel: "009988221166",
      })
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(contact.status).toBe(201);

    const clientEdit = await request(app)
      .patch(`/contacts/${contact.body.id}`)
      .send({
        name: "Test Edit Contacts",
      });

    expect(clientEdit.status).toBe(401);
    expect(clientEdit.body.message).toContain("Invalid token.");
  });
});
