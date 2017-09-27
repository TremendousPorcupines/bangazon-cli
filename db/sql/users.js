'use strict';

const sqlite3 = require('sqlite3').verbose();
const { generateUsers } = require('../faker/users');

let users = generateUsers();

const db = new sqlite3.Database('db/bangazon.sqlite', (err) => {
  console.log(`Populating ${users.length} users...`);
  users.forEach((user) => {
    db.run(`INSERT INTO users VALUES(
      NULL,
      "${user.first_name}",
      "${user.last_name}",
      "${user.address}",
      "${user.city}",
      "${user.zip_code}",
      "${user.phone}",
      "${user.date_created}",
      "${user.last_login}")`
    );
  })
});
