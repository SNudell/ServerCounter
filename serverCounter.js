var url = require("url");

var counter = 5;

function handleEvent(request, response) {
    var data = parseRequestData(request);
    var operation = data.operation;
    var interval = data.interval;
    
    if(operation == "inc") {
        counter += interval
        console.log("increment by: " + interval)
    }
    
    if(operation == "dec") {
        counter -= interval
        console.log("decrement by: " + interval)
    }
    
    writeHead(200, response);
    
    var responseDataCounter = {
        "counter": counter
    };
    
    var responseDataString = JSON.stringify(responseDataCounter);
    response.end(responseDataString);
}

function writeHead(statusCode, response) {
    response.writeHead(statusCode,
            {"Content-Type": "text/plain",
             "Access-Control-Allow-Origin": "*"  
            });
}

function parseRequestData(request) {
    var parsedUrl = url.parse(request.url, true);
    var operation = parsedUrl.query.operation;
    var interval = parsedUrl.query.interval;
    return {
            "operation": operation,
            "interval": Number(interval)
    };
}

exports.handleCounterEvent = handleEvent;
