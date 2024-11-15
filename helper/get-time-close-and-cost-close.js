
export const getListCloseTrade= async (uid)=>{
    var result = []
    var traderNickName=""  
    for(let i =1;i<6;i++)
    {
       
            const url = `https://futures.mexc.com/copyFutures/api/v1/trader/ordersHis/v2?limit=10&page=${i}&uid=`
            const respone = await fetch(url+uid)   
            .then(response => response.json())
            .then((response)=>{
                if(!response.data.content) return
                else return response.data.content
            })
                if(!traderNickName) traderNickName = respone[0].traderNickName
                if (!respone)break; 
                if (respone.length == 0) break;
                result = result.concat(respone)
    }
   
    return {
        listCloseTrade:result,
        traderNickName:traderNickName
    }
}