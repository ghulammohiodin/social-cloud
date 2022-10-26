const mongoose = require("mongoose");
const _ = require("lodash");
const Joi = require("joi");
const customerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    profile_picture: {},
    contact_number: {
      type: String,
    },
    address: {
      type: String,
    },
    verifcation_status: {
      type: Boolean,
      default: false,
    },
    verification_code: {
      type: String,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    floowers_count: {
      type: Number,
      default: 0,
    },

    following_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

customerSchema.toJSON = function () {
  var customer = this;
  var customerObject = customer.toObject();
  var customerJson = _.pick(customerObject, [
    "_id",
    "user_id",
    "first_name",
    "last_name",
    "profile_picture",
    "contact_number",
    "address",
    "verifcation_status",
    "verification_code",
    "followers",
    "following",
    "followers_count",
    "following_count",
    "createdAt",
    "updatedAt",
  ]);
  return customerJson;
};

function validateCustomer(customer) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    profile_picture: Joi.object(),
    contact_number: Joi.string(),
    address: Joi.string(),
    verifcation_status: Joi.boolean(),
    verification_code: Joi.string(),
  });
  return schema.validate(customer);
}

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer, validateCustomer };
