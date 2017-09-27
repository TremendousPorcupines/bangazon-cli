'use strict';

const faker = require('faker');

module.exports.generateProducts = () => {
  const Customer = require('../../models/customer');
  const Product_Type = require('../../models/product_type');

  return new Promise((resolve, reject) => {

    Promise.all([Customer.getAll(), Product_Type.getAll()])
    .then((data) => {
      let customers = data[0];
      let types = data[1];
      let products = [];

      for (let i = 0; i < 100; i++) {
        let name = faker.commerce.productName();
        let price = faker.commerce.price();
        let customer_id;
        let product_type_id = Math.floor(Math.random() * types.length) + 1;

        if (i+1 > customers.length) {
          customer_id = Math.floor(Math.random() * customers.length) + 1;
        } else {
          customer_id = i+1;
        }

        products.push({
          name,
          price,
          customer_id,
          product_type_id
        });
      }
      resolve(products);
    })
  });
};
