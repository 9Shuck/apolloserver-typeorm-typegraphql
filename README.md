# NODE APP

## Technologies

Apollo Server 4 - v4.10.0
Type-Graphql - v2.0.0-beta.4
TypeORM - v0.3.19

## Explanation

This is a nodejs backend built using version 20.10.7.


## Files

src/
<br>
*index.ts - Main file of the app.
*context.ts - Context of the main app.
*context.type.ts - Context type of the main app.
*datasource.ts - Main file of TypeORM.

seeders/
<br>
*seeder.ts - Seeds the DB in case it's empty.

entities/
<br>
*All models and relationships used by TypeORM and TypeGraphql.

helpers/
<br>
*Functions that help to get desired values for another functions.

migrations/
<br>
*In this folder should appear all migrations created by the user. The first one is already generated.

resolvers/
<br>
*All resolvers to make use of GraphQL.


## Run the app 

```bash
$ npm install
```

Open Docker to execute:

```bash
$ docker compose up -d
```

Run:

```bash
$ npm start
```

After this the app will be connected automatically to the DB, the tables will be generated in case they don't exist and the DB will be seed with some example data in case it's empty.

Open app at 'http://localhost:4000/'


## Migrations

Create migration:

```bash
$ typeorm migration:create ./src/migrations/Init
```

Run migration (replace .env variables with code and npm start):

```bash
$ typeorm migration:run -d ./build/datasource.js
```
