# express-knex-template
Starter Code For Building a Node Project With Express, Knex, and Postgres

![](docs/img/fs-diagram.svg)

## Set Up

Fork this repo to create your own project.

#### Install Packages

* `npm i` to install `express`, `dotenv`, `knex`, and `pg`
* `npm i -D nodemon` for running the server with hot-reload

#### Set up your DB
* Create a PostgreSQL DB for your project.
* Make a copy of the `template.env` file called `.env` and add your postgres configuration data.

#### Create Migration Files
Run `npx knex migrate:make migration_name` to set up your database schema. See [Knex Migrations & Seeds](https://github.com/The-Marcy-Lab-School/Fall-2022-Curriculum-BMC/blob/main/se-unit-7/lesson-8-migrations-and-seeds/notes.md) for guidance. 

> The examples in this README use a table called `users` with `id` and `username` columns.

Run `npx knex migrate:latest` to run your schema.

#### Create Seed Files

Run `npx knex seed:make seed_name` to create a seed file.  See [Knex Migrations & Seeds](https://github.com/The-Marcy-Lab-School/Fall-2022-Curriculum-BMC/blob/main/se-unit-7/lesson-8-migrations-and-seeds/notes.md) for guidance.

Run `npx knex seed:run` to run your seed file.

#### Starting the server
* `npm start`

---

## Building the Project

### Create your DB model

In `src/db/models/`, create a new file for your model (or modify the template `model.js` file). It should define an interface for making SQL queries to your PostgreSQL database. Remember to `require('../knex')` and to use `try/catch` for each of your `knex.raw` calls.

Example:

```js
const knex = require('../knex');

class User {
  async findUserByUsername(username) {
    try {
      const result = await knex.raw(`
        SELECT * 
        FROM users
        WHERE username=?
      `, [username]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = User;
```

Test out your model's methods before moving on.

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

> 💡 Tip: We recommend starting your API's endpoints with `/api` as it differentiates it from the static front-end assets that your server will send to the client when they are navigating your client-side application.

In `src/middleware/add-models.js`, import your models. Then, modify the `addModels` middleware function to attach your models to each incoming `req` object. 


Example:

```js
const usersModel = require('../db/models/users');

const addModels = (req, res, next) => {
  req.Users = usersModel;
  next();
};

module.exports = addModels;
```

When your controllers are invoked, they will now have access to the models within the `req` object (ex: `req.Users` or `req.Todos`).

In `src/controllers/` create a new file for the controllers for your model. For each URL endpoint that your API will provide, define a method that:
* processes the incoming request
* interacts with the database model
* and sends back a response.

Example: 

```js
const findUserByUsername = async (req, res) => {
  const { Users, params: { username } } = req;
  const user = await Users.findUserByUsername(username);
  if (!user) res.status(404).send({ msg: 'User Not Found' });
  res.send(user);
};
```

In `src/routes.js`, import your controllers (either individually or using a barrel file). Then, define the URL endpoints that your API will provide and and assign the appropriate controller to each endpoint.

Example:

```js
const userControllers = require('./controllers/users');

const router = express.Router();
router.use(addModels);

router.get('/api/users/:username', userControllers.findUserByUsername);
```

Test out your endpoints in your browser or with Postman before moving on.

### Build Your Front-End

Based on your API endpoints, create a client-side application in the `public/` folder that provides a user-interface for interacting with your server.

Example:

Build an HTML form:

```html
<!-- public/index.html -->
<body>
  <form id="get-user-form">
    <label style='display:none' for="username-input">Username</label>
    <input type="text" name="username-input" id="username-input" placeholder="username">
    <input type="submit" value="Find User">
  </form>

  <p id="username-display"></p>
</body>
```

Use `fetch` calls like the one below:

```js
/* public/index.js */
const userForm = document.querySelector("#get-user-form");
const usernameInput = document.querySelector('#username-input');
const usernameDisplay = document.querySelector('#username-display');

const findUserByUsername = async (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const response = await fetch(`/api/users/${username}`);
  const data = await response.json();

  usernameDisplay.innerText = data.username || 'User Not Found';

  e.target.reset();
};

userForm.addEventListener('submit', findUserByUsername);
```

## Celebrate! 

![](docs/img/success.jpeg);