'use strict';

const faker = require('faker');
const User = require('../../models/user');

module.exports.generatePaymentTypes = () => {
  return new Promise( (resolve, reject) => {
    User.getAll()
    .then((users) => {
      let payment_types = [];
      let usersLen = users.length;

      for (let i = 0; i < usersLen+50; i++) {
        let user_id;
        if (i+1 > usersLen) {
          user_id = Math.floor(Math.random() * usersLen) + 1;
        } else {
          user_id = i+1;
        }
        let name = faker.finance.accountName();
        let account_number = faker.finance.account();

        payment_types.push({
          user_id,
          name,
          account_number
        });
      }
      resolve(payment_types);
    })
  });
};