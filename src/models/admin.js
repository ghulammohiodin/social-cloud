const mongoose = require("mongoose");
const _ = require("lodash");
const Joi = require("joi");

const adminSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

adminSchema.toJSON = function () {
  var admin = this;
  var adminObject = admin.toObject();
  var adminJson = _.pick(adminObject, [
    "_id",
    "user_id",
    "first_name",
    "last_name",
    "profile_picture",
    "contact_number",
    "address",
    "verifcation_status",
    "verification_code",
    "createdAt",
    "updatedAt",
  ]);
  return adminJson;
};

const Admin = mongoose.model("Admin", adminSchema);

function validateAdmin(admin) {
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
  return schema.validate(admin);
}

module.exports = {
  validateAdmin,
  Admin,
};
