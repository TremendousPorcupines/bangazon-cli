'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

const Payment_Type = {
  // method for getting one payment type
  getOne: (payment_type_id) => {
    return new Promise( (resolve, reject) => {
      db.get(`SELECT * FROM payment_types WHERE payment_type_id = ${payment_type_id}`, (err, payment_type) => {
        if (err) return reject(err);
        resolve(payment_type);
      });
    });
  },
  // method for getting all payment types
  getAll: () => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM payment_types`, (err, payment_types) => {
        if(err) return reject(err);
        resolve(payment_types);
      });
    });
  },
    // method for adding a payment type
  addOne: (payment_type) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO payment_types VALUES(null, "${payment_type.name}", "${payment_type.account_number}", "${payment_type.user_id}")`, (err) => {
        if(err) return reject(err);
        resolve();
      });
    })
  },
  // method for updating a payment type's info
  edit: (payment_type) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE payment_types SET
        name = "${payment_type.name}",
        account_number = "${payment_type.account_number}",
        user_id = "${payment_type.user_id}"
        WHERE payment_type_id = '${payment_type.payment_type_id}'`,
        (err) => {
          if(err) return reject(err);
          resolve();
        });
    })
  },
  // method for deleting a specifed payment type
  delete: (payment_type_id) => {
    return new Promise( (resolve, reject) => {
      db.get(`DELETE FROM payment_types WHERE payment_type_id = ${payment_type_id}`, (err, payment_type) => {
        if (err) return reject(err);
        resolve(payment_type);
      });
    });
  }

};

module.exports = Payment_Type;
