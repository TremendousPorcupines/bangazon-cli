'use strict';
const prompt = require('prompt');
const { Database } = require('sqlite3').verbose();
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

const saveNewCustomer = ({name, street, city, state, zip, phone}) => {
  console.log('saveNew called', name);

  return new Promise( (resolve, reject) => {
    let custName = name.split(' ');
    db.run(`INSERT INTO customers VALUES (
        null,
      "${custName[0]}",
      "${custName[1]}",
      "${city}",
      "${street}",
      "${state}",
      "${zip}",
      "${phone}")`,
      (err) => {
        if (err) return reject(err);
        resolve("New customer added");
      });
  });
};

const getCustomers = () => {
  db.all(`SELECT c.id, c.first_name, c.last_name FROM customers c`, (err, customers) => {
    console.log("customers", customers);
  })
}

module.exports.promptNewCustomer = () => {
  return new Promise( (resolve, reject) => {
    prompt.get([{
      name: 'name',
      description: 'Enter customer name (First Last)',
      type: 'string',
      required: true
    }, {
      name: 'street',
      description: 'Enter street address',
      type: 'string',
      required: true
    }, {
      name: 'city',
      description: 'Enter city',
      type: 'string',
      required: true
    }, {
      name: 'state',
      description: 'Enter state (KY)',
      type: 'string',
      required: true
    }, {
      name: 'zip',
      description: 'Enter postal code',
      type: 'string',
      required: true
    }, {
      name: 'phone',
      description: 'Enter phone number (xxx-yyy-zzzz)',
      type: 'string',
      required: true
    }], function(err, results) {
      if (err) return reject(err);
      console.log('results from prompt', prompt );

      resolve({cb: saveNewCustomer, promptData: results});
    })
  });
};

module.exports.promptActiveCustomer = (selection) => {
  getCustomers()
  // .then( (customers) => {

  // })
};
