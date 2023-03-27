import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
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

  test("GET /contacts - Show all contacts.", async () => {
    const client = await request(app).post("/client").send(mockClientRequest);

    expect(client.status).toBe(201);

    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(clientLogin.status).toBe(200);
    expect(clientLogin.body).toHaveProperty("token");

    const contact1 = await request(app)
      .post("/contacts")
      .send(mockContactRequest)
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(contact1.status).toBe(201);

    const contact2 = await request(app)
      .post("/contacts")
      .send({
        name: "Test 2",
        email: "test2@mail.com",
        tel: "009988221166",
      })
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(contact2.status).toBe(201);

    const res = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  test("GET /client - Cannot view contacts without token.", async () => {
    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(clientLogin.status).toBe(200);
    expect(clientLogin.body).toHaveProperty("token");

    const res = await request(app).get("/contacts");

    expect(res.status).toBe(401);
    expect(res.body.message).toContain("Invalid token.");
  });
});
