import mongoose from "mongoose";
// added a change
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vedantthakre7:vedant@cluster0.ig28tkt.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
