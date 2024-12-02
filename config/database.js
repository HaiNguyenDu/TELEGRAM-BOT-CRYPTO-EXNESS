import mongoose from "mongoose";


const stringUrl ="mongodb+srv://PhuocNguyen:PN123456@demo.nbwwo.mongodb.net/BotTelegramExness?retryWrites=true&w=majority&appName=Demo"


const connectDb = async ()=> {
    try {
        await mongoose.connect(stringUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDb;