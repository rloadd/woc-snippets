

var https = require('https');
var bl   = require('bl');

function Tools() {
    if (!(this instanceof Tools)) {
        return new Tools()
    }
    return this
}

Tools.defaultIntervalBetweenCalls = 300; //milliseconds
Tools.promiseGET = function(url, _httpclient) {
    var httpclient = _httpclient ? _httpclient : https;
    return new Promise(function(resolve, reject) {
        httpclient.get(url, function (response) {
            response.setEncoding('utf8');
            response.pipe(bl(function (err, data) {
                if (err) { console.log(err) }
               resolve(data.toString())
            }))
        })
    })
}


Tools.WocWait = function(_milliseconds) { 
    var milliseconds = _milliseconds ? _milliseconds : Tools.defaultIntervalBetweenCalls;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(milliseconds);
        }, milliseconds);
    });
}

module.exports = Tools;

