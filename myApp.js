var express = require('express');
var bodyParser = require("body-parser")
var app = express();

console.log("Hello World");

// Body parser
app.use(bodyParser.urlencoded({extended: false}));

// Query string mounting
app.get("/name", (req, res) => {
    res.send({ name: req.query.first + " " + req.query.last })
})

// Echo server
app.get("/:word/echo", (req, res) => {
    res.send({ echo: req.params.word })
})


// Get time data
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({ time: req.time })
})

// Logger
app.use("/", (req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next()
})

app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/json", (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({ "message": message.toUpperCase()});
    } else {
        res.json({ "message": message });
    }
})
































 module.exports = app;
