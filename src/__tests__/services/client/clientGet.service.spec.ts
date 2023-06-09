import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import Client from "../../../entities/clients.entitie";
import { mockClientRequest } from "../../mocks/client.mock";

describe("/client", () => {
  let connection: DataSource;
  let baseUrl: string = "/client";
  let clientRepo: Repository<Client>;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        clientRepo = connection.getRepository(Client);
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /client - Show current client.", async () => {
    const client = await request(app).post(baseUrl).send(mockClientRequest);

    expect(client.status).toBe(201);

    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(clientLogin.status).toBe(200);
    expect(clientLogin.body).toHaveProperty("token");

    const res = await request(app)
      .get("/client")
      .set("Authorization", `Bearer ${clientLogin.body.token}`)

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("tel");
    expect(res.body).toHaveProperty("registered_at");
    expect(res.body).not.toHaveProperty("password");
    expect(typeof res.body.id).toBe("string");
  });

  test("GET /client - Cannot view client without token.", async () => {
    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(clientLogin.status).toBe(200);
    expect(clientLogin.body).toHaveProperty("token");

    const res = await request(app).get("/client");

    expect(res.status).toBe(401);
    expect(res.body.message).toContain("Invalid token.");
  });
});
