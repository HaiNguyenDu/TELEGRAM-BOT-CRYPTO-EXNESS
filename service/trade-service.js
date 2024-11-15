import Trade from "../model/trade-model.js"
import {bot} from '../index.js'
//N la param null S la success T la ton tai E la loi server

export const checkTrade = async (trade)=>{
    if(!trade)
        return "N"
    try {
        const check = await Trade.findOne({orderId:trade.orderId,nickNameTrader:trade.nickNameTrader})
        if(check)
            return "T"
        const respone = await Trade.create(trade);
        if(!respone)
            return "N"
        else return "S"
    } catch (error) {
        bot.sendMessage(-4545085133,error)
    }
} 

export const deleteTrade = async (id)=>{
    if(!id)
        return "N"
    try {
        const deleteTrade = await Trade.deleteOne({orderId:id})
        return "S"
    } catch (error) {
        bot.sendMessage(-4545085133,error)
        return "E"
    }
}
export const getAllTradeId = async (traderNickName)=>{
    if(!traderNickName)
        return "N"
    try {
        const listTrade = await Trade.find({traderNickName:traderNickName})
        if(!listTrade)
            return "N"

        return listTrade.map(data=>data.orderId)

    } catch (error) {
        bot.sendMessage(-4545085133,error)
        return "E"
    }
}


export const deleteAll = async ()=>{
    await Trade.deleteMany({})
}