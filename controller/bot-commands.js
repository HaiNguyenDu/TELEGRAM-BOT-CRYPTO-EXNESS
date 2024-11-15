import { closeTranding, openTrading } from "./trade.js";

var roomId =-4545085133;
const listNumBer = []
const listTrader ={
  "MRDEEDS":77849100,
  "JCK":32443687,
  "Dionzsos":23106845,
  "Crypto Surfer":22394266,
  "HaiDangVN x10 x20 🇻🇳":65050077
}


export const botCommands =(bot)=>{
  bot.onText(/\/help/, (msg, match) => {
    const chatId = msg.chat.id;
    const message =`/changeTrader idTraderOld idTraderNew nameTraderNew
This order has the effect of changing traders

/listTrader 
This order has the effect of echo List Trader

/changeGroupId id
This order has the effect of change Group Id

/getGroupId
This order has the effect of get Group Id

/testGroupId message
This order has the effect of test bot in Group
`

    
    bot.sendMessage(chatId, message);
  });   
bot.onText(/\/testGroupId (.+)/, (msg, match) => {

  const resp = match[1];
  bot.sendMessage(roomId, resp);
});
bot.onText(/\/changeTrader (\S+) (\S+) (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  if(!match[1]||!match[2]||!match[3]) {
     bot.sendMessage(chatId, "Vui Long Nhap Dung Du Lieu theo form Idtradermuonthaydoi idthaydoi tentrader");
    return 
    }
  for(let Trader in listTrader)
  {
    if(listTrader[Trader] == match[1])
    {
      delete listTrader[Trader]
      listTrader[match[3]]=match[2]
      bot.sendMessage(chatId, "Thay Doi Thanh Cong")
      return 
    }
  }
  bot.sendMessage(chatId, "Id Ko Ton Tai");
  return 
});
bot.onText(/\/listTrader/, (msg, match) => {
  const chatId = msg.chat.id;
  var result = ''
  for(let trader in listTrader)
  {
    result += trader+":"+listTrader[trader]+"\n"
  }
  
  bot.sendMessage(chatId, result);
});
bot.onText(/\/changeGroupId (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  roomId = match[1];
  bot.sendMessage(chatId, "Thay Doi Id Room Thanh Cong");
});
bot.onText(/\/getGroupId/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,"Group Id :" +" "+roomId);
});
let i =0


for(let trader in listTrader)
{
  setTimeout(()=>{
    setTimeout(()=>{
      setInterval(()=>closeTranding(listTrader[trader],roomId),100000)
    },5000)
    setInterval(()=>openTrading(listTrader[trader],roomId),100000) 
   }
  ,1000*(i++))

}

}



