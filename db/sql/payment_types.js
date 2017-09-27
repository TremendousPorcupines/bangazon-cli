'use strict';

const sqlite3 = require('sqlite3').verbose();
const { generatePaymentTypes } = require('../faker/payment_types');

generatePaymentTypes()
.then((payment_types) => {
  const db = new sqlite3.Database('db/bangazon.sqlite', (err) => {
    console.log(`Populating ${payment_types.length} payment types...`);
    payment_types.forEach((type) => {
      db.run(`INSERT INTO payment_types VALUES(
        NULL,
        "${type.name}",
        "${type.account_number}",
        "${type.customer_id}")`
      )
    })
  });
})
