const { Customer } = require("../models/customer");

const signup_customer = async (customer_data) => {
  const customer = new Customer(customer_data);
  return await customer.save();
};

const find_customer_by_user_id = async (user_id) => {
  return await Customer.findOne({ user_id: user_id });
};

module.exports = { signup_customer, find_customer_by_user_id };
