'use strict';

const faker = require('faker');

module.exports.generateOrderProducts = () => {
  const Order = require('../../models/order');
  const Product = require('../../models/product');

  return new Promise((resolve, reject) => {

    Promise.all([Order.getAll(), Product.getAll()])
    .then((data) => {
      let orders = data[0];
      let products = data[1];
      let order_products = [];

      for (let i = 0; i < 300; i++) {
        let order_id;
        let product_id = Math.floor(Math.random() * products.length) + 1;

        if (i+1 > orders.length) {
          order_id = Math.floor(Math.random() * orders.length) + 1;
        } else {
          order_id = i+1;
        }

        order_products.push({
          order_id,
          product_id
        });
      }
      resolve(order_products);
    })
  });
};
