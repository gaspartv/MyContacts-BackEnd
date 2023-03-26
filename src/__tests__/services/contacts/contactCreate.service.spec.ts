import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { mockClientRequest } from "../../mocks/client.mock";
import { mockContactRequest } from "../../mocks/contact.mock";

describe("/contacts", () => {
  let baseUrl: string = "/contacts";
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /contacts - Possible to create a new contact.", async () => {
    const client = await request(app).post("/client").send(mockClientRequest);
    expect(client.status).toBe(201);

    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    const contact = await request(app)
      .post(baseUrl)
      .send(mockContactRequest)
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(contact.status).toBe(201);
    expect(contact.body).toHaveProperty("id");
    expect(contact.body).toHaveProperty("name");
    expect(contact.body).toHaveProperty("email");
    expect(contact.body).toHaveProperty("tel");
    expect(contact.body).toHaveProperty("registered_at");
    expect(typeof contact.body.id).toBe("string");
  });

  test("POST /contacts - Cannot create with duplicate email or tel.", async () => {
    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    const contact = await request(app)
      .post(baseUrl)
      .send(mockContactRequest)
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(contact.status).toBe(400);
    expect(contact.body).toHaveProperty("message");
  });

  test("POST /contacts - Cannot create with body invalid.", async () => {
    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    const res = await request(app)
      .post(baseUrl)
      .send({
        name: "error",
        email: "error.email",
      })
      .set("Authorization", `Bearer ${clientLogin.body.token}`);

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("tel is a required field");
    expect(res.body.message).toContain("email must be a valid email");
  });
});
