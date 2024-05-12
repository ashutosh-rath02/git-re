import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      autoIndex: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.error(`Error ${error}`);
    process.exit(1);
  }
};

export default connectDB;
