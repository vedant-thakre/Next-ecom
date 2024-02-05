import mongoose from "mongoose";
import colors from 'colors';

const configOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}

const connectDB = async() => {
    const connectionUrl =
      "mongodb+srv://vedantthakre7:vedant@cluster0.ig28tkt.mongodb.net/?retryWrites=true&w=majority";

    mongoose.connect(connectionUrl, configOptions).then(()=>{
        console.log("Database Connected Successfully");
    }).catch((err) => {
        console.log(`Getting Error in connecting the database : ${err.message}`.yellow.bold);
    });  
}

export default connectDB;