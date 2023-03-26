import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { mockClientRequest } from "../../mocks/client.mock";

describe("/client", () => {
  let baseUrl: string = "/client";
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

  test("POST /client - Possible to create a customer account.", async () => {
    const res = await request(app).post(baseUrl).send(mockClientRequest);

    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("tel");
    expect(res.body).toHaveProperty("registered_at");
    expect(res.body).not.toHaveProperty("password");
    expect(typeof res.body.id).toBe("string");
  });

  test("POST /client - Cannot create with duplicate email.", async () => {
    const clientTwo = await request(app).post(baseUrl).send(mockClientRequest);

    expect(clientTwo.status).toBe(400);
    expect(clientTwo.body).toHaveProperty("message");
  });

  test("POST /client - Cannot create with body invalid.", async () => {
    const res = await request(app).post(baseUrl).send({
      name: "error",
      email: "error.email",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("tel is a required field");
    expect(res.body.message).toContain("email must be a valid email");
    expect(res.body.message).toContain("password is a required field");
  });
});
