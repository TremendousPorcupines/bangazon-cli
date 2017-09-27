'use strict';

const faker = require('faker');

module.exports.generateOrders = () => {
  const Customer = require('../../models/customer');
  const Payment_Type = require('../../models/payment_type');

  return new Promise((resolve, reject) => {

    Promise.all([Customer.getAll(), Payment_Type.getAll()])
    .then((data) => {
      let customers = data[0];
      let types = data[1];
      let orders = [];
      let count = 0;

      for (let i = 0; i < 200; i++) {
        let customer_id;
        let payment_type_id;

        if (i+1 > customers.length) {
          customer_id = Math.floor(Math.random() * customers.length) + 1;
        } else {
          customer_id = i+1;
        }

        types.forEach((type) => {
          if (customer_id === type.customer_id && count++ % 6 != 0) {
            if (count++ % 6 != 0) {
              payment_type_id = type.payment_type_id;
            } else {
              payment_type_id = null;
            }
          }
        })

        orders.push({
          customer_id,
          payment_type_id
        });
      }
      resolve(orders);
    })
  });
};