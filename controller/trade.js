import { checkTrade,deleteTrade,getAllTrade} from '../service/trade-service.js';
import { getAllIdTradeNow } from '../helper/get-list-id-trade-now.js';
import { getAllTradeNow } from '../helper/get-list-trade-now.js';
import { bot } from '../index.js';
const url = "https://futures.mexc.com/copyFutures/api/v1/trader/orders/v2?limit=1000&orderListType=ORDER&page=4&uid="

export async function openTrading(uid,roomId) {
    try {
      const listTradeNow =await getAllTradeNow(uid)
      if (listTradeNow.length == 0) return;
      let time = 1
      for (let i = 0; i < listTradeNow.length; i++) {
        const newTrandings = {
          id: listTradeNow[i].id,
          symbol: listTradeNow[i].symbol,
          positionType: listTradeNow[i].positionType,
          openAvgPrice: listTradeNow[i].openAvgPrice,
          traderNickName:listTradeNow[i].traderNickName
        }
        const check = await checkTrade(newTrandings)
  
        if (check=="S") {
          setTimeout(()=>{
          const message = `
Trader: ${listTradeNow[i].traderNickName[0]}
Mở Tín hiệu ✅: ${listTradeNow[i].positionType==2?"Short":"Long"}
Cặp giao dịch: ${listTradeNow[i].symbol}
Giá trung bình: ${listTradeNow[i].openAvgPrice} USDT`
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
  
            const data =await getAllIdTradeNow(uid)
            const listIdTradeNow = data.listIdTradeNow
            const listTradeInDB = await getAllTrade(data.traderNickName);
        
  
            for(let i =0;i<listTradeInDB.length;i++)
            {
              if(!listIdTradeNow.includes(listTradeInDB[i].id))
              {
                
                deleteTrade(listTradeInDB[i].id)
                setTimeout(()=>{
                const message = `
Trader: ${listTradeInDB[i].traderNickName[0]}
Đã đóng tín hiệu ❌:${listTradeInDB[i].positionType==2?" Short":" Long"}
Cặp giao dịch: ${listTradeInDB[i].symbol}
Giá trung bình: ${listTradeInDB[i].openAvgPrice} USDT`
                bot.sendMessage(roomId, message)
              },i*5000)
              }
            }
      } catch (error) {
        bot.sendMessage(roomId, error)
      }
}