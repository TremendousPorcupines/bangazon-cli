'use strict';

const faker = require('faker');
const Customer = require('../../models/customer');

module.exports.generatePaymentTypes = () => {
  return new Promise( (resolve, reject) => {
    Customer.getAll()
    .then((customers) => {
      let payment_types = [];
      let customersLen = customers.length;

      for (let i = 0; i < customersLen+50; i++) {
        let customer_id;
        if (i+1 > customersLen) {
          customer_id = Math.floor(Math.random() * customersLen) + 1;
        } else {
          customer_id = i+1;
        }
        let name = faker.finance.accountName();
        let account_number = faker.finance.account();

        payment_types.push({
          customer_id,
          name,
          account_number
        });
      }
      resolve(payment_types);
    })
  });
};