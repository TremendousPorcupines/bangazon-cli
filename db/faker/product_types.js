'use strict';

const faker = require('faker');

module.exports.generateProductTypes = () => {
  let product_types = [];

  for (let i = 0; i < 20; i++) {
    let name = faker.commerce.department();

    product_types.push({
      "name": name
    });
  }

  return product_types;
};