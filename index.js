const express = require('express')
const cors = require('cors')
const app = express()
const worker = require("./model")
const port = 3000
app.use(cors())
app.use(express.json())

var path = require('path');
var filename = path.basename
var public = require('path').join(__dirname,'/html')


/*
app.use(express.static(public))
const { request } = require('express')
*/


app.get('/', (req, res)=>{
    //res.send('Hello world from Express Framework')
    res.sendFile(__dirname + "/html/main.html")
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
    res.sendFile(__dirname + "/html/404.jpg")
})
app.listen(port, ()=>{
    console.log("Start Server at Port [3000]")
})

const{MongoClient} = require("mongodb");
/*const uri = 'mongodb://localhost:27017/customercurd'*/
const uri = 'mongodb://myUserAdmin:myUserAdmin@localhost:27017';

app.post('/users/create', async(req, res)=>{
    const user = req.body;
    const client = new MongoClient(uri);
    
    await client.connect();
    await client.db("Ourdb").collection("users").insertOne({
        id: parseInt(user.id),
        fname: user.fname,
        lname: user.lname,
        username: user.username, 
        email: user.email,
        avatar: user.avatar
    });
    await client.close();
    res.status(200).send({
        "status":"ok",
        "message":"User with ID" + user.id + "is created",
        "user": user
    })
})