import Trade from "../model/trade-model.js"
import {bot} from '../index.js'
//N la param null S la success T la ton tai E la loi server

export const checkTrade = async (trade)=>{
    if(!trade)
        return "N"
    try {
        const check = await Trade.findOne({id:trade.id,nickNameTrader:trade.nickNameTrader})
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
        const deleteTrade = await Trade.deleteOne({id:id})
        return "S"
    } catch (error) {
        bot.sendMessage(-4545085133,error)
        return "E"
    }
}
export const getAllTrade = async (traderNickName)=>{
    if(!traderNickName)
        return "N"
    try {
        const listTrade = await Trade.find({traderNickName:traderNickName})
        if(!listTrade)
            return "N"

        return listTrade

    } catch (error) {
        bot.sendMessage(-4545085133,error)
        return "E"
    }
}


