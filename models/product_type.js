'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

const Product_Type = {
  // method for getting one product type
  getOne: (product_type_id) => {
    return new Promise( (resolve, reject) => {
      db.get(`SELECT * FROM product_types WHERE product_type_id = ${product_type_id}`, (err, product_type) => {
        if (err) return reject(err);
        resolve(product_type);
      });
    });
  },
  // method for getting all product types
  getAll: () => {
    return new Promise( (resolve, reject) => {
      db.all(`SELECT * FROM product_types`, (err, product_types) => {
        if(err) return reject(err);
        resolve(product_types);
      });
    });
  },
  // method for adding a product type
  addOne: (product_type) => {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO product_types VALUES(null, "${product_type.name}")`, (err) => {
        if(err) return reject(err);
        resolve();
      });
    })
  },
  // method for updating a product_type's info
  edit: (product_type) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE product_types SET
        name = "${product_type.name}"
        WHERE product_type_id = '${product_type.product_type_id}'`,
        (err) => {
          if(err) return reject(err);
          resolve();
        });
    })
  },
  // method for deleting a specifed product_type
  delete: (product_type_id) => {
    return new Promise( (resolve, reject) => {
      db.get(`DELETE FROM product_types WHERE product_type_id = ${product_type_id}`, (err, product_type) => {
        if (err) return reject(err);
        resolve(product_type);
      });
    });
  }

};

module.exports = Product_Type;
