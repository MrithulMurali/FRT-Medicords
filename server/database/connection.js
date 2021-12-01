const mongoose = require("mongoose");

const connect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGOURI, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connection establied @${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connect;
