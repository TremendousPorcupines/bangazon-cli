'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite', (err) => console.log('Connected'));

// array of table names in db
const tableNames = [
  'customers',
  'payment_types',
  'orders',
  'product_types',
  'products',
  'orders_products'
];

// function to drop tables if they exist to reset db
const dropAllTables = (tableArray) => {
  tableArray.forEach((table) => {
    db.run(`DROP TABLE IF EXISTS '${table}'`);
  });
};

// drops all tables
dropAllTables(tableNames);

// table creation

db.serialize(function() {
  // business side
  // create users table
  db.run('CREATE TABLE IF NOT EXISTS customers (user_id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, address TEXT, city TEXT, zip_code TEXT, phone TEXT, date_created TEXT, last_login TEXT)');

  // create payment_types table
  db.run('CREATE TABLE IF NOT EXISTS payment_types (payment_type_id INTEGER PRIMARY KEY, name TEXT, account_number TEXT, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(user_id))');

  // create orders table
  db.run('CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY, user_id INTEGER, payment_type_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(user_id), FOREIGN KEY (payment_type_id) REFERENCES payment_types(payment_type_id))');

  // create product_types table
  db.run('CREATE TABLE IF NOT EXISTS product_types (product_type_id INTEGER PRIMARY KEY, name TEXT)');

  // create products table
  db.run('CREATE TABLE IF NOT EXISTS products (product_id INTEGER PRIMARY KEY, name TEXT, price TEXT, user_id INTEGER, product_type_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(user_id), FOREIGN KEY (product_type_id) REFERENCES product_types(product_type_id))');

  // create orders_products table
  db.run('CREATE TABLE IF NOT EXISTS orders_products (order_product_id INTEGER PRIMARY KEY, order_id INTEGER, product_id INTEGER, FOREIGN KEY (order_id) REFERENCES orders(order_id), FOREIGN KEY (product_id) REFERENCES products(product_id))');

})