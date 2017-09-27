'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

const Order = {
  // method for getting one order
  getOne: (order_id) => {
    return new Promise( (resolve, reject) => {
      db.get(`SELECT * FROM orders WHERE order_id = ${order_id}`, (err, order) => {
        if (err) return reject(err);
        resolve(order);
      });
    });
  },
  // method for getting all orders
  getAll: () => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM orders`, (err, orders) => {
        if(err) return reject(err);
        resolve(orders);
      });
    });
  },
  // method for adding an order
  // accepts a req.body as oder param:
  // {
  //   "product_id": INT,
  //   "user_id": INT
  // }
  addOne: (order) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO orders VALUES(null, "${order.user_id}", null)`, function (err) {
        if(err) return reject(err);
        resolve(this.lastID);
      });
    })
  },
  // method for adding line item to orders_products join table
  addToOpenOrder: (order_id, product_id) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO orders_products values (null, ${order_id}, ${product_id})`, function(err) {
        if (err) return reject(err);
        resolve(this.lastID);
      });
    });
  },
  // check if a user already has an open order
  isOpenOrder: (user_id) => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM orders WHERE user_id = ${user_id} AND payment_type_id is NULL`, (err, order) => {
        if (err) return reject(err);
        resolve(order.length ? order[0] : null);
      });
    });
  },
  // method for updating a order's info
  edit: (order) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE orders SET
        user_id = "${order.user_id}",
        payment_type_id = "${order.payment_type_id}"
        WHERE order_id = '${order.order_id}'`,
        (err) => {
          if(err) return reject(err);
          resolve();
        });
    })
  },
  // method for deleting a specifed order
  delete: (order_id) => {
    return new Promise( (resolve, reject) => {
      db.get(`DELETE FROM orders WHERE order_id = ${order_id}`, (err, order) => {
        if (err) return reject(err);
        resolve(order);
      });
    });
  }
};

module.exports = Order;
