const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/apodselect.html")
})

var jsonData = {}

app.post("/",(req,res)=>{
    var date = req.body.date;
    var key = "sYGj19yNQucjY7EuUJ3hvIj6TVzngq6p62rDWHYC"
    var url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            jsonData = JSON.parse(data);
            const htmlresponse = `<div style="display:flex; flex-direction:row;align-items:center; justify-content:center;"><img src = "${jsonData.hdurl}" alt="image" height="400px" width="400px">
            <p>${jsonData.explanation}</p></div>`
            res.send(htmlresponse)
        })
    })
})

app.listen(port,function(){
    console.log("server started at port 3000 ")
})