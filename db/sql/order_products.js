'use strict';

const sqlite3 = require('sqlite3').verbose();
const { generateOrderProducts } = require('../faker/order_products');

generateOrderProducts()
.then((order_products) => {
  const db = new sqlite3.Database('db/bangazon.sqlite', (err) => {
    console.log(`Populating ${order_products.length} orders products...`);
    order_products.forEach((order_product) => {
      db.run(`INSERT INTO orders_products VALUES(
        NULL,
        "${order_product.order_id}",
        "${order_product.product_id}")`
      )
    })
  });
})