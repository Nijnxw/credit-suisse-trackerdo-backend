const mongoose = require('mongoose');
const db = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL;

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    // process.exit(1);
  }
};

module.exports = connectDB;
