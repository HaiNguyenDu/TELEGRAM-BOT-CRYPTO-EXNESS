import { checkTrade,deleteTrade,getAllTradeId} from '../service/trade-service.js';;
import { getAllTradeNow } from '../helper/get-list-trade-now.js';
import { bot } from '../index.js';
import { formatTime } from '../helper/format-time.js';
import { getListCloseTrade } from '../helper/get-time-close-and-cost-close.js';
const url = "https://futures.mexc.com/copyFutures/api/v1/trader/orders/v2?limit=1000&orderListType=ORDER&page=4&uid="

export async function openTrading(uid,roomId) {
    try {
      const listTradeNow =await getAllTradeNow(uid)
      if (listTradeNow.length == 0) return;
      let time = 1
      for (let i = 0; i < listTradeNow.length; i++) {
        const newTrandings = {
          orderId: listTradeNow[i].orderId,
          symbol: listTradeNow[i].symbol,
          positionType: listTradeNow[i].positionType,
          openAvgPrice: listTradeNow[i].openAvgPrice,
          traderNickName:listTradeNow[i].traderNickName,
          openTime:listTradeNow[i].openTime,
        }
        const check = await checkTrade(newTrandings)
        if (check=="S") {
          setTimeout(()=>{
          const message = `Bot: ${listTradeNow[i].traderNickName[0]}
Tín hiệu ✅: ${listTradeNow[i].positionType==2?"Short":"Long"}
Cặp giao dịch: ${listTradeNow[i].symbol}
Giá trung bình: ${Math.round(listTradeNow[i].openAvgPrice * 100000000) / 100000000} USDT
Thời gian: ${formatTime()}`
          bot.sendMessage(roomId, message)
          },1000*5*(++time))
        }
    }
  } catch (error) {
    bot.sendMessage(roomId, error)
    return
  }
    return
  
  }
  
export  async function closeTranding(uid,roomId) {
      try {
         
            const data =await getListCloseTrade(uid)
            const listCloseTrade = data.listCloseTrade
            const listIdTradeInDB = await getAllTradeId(data.traderNickName);

       
            for(let i =0;i<listCloseTrade.length;i++)
            { 
              
              if(listIdTradeInDB.includes(listCloseTrade[i].orderId))
              {
                
                deleteTrade(listCloseTrade[i].orderId)
                setTimeout(()=>{
                const message = `Bot: ${listCloseTrade[i].traderNickName[0]}
Đã đóng tín hiệu ❌:${listCloseTrade[i].positionType==2?" Short":" Long"}
Cặp giao dịch: ${listCloseTrade[i].symbol}
Giá mở : ${Math.round(listCloseTrade[i].openAvgPrice*100000000)/100000000} USDT
Giá đóng : ${Math.round(listCloseTrade[i].closeAvgPrice*100000000)/100000000} USDT
Thời gian đóng: ${formatTime()}`
                bot.sendMessage(roomId, message)
              },i*5000)
              }
            }
      } catch (error) {
        bot.sendMessage(roomId, error)
      }
}