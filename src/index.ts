import "reflect-metadata";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { type Context } from "./context.type.js";
import { dataSource } from "./datasource.js";
import { seedDatabase } from "./seeders/seeder.js";
import { MovieResolver } from "./resolvers/movie.resolver.js";
import { AuthResolver } from "./resolvers/auth.resolver.js";
import context from "./context.js";

async function bootstrap() {
  await dataSource.initialize();
  await seedDatabase();

  const schema = await buildSchema({
    resolvers: [AuthResolver, MovieResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
  });

  const server = new ApolloServer<Context>({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: context
  });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap().catch(console.error);
