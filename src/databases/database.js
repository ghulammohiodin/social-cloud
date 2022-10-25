const mongoose = require("mongoose");

// Connect to the database

const connect_database = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database");
  }
};

connect_database();

// Export the function

module.exports = { connect_database };
