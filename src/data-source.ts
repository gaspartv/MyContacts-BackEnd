import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/*.{js,ts}");
  const migrationPath: string = path.join(
    __dirname,
    "./database/migrations/*.{js,ts}"
  );

  const nodeEnv: string = process.env.NODE_ENV!;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      entities: [entitiesPath],
      migrations: [migrationPath],
    };
  }

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL!,
      entities: [entitiesPath],
      migrations: [migrationPath],
    };
  }

  return {
    type: "postgres",
    host: process.env.PGHOST!,
    port: parseInt(process.env.PGPORT!),
    username: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
    database: process.env.PGDATABASE!,
    logging: true,
    synchronize: false,
    entities: [entitiesPath],
    migrations: [migrationPath],
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export default AppDataSource;
