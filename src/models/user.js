const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },

    type: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

function validateUserLogin(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    type: Joi.number().required(),
  });
  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUserLogin };
