import request from "supertest";
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../../../data-source";
import { mockClientRequest } from "../../mocks/client.mock";
import Client from "../../../entities/clients.entitie";
import app from "../../../app";
import { hashSync } from "bcryptjs";

describe("/login", () => {
  let connection: DataSource;
  let baseUrl: string = "/login";
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

  beforeEach(async () => {
    const authors = await clientRepo.find();
    await clientRepo.remove(authors);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - Possible login with customer account.", async () => {
    const newClient = clientRepo.create({
      ...mockClientRequest,
      password: hashSync("12345678", 10),
    });
    await clientRepo.save(newClient);

    const res = await request(app).post(baseUrl).send({
      email: mockClientRequest.email,
      password: mockClientRequest.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /login - cannot log in with incorrect email or password.", async () => {
    const res = await request(app).post(baseUrl).send({
      email: "error@mail.com",
      password: "errorpassword",
    });

    expect(res.status).toBe(403);
    expect(res.body.message).toContain("Incorrect password or email.");
  });
});
