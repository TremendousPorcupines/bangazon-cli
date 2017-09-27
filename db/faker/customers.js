'use strict';

const faker = require('faker');

module.exports.generateCustomers = () => {
  let customers = [];

  for (let i = 0; i < 50; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let address = faker.address.streetAddress();
    let city = faker.address.city();
    let state = faker.address.state();
    let zipCode = faker.address.zipCode();
    let phone = faker.phone.phoneNumberFormat();
    let dateCreated = faker.date.past();
    let lastLogin = faker.date.recent();

    customers.push({
      "first_name": firstName,
      "last_name": lastName,
      "address": address,
      "city": city,
      "state": state,
      "zip_code": zipCode,
      "phone": phone,
      "date_created": dateCreated,
      "last_login": lastLogin
    });
  }

  return customers;
};
