
// Choose active customer

// Which customer will be active?
// 1. John Q. Public
// 2. Svetlana Z. Herevazena
// >

// Create Payment Option

// Enter payment type (e.g. AmEx, Visa, Checking)
// >

// Enter account number
// >

// Add Product to an Order

//     Note: These are examples. Add your own product names, please.

// To make it easier to add multiple products, when the user selects a product to order, display the menu of products again. Make sure the last option of Back to main menu so the user can specify that no more products are needed.

// 1. Diapers
// 2. Case of Cracking Cola
// 3. Bicycle
// 4. AA Batteries
// ...
// 9. Done adding products

// Complete an Order
// If no products have been selected yet

// Please add some products to your order first. Press any key to return to main menu.

// If there are current products in an order

// Your order total is $149.54. Ready to purchase
// (Y/N) >

// # If user entered Y
// Choose a payment option
// 1. Amex
// 2. Visa
// >

// Your order is complete! Press any key to return to main menu.

// # If user entered N, display the main menu again
// ==========================================================================
'use strict';

// 3rd party libs
const chalk = require("chalk");
const {red, magenta} = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
const path = require('path');
const { Database } = require('sqlite3').verbose();
prompt.message = colors.blue("Bangazon Corp");

// app modules
const { promptNewCustomer, promptActiveCustomer } = require('./customer')
// const {  } = require('')

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

prompt.start();

let actions = {
  selection1: promptNewCustomer,
  selection2: promptActiveCustomer,
  createPayOpt: "",
  addProduct: "",
  completeOrder: "",
  seeProdPop: "",
  selection7: () => { console.log("Bye!"); prompt.stop()}
}

module.exports.displayWelcome = () => {
  let headerDivider = `${magenta('*********************************************************')}`
  return new Promise( (resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${magenta('**  Welcome to Bangazon! Command Line Ordering System  **')}
  ${headerDivider}
  ${magenta('1.')} Create a customer account
  ${magenta('2.')} Choose active customer
  ${magenta('3.')} Create a payment option
  ${magenta('4.')} Add product to shopping cart
  ${magenta('5.')} Complete an order
  ${magenta('6.')} See product popularity
  ${magenta('7.')} Leave Bangazon!`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }],
    (err, answer) => {
      actions[`selection${answer.choice}`]()
      .then( ({cb, promptData}) => {
        return cb(promptData)
      })
      .then( (msg) => {
        console.log(`
          *********************************
          Thank you! ${msg}
          *********************************`
        );
        module.exports.displayWelcome();
      })
      .catch( (err) => {
        console.log("Sorry", err );
      });
    });
  });
}



