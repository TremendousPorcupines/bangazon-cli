'use strict';

const sqlite3 = require('sqlite3').verbose();
const { generateCustomers } = require('../faker/customers');

let customers = generateCustomers();

const db = new sqlite3.Database('db/bangazon.sqlite', (err) => {
  console.log(`Populating ${customers.length} customers...`);
  customers.forEach((customer) => {
    db.run(`INSERT INTO customers VALUES(
      NULL,
      "${customer.first_name}",
      "${customer.last_name}",
      "${customer.address}",
      "${customer.city}",
      "${customer.zip_code}",
      "${customer.phone}",
      "${customer.date_created}",
      "${customer.last_login}")`
    );
  })
});
