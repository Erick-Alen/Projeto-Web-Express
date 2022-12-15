const day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const year = {
    "2021":"2021",
    "2020":"2020",
    "2019":"2019",
    "2018":"2018",
    "2017":"2017",
    "2016":"2016",
    "2015":"2015",
    "2014":"2014",
    "2013":"2013",
    "2012":"2012",
    "2011":"2011",
    "2010":"2010",
},
month = {
    "Janeiro - 1": "1",
    "Fevereiro - 2": "2",
    "Março - 3": "3",
    "Abril - 4": "4",
    "Maio - 5": "5",
    "Junho - 6": "6",
    "Julho - 7": "7",
    "Agosto - 8": "8",
    "Setembro - 9": "9",
    "Outubro - 10": "10",
    "Novembro - 11": "11",
    "Dezembro - 12": "12",
}
// month_30 = month_28 + [29,30]

const coin = {
    "Bitcoin (BTC)": "BTC",
    "Ethereum (ETH)": "ETH",
    "Tether (USDT)": "USDT",
    "BNB (BNB)": "BNB",
    "USD Coin (USDC)": "USDC",
    "XRP (XRP)": "XRP",
    "Binance USD (BUSD)": "BUSD",
    "Dogecoin (DOGE)": "DOGE",
    "Cardano (ADA)": "ADA",
    "Solana (SOL)": "SOL",
    "Polygon (MATIC)": "MATIC",
    "Polkadot (DOT)": "DOT",
    "Shiba Inu (SHIB)": "BUSD",
    "Dai (DAI)": "DAI",
    "TRON (TRX)": "TRX",
    "Avalanche (AVAX)": "AVAX",
    "Chainlink (LINK)": "LINK",
    "Cosmos (ATOM)": "ATOM",
    "Uniswap (UNI)": "UNI",
}

let input_datalistCrypto = document.getElementById("input-datalist-crypto")

let input_datalistAno = document.getElementById("input-datalist-ano")

let input_datalistMes = document.getElementById("input-datalist-mes")

let input_datalistDia = document.getElementById("input-datalist-dia")

let form_crypto = document.getElementById("form-crypto")

let search = document.querySelector("#searchButton")

search.addEventListener('click', async () => {
    console.log(input_datalistCrypto.value)
    console.log(input_datalistAno.value)
    console.log(input_datalistMes.value)
    console.log(input_datalistDia.value)
await axios.get(`https://www.mercadobitcoin.net/api/${coin[input_datalistCrypto.value]}/day-summary/${year[input_datalistAno.value]}/${month[input_datalistMes.value]}/${day[input_datalistDia.value]}`)
    .then((json) => {
        preencheResultados(json.data)
        console.log(json.data.avg_price)
    })
    .catch((error) => {
        alert("Não há informações para a data selecionada.")
    })

});
function preencheResultados(data){
    let tabela_resultados = document.getElementById("result-crypto")
    tabela_resultados.innerHTML = `<tr>\
                                        <td>Data de pesquisa:</td>\
                                        <td>${data["date"]}</td>\
                                        </tr>\
                                    <tr>\
                                        <td>Preço de abertura(R$):</td>\
                                        <td>${data["opening"]}</td>\
                                    </tr>\
                                    <tr>\
                                        <td>Preço de fechamento(R$):</td>\
                                        <td>${data["closing"]}</td>\
                                        </tr>\
                                        <tr>\
                                        <td>Volume(R$):</td>\
                                        <td>${data["volume"]}</td>\
                                        </tr>\
                                    <tr>\
                                        <td>Preço médio(R$):</td>\
                                        <td>${data["avg_price"]}</td>\
                                    </tr>`
                                }