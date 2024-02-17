import mongoose from "mongoose";
import colors from "colors";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    const connectionUrl = process.env.MONGO_URI;

    await mongoose.connect(connectionUrl, configOptions);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error(
      `Error connecting to the database: ${error.message}`.red.bold
    );
  }
};

export default connectDB;
