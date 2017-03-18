'use strict';

let activeCustomer = {
  name: null,
  id: null
}

module.exports.setActiveCustomer = (name, id) => {
  activeCustomer.name = name;
  activeCustomer.id = id;
}

module.exports.getActiveCustomer = () => activeCustomer;
