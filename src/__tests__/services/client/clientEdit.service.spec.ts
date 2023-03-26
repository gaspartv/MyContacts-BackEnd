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

  test("PATCH /client - Can successfully edit the client.", async () => {
    const client = await request(app).post(baseUrl).send(mockClientRequest);

    expect(client.status).toBe(201);

    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(clientLogin.status).toBe(200);
    expect(clientLogin.body).toHaveProperty("token");

    const clientEdit = await request(app)
      .patch(baseUrl)
      .set("Authorization", `Bearer ${clientLogin.body.token}`)
      .send({
        name: "Test Edit",
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

  test("PATCH /client - Cannot edit client without token.", async () => {
    const clientLogin = await request(app).post("/login").send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(clientLogin.status).toBe(200);
    expect(clientLogin.body).toHaveProperty("token");

    const res = await request(app).patch("/client").send({
      name: "Test Edit",
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toContain("Invalid token.");
  });
});
