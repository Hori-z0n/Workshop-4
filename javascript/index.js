const { request } = require('express')
const express = require('express')
const app = express()
const worker = require("./model")
var path = require('path');
var filename = path.basename

app.get('/', (req, res)=>{
    res.send('Hello world from Express Framework')
})
app.get('/home',(req, res)=>{
    res.sendFile( __dirname + "/html/homepage.html")
})
app.get('/about', (req, res)=>{
    res.send('About Page')
})
app.get('/help', (req, res)=>{
    res.send(worker.Hello())
})
app.get('/File',function(req, res){
    res.sendFile( __dirname + "/html/about.html")
})
app.get('*', (req, res)=>{
    res.sendFile(__dirname + "/static/404.jpg", 1920, 1080)
})
app.listen(3000, ()=>{
    console.log("Start Server at Port [3000]")
})
