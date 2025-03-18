const mongoose = require("mongoose");

const connectDB = async () => {
  const PASSWORD = "c0VzdJOtxLsOs8qs";
  const DATABASE_NAME = "Cluster0";
  const CONNECTION_URL = `mongodb+srv://falmumen:${PASSWORD}@${DATABASE_NAME}.sj13h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  const conn = await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(CONNECTION_URL);
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
