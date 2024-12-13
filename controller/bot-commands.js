import { closeTranding, openTrading } from "./trade.js";

var roomId =-4664262900


const listTrader = [{
  name:"A",
  uid:11103957,
  intervalOpen:null,
  intervalClose:null
},{
  name:"B",
  uid:110169204,
  intervalOpen:null,
  intervalClose:null
},{
  name:"C",
  uid:110020617,
  intervalOpen:null,
  intervalClose:null
},{
  name:"D",
  uid:110161186,
  intervalOpen:null,
  intervalClose:null

},{
  name:"E",
  uid:110012894,
  intervalOpen:null,
  intervalClose:null
}
]



export const botCommands =(bot)=>{
  bot.onText(/\/xxxhelp/, (msg, match) => {
    const chatId = msg.chat.id;
    const message =`/xxxChageGroupId id
This order has the effect of change Group Id

/xxxlistBot 
This order has the effect of echo List Bot

/xxxgetGroupId
This order has the effect of get Group Id

/xxxtestGroupId message
This order has the effect of test bot in Group

/xxxaddBot botName uid
This order has the effect of add Bot 

/xxxremoveBot 1-5
This order has the effect of remove Bot 
`

    
    bot.sendMessage(chatId, message);
  });   
  bot.onText(/\/xxxaddBot (.+) (\S+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const traderName = match[1]
    const uid = match[2]
    listTrader.push({name:traderName,uid:uid})
    setTimeout(()=>{
     listTrader[4].intervalClose= setInterval(()=>closeTranding(listTrader[traderName],roomId),100000)
    },5000)
     listTrader[4].intervalOpen=setInterval(()=>openTrading(listTrader[traderName],roomId),100000) 
    bot.sendMessage(chatId, "Add Bot "+ traderName+":"+ uid +" success");
  });
  bot.onText(/\/xxxremoveBot (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const traderIndex = match[1]
    try {
      if(!listTrader[traderIndex])
        return bot.sendMessage(roomId, "Bot is not exist");
      else{
      clearInterval(listTrader[traderIndex-1].intervalOpen)
      clearInterval(listTrader[traderIndex-1].intervalClose)
      listTrader.splice(traderIndex-1,1)
       bot.sendMessage(chatId, "remove Bot success");  
      }   
    } catch (error) {
      console.log(error )
 
    }
  });
bot.onText(/\/xxxtestGroupId (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});


bot.onText(/\/xxxlistBot/, (msg, match) => {
  const chatId = msg.chat.id;
  var result = ""
  for(let i =0;i<listTrader.length;i++){
    result += listTrader[i].name +" : "+ listTrader[i].uid +"\n"
  }
  bot.sendMessage(chatId, result);
});
bot.onText(/\/xxxchangeGroupId (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  roomId = match[1];
  bot.sendMessage(chatId, "Thay Doi Id Room Thanh Cong");
});
bot.onText(/\/xxxgetGroupId/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,"Group Id :" +" "+roomId);
});

let i =0
listTrader.forEach((trader)=>{
  setTimeout(()=>{
    setTimeout(()=>{
     trader.intervalClose = setInterval(()=>closeTranding(trader,roomId),120000)
    },5000)
     trader.intervalOpen= setInterval(()=>openTrading(trader,roomId),120000) 
   }
  ,1000*(i++))
})
}





