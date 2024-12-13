
export const getListCloseTrade= async (uid,bot)=>{
            const url = `https://my.ex-markets.com/st/v1/managers/accounts/${uid}/trade-history/`
            const respone = await fetch(url)   
            .then(response => response.json())
            .then((response)=>{
                if(!response) return null
                else return response.result
            })
            .catch((error)=>{
                bot.sendMessage(-4545085133,"Api den web dang bi loi");
            })
            if(respone == null) return null
            if (respone.length == 0) return null
            
    return respone;
}