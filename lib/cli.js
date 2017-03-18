'use strict';

process.title = 'Bangazon Inventory or Something';
// require('./database');
const { displayWelcome, actions } = require('./ui');

displayWelcome()
.then( (input) => {
  console.log("input", input);
  actions[`selection${input.choice˚}`]()
})


