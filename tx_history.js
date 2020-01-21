

const tools = require("./tools.js");


//console.log(url);   //uncomment to see the URL
function tx_history(network, address) {

    tools.promiseGET(url).then(data => { 
        console.log("HISTORY: " + data);
        var i = 1;
        JSON.parse(data).forEach(element => {
                //console.log(url2 + txs[i]['tx_hash']); //uncomment to see the URL
                
                tools.WocWait(tools.defaultIntervalBetweenCalls * i++)
                .then(nothing => {
                    tools.promiseGET(url2 + element['tx_hash'])
                    .then(tx => { console.log(tx) })
                    .catch(e => console.log(e))
                }).catch(e => console.log(e))
        });
    })
}

var address = process.argv[3]? process.argv[3]: "12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX";  //value will be the address
var network= process.argv[2] ? process.argv[2] : "main";       //value will be "network"

const url = "https://api.whatsonchain.com/v1/bsv/" + network  + "/address/" + address + "/history";
const url2="https://api.whatsonchain.com/v1/bsv/" + network  + "/tx/hash/";
tx_history(network, address);



