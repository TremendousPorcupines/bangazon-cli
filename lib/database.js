const sqlite3 = require('sqlite3');
const path = require('path');
const { customers } = require('../data/customers');
let db;

(function createDb() {
  console.log("starting db chain");
  // http://stackoverflow.com/questions/27766734/dealing-with-relative-paths-with-node-js
  db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'), createTables);
}());

function createTables() {
  db.run(`DELETE FROM order_line_items`)
  .run(`DELETE FROM orders`)
  .run(`DELETE FROM products`)
  .run(`DELETE FROM customers`)
  .run(`DROP TABLE customers`)
  .run(`DROP TABLE products`)
  .run(`DROP TABLE orders`)
  .run(`DROP TABLE order_line_items`)
  db.run(
    `CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, city TEXT, street TEXT, state TEXT, zip TEXT, phone TEXT)`,
    insertRows
  ); 
  db.run(`CREATE TABLE IF NOT EXISTS payment_options (
    pay_opt_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    pay_opt_name TEXT, pay_opt_acct INTEGER)` 
    );
  db.run("CREATE TABLE IF NOT EXISTS products (product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name TEXT, product_price REAL)" );
  db.run("CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER, pay_opt_id INTEGER, paid_in_full INTEGER, FOREIGN KEY(customer_id) REFERENCES customers(customer_id), FOREIGN KEY(pay_opt_id) REFERENCES payment_options(pay_opt_id))" );
  db.run("CREATE TABLE IF NOT EXISTS order_line_items (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, product_id INTEGER, FOREIGN KEY(order_id) REFERENCES orders(order_id), FOREIGN KEY(product_id) REFERENCES products(product_id) )" );
}

function insertRows() {
  // Insert each of the customer objects into the database.
  customers.forEach( ({firstName, lastName, city, street, state, zip, phone}) => {
    db.run(`INSERT INTO customers VALUES (null, "${firstName}", "${lastName}", "${city}", "${street}", "${state}", "${zip}", "${phone}")`, () => {
      db.all(`SELECT customer_id, first_name FROM customers`, (err, data) => {
        // console.log("user", data));
      });
    });
  });
}
