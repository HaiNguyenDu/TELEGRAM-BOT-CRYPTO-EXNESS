import mongoose , { model, Model, Schema, Types } from "mongoose";



const tradeSchema = new Schema({
    id:Number,
    symbol:String,
    positionType:String,
    openAvgPrice:Number,
    traderNickName:String,
})

const Trade = new mongoose.model("Trade",tradeSchema)
export default Trade