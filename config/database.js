import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const stringUrl =process.env.MONGODB_URL || ""


const connectDb = async ()=> {
    try {
        await mongoose.connect(stringUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDb;