import mongoose , { model, Model, Schema, Types } from "mongoose";



const tradeSchema = new Schema({
    order_id:String,
    symbol:String,
    trade_type:String,
    open_price:Number,
    account:String
})

const Trade = new mongoose.model("Trade",tradeSchema)
export default Trade