const mongoose = require("mongoose");
const _ = require("lodash");

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

userSchema.toJSON = function () {
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

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
