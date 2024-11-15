import mongoose , { model, Model, Schema, Types } from "mongoose";



const tradeSchema = new Schema({
    orderId:String,
    symbol:String,
    positionType:String,
    openAvgPrice:Number,
    traderNickName:String,
    openTime:Number
})

const Trade = new mongoose.model("Trade",tradeSchema)
export default Trade