'use strict';

const sqlite3 = require('sqlite3').verbose();
const { generateProductTypes } = require('../faker/product_types');

let product_types = generateProductTypes();

const db = new sqlite3.Database('db/bangazon.sqlite', (err) => {
  console.log(`Populating ${product_types.length} product types...`);
  product_types.forEach((type) => {
    db.run(`INSERT INTO product_types VALUES(
      NULL,
      "${type.name}")`
    )
  })
});
