const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

  const city = req.body.cityName;
  const apiKey = "03068bbf7e0373f0bd59a4274649eff8";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(res2){
      console.log(res2.statusCode);

      res2.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write("<h1>The temperature in " + city + " is " + temp + "F.</h1><br>")
        res.write("The weather is currently " + description + ".<br>")
        res.write("<img src = " + imageURL + ">")
        res.send();
      })
  })
})

app.listen(3003, function(){
  console.log("Server is running on port 3003");
})
