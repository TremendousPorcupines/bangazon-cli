'use strict';

const faker = require('faker');

module.exports.generateProducts = () => {
  const User = require('../../models/user');
  const Product_Type = require('../../models/product_type');

  return new Promise((resolve, reject) => {

    Promise.all([User.getAll(), Product_Type.getAll()])
    .then((data) => {
      let users = data[0];
      let types = data[1];
      let products = [];

      for (let i = 0; i < 100; i++) {
        let name = faker.commerce.productName();
        let price = faker.commerce.price();
        let user_id;
        let product_type_id = Math.floor(Math.random() * types.length) + 1;

        if (i+1 > users.length) {
          user_id = Math.floor(Math.random() * users.length) + 1;
        } else {
          user_id = i+1;
        }

        products.push({
          name,
          price,
          user_id,
          product_type_id
        });
      }
      resolve(products);
    })
  });
};
