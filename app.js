const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
var query;
var icon;
var temp;
var dis;
var imageURL;
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.get("/we",function(req,res){
    res.render("index.ejs",{city:query,temp:temp,dis:dis,imag:imageURL});
});
app.post("/",function(req,res){
   
     query =req.body.cityName;
    
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=32ca7f1be27a6d185e5b23687330de25&units=metric";
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
             icon=weatherData.weather[0].icon;
             temp=weatherData.main.temp;
             dis=weatherData.weather[0].description;
             imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.redirect("/we");
        });
    });
})
app.listen(3000,function(){
    console.log("server is Running");
});