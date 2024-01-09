import * as TypeORM from "typeorm";

export const dataSource = new TypeORM.DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  dropSchema: false,
  cache: true,
  logging: "all",
  entities: ["build/**/entities/*.js"],
  logger: "advanced-console",
  subscribers: [],
  migrations: ["build/**/migrations/*.js"],
});
