

// Create menu for:
// *********************************************************
// **  Welcome to Bangazon! Command Line Ordering System  **
// *********************************************************
// 1. Create a customer account
// 2. Choose active customer
// 3. Create a payment option
// 4. Add product to shopping cart
// 5. Complete an order
// 6. See product popularity
// 7. Leave Bangazon!

// Create Customer

// Enter customer name
// >

// Enter street address
// >

// Enter city
// >

// Enter state
// >

// Enter postal code
// >

// Enter phone number
// >


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

const chalk = require("chalk");
const {red} = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
const path = require('path');
const { Database } = require('sqlite3').verbose();

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

prompt.start();

addNewUser = () =>
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
    addNewCustomer(results);
  });

const addNewCustomer = ({name, street, city, state, zip, phone}) => {
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
    // Somehow should have access to a 'this' and its 'lastID' prop? Acccording to docs
    (err) => { console.log("New Customer added"); }
    )
}

module.exports.actions = {
  selection1: addNewUser,
  selection2: () => console.log("Choose customer"),
  createPayOpt: "",
  addProduct: "",
  completeOrder: "",
  seeProdPop: "",
  selection7: () => { console.log("Bye!"); prompt.stop()}
}

module.exports.displayWelcome = () => {
  return new Promise( (resolve, reject) => {
    console.log(`
*********************************************************
**  Welcome to Bangazon! Command Line Ordering System  **
*********************************************************
1. Create a customer account
2. Choose active customer
3. Create a payment option
4. Add product to shopping cart
5. Complete an order
6. See product popularity
7. Leave Bangazon!`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], 
    (err, answer) => {
      resolve(answer)
    })
  })
}


const displayChart = () => {
  const header = `Product${' '.repeat(11)}Orders${' '.repeat(5)}Customers${' '.repeat(2)}Revenue${' '.repeat(8)}\n`
  const divider = `${red('*'.repeat(55))}\n`
  process.stdout.write(header + divider)
  for( let prop in feedback) {
    process.stdout.write(`${feedback[prop]}\n`)
  }
  process.stdout.write(divider)
}



