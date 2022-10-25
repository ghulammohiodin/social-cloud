const Customer = require("../models/customer");

const signup_customer = async (customer_data) => {
  const customer = new Customer(customer_data);
  return await customer.save();
};

module.exports = { signup_customer };
