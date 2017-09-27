'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

const Customer = {
  // method for getting one customer
  getOne: (customer_id) => {
    return new Promise( (resolve, reject) => {
      db.get(`SELECT * FROM customers WHERE customer_id = ${customer_id}`, (err, customer) => {
        if (err) return reject(err);
        resolve(customer);
      });
    });
  },
  // method for getting all customers
  getAll: () => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM customers`, (err, customers) => {
        if(err) return reject(err);
        resolve(customers); 
      });
    });
  },
  // method for adding a customer
  addOne: (customer) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO customers VALUES(null, "${customer.firstName}", "${customer.lastName}", "${customer.address}", "${customer.city}", "${customer.zipcode}", "${customer.phone}", "${customer.dateCreated}", "${customer.lastLogin}")`, (err) => {
        if(err) return reject(err);
        resolve();
      });
    })
  },
  // method for updating a customer's info
  edit: (customer) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE customers SET
        first_name = "${customer.firstName}",
        last_name = "${customer.lastName}",
        address = "${customer.address}",
        city = "${customer.city}",
        zip_code = "${customer.zipcode}",
        phone = "${customer.phone}",
        date_created = "${customer.dateCreated}",
        last_login ="${customer.lastLogin}"
        WHERE customer_id = ${customer.customer_id}`, 
        (err) => {
          if(err) return reject(err);
          resolve();
        });
    })
  }
};

module.exports = Customer;