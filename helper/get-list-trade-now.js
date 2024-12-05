


export const getAllTradeNow= async (uid)=>{
            const url = `https://my.ex-markets.com/st/v1/managers/accounts/${uid}/open-trades/`
            const respone = await fetch(url)   
            .then(response => response.json())
            .then((response)=>{
                if(!response.result) return
                else return response.result
            })
            .catch((error)=>{
                bot.sendMessage(-4545085133,"Api den web dang bi loi");
            })
           
            if (respone.length == 0) return null
    return respone
}