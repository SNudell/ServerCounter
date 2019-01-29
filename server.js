var express = require("express");
var app = express();
var serverCounter = require("./serverCounter.js");

//var THIS_URL = "192.168.2.101";
var THIS_URL = "127.0.0.1";

var PORT = 4040;

app.use("/", express.static("public_html"));
var server = app.listen(PORT,THIS_URL);
//var server = app.listen(PORT);
app.get("/fetch", serverCounter.handleCounterEvent);

console.log("Serving full web app from "+THIS_URL+":"+PORT+"/");
