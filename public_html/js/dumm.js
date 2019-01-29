var COUNT_START_VALUE = 0;
var INTERVAL_START_VALUE = 1;

var SERVER_URL = "127.0.0.1:4040";
var fetchEndpoint = "/fetch";

var counter = new Counter(COUNT_START_VALUE);
var interval = new Counter(INTERVAL_START_VALUE);

function init() {
    fetchCounterStatus();
    setListeners();
    window.setInterval(function(){
    fetchCounterStatus();
    }, 200);
}

function setListeners() {
    var incrementButton = document.getElementById("IncrementButton");
    incrementButton.addEventListener("click", incrementCounter);

    var decrementButton = document.getElementById("DecrementButton");
    decrementButton.addEventListener("click", decrementCounter);

    var intervalIncrementButton = document.getElementById("IncrementIntervalButton");
    intervalIncrementButton.addEventListener("click", incrementInterval);

    var intervalDecrementButton = document.getElementById("DecrementIntervalButton");
    intervalDecrementButton.addEventListener("click", decrementInterval);
}

function incrementCounter() {
    updateCounterStatus("inc",interval.getValue());
}

function decrementCounter() {
    updateCounterStatus("dec",interval.getValue());
}

function incrementInterval() {
    var counterDisplay = document.getElementById("IntervalDisplay");
    counterDisplay.innerHTML = interval.increment().toString();
}

function decrementInterval() {
    var counterDisplay = document.getElementById("IntervalDisplay");
    if(interval.decrement()<1){
        interval.increment();
    }
    counterDisplay.innerHTML = interval.getValue().toString();
}

function fetchCounterStatus() {
    $.ajax({
        url: fetchEndpoint,
        dataType: "json",
        data: {
            "operation": "fetch",
            "interval": 0
        },
        success: handleCounterUpdate,
        error: errorRequestingData
    });
}

function updateCounterStatus(operation,interval) {
    $.ajax({
        url: fetchEndpoint,
        dataType: "json",
        data: {
            "operation": operation,
            "interval": interval
        },
        success: handleCounterUpdate,
        error: errorRequestingData
    });
}

function errorRequestingData(requestObject, textStatus, errorThrown) {
    console.log("Error receiving results..." + textStatus + ":" + errorThrown);
}

function handleCounterUpdate(data) {
    var counterValue = data.counter;
    document.getElementById("CounterDisplay").innerHTML = counterValue.toString();
    document.getElementById("UpdateDisplay").innerHTML = "Counter updated from: " + counter.getValue() + " to: " +counterValue;
    counter.setValue(counterValue);
    
}
