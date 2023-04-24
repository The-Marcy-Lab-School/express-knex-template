# express-knex-template
Starter Code For Building a Node Project With Express, Knex, and Postgres

## Set Up

Fork this repo to create your own project.

![](docs/img/fs-diagram.svg)

#### Packages

* `npm i` to install `express`, `dotenv`, `knex`, and `pg`
* `npm i -D nodemon` for running the server with hot-reload

#### Set up your DB
* Create a PostgreSQL DB for your project
* Make a copy of the `template.env` file called `.env` and add your postgres configuration data.
* Run `npx knex migrate:make migration_name` to set up your database schema. See [Knex Migrations & Seeds](https://github.com/The-Marcy-Lab-School/Fall-2022-Curriculum-BMC/blob/main/se-unit-7/lesson-8-migrations-and-seeds/notes.md) for guidance.
  * Run `npx knex migrate:latest` to run your schema.
* Run `npx knex seed:make seed_name` to create a seed file. See [Knex Migrations & Seeds](https://github.com/The-Marcy-Lab-School/Fall-2022-Curriculum-BMC/blob/main/se-unit-7/lesson-8-migrations-and-seeds/notes.md) for guidance.
  * Run `npx knex seed:run` to run your seed file.

#### Starting the server
* `npm start`

---

## Building the Project

### Create your DB model

In `src/db/models/`, create a new file for your model. It should define an interface for making SQL queries to your PostgreSQL database.

In `src/middleware/add-models.js`, import your models and attach them to each incoming `req` object.

### Build your API

Before continuing on, design which URL endpoints your API will provide. 

```
GET /api/todos - returns all todos
GET /api/todos/:id - returns a single todo by id
GET /api/users/:username - returns a single user by username
POST /api/todos - creates a new todo
POST /api/users - creates a new user
etc...
```

In `src/controllers/` create a new file for each model. For each URL endpoint that your API will provide, define a method that processes the incoming request, interacts with the database model, and sends back a response.

In `src/routes.js`, import your controllers. Then, define the URL endpoints that your API will provide and and assign the appropriate controller to each endpoint.

### Build Your Front-End

Based on your API endpoints, create a client-side application in the `public/` folder that provides a user-interface for interacting with your server.

Use `fetch` calls like the one below:

```js
// Get a user
const username = 'bob123'
const response = await fetch(`/api/users/${username}`);
const userFound = await response.json();
```