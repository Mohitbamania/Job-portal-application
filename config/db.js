import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to the Mongodb Database");
  } 
  catch (error) {
    console.log(`Mongodb error ${error}`);
  }
};

export default connectDB;
