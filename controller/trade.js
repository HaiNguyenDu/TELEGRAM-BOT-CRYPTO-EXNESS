import { checkTrade,deleteTrade,getAllTradeId} from '../service/trade-service.js';;
import { getAllTradeNow } from '../helper/get-list-trade-now.js';
import { bot } from '../index.js';
import { formatTime } from '../helper/format-time.js';
import { getListCloseTrade } from '../helper/get-time-close-and-cost-close.js';


export async function openTrading(trader,roomId) {
    try {
      const listTradeNow =await getAllTradeNow(trader.uid,bot)
      if (!listTradeNow) return;
      let time = 1
      for (let i = 0; i < listTradeNow.length; i++) {
        const newTrandings = {
          order_id: listTradeNow[i].order_id,
          symbol: listTradeNow[i].symbol,
          trade_type: listTradeNow[i].trade_type,
          open_price: listTradeNow[i].open_price,
          account:listTradeNow[i].account,
        }
        
        const check = await checkTrade(newTrandings)
        if (check=="S") {
          setTimeout(()=>{
          const message = `Bot: ${trader.name}
Tín hiệu ✅: ${listTradeNow[i].trade_type}
Cặp giao dịch: ${listTradeNow[i].symbol}
Giá trung bình: ${Math.round(listTradeNow[i].open_price * 100000000) / 100000000} USDT
Thời gian: ${formatTime()}`
          bot.sendMessage(roomId, message)
          },1000*5*(++time))
        }
    }
  } catch (error) {
    bot.sendMessage(roomId,"tradejs"+ error)
    return
  }
    return
  
  }
  
export  async function closeTranding(trader,roomId) {
      try {
         
            const listCloseTrade =await getListCloseTrade(trader.uid,bot)
            const listIdTradeInDB = await getAllTradeId(trader.uid);
            if(!getListCloseTrade)
            {
              bot.sendMessage(roomId, "ApilistCLoseTrade fail to fetch")
              return
            }
            for(let i =0;i<listCloseTrade.length;i++)
            { 
              
              if(listIdTradeInDB.includes(listCloseTrade[i].order_id.toString()))
              {
                
                deleteTrade(listCloseTrade[i].order_id)
                setTimeout(()=>{
                const message = `Bot: ${trader.name}
Đã đóng tín hiệu ❌:${listCloseTrade[i].trade_type}
Cặp giao dịch: ${listCloseTrade[i].symbol}
Giá mở : ${Math.round(listCloseTrade[i].open_price*100000000)/100000000} USDT
Giá đóng : ${Math.round(listCloseTrade[i].close_price*100000000)/100000000} USDT
Thời gian đóng: ${formatTime()}`
                bot.sendMessage(roomId, message)
              },i*5000)
              }
            }
      } catch (error) {
        bot.sendMessage(roomId, "Close"+error)
      }
}