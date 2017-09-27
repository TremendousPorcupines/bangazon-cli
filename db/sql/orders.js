'use strict';

const sqlite3 = require('sqlite3').verbose();
const { generateOrders } = require('../faker/orders');

generateOrders()
.then((orders) => {
  const db = new sqlite3.Database('db/bangazon.sqlite', (err) => {
    console.log(`Populating ${orders.length} orders...`);
    orders.forEach((order) => {
      db.run(`INSERT INTO orders VALUES(
        NULL,
        "${order.user_id}",
        "${order.payment_type_id}")`
      )
    })
  });
})