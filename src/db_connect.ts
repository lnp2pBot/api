import mongoose from "mongoose";

// connect to database
const credentials = process.env.DB_USER
  ? `${process.env.DB_USER}:${process.env.DB_PASS}@`
  : "";
const MONGO_URI = `mongodb://${credentials}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
if (!MONGO_URI) {
  throw new Error("You must provide a MongoDB URI");
}

const connect = () => {
  mongoose.connect(MONGO_URI);
  return mongoose;
};

export default connect;
