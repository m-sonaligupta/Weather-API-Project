const express = require("express");
const app = express();
const https = require("https");

app.get("/", function(req, res){
  const url = "https:api.openweathermap.org/data/2.5/weather?q=mumbai&appid=a01ccd7cda948c7f87b3c0f539388c72&units=metric&icon=10d#";
  https.get(url, function(response){
    console.log("Staus Code : " +response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      // const des = "The weather is currently " +weatherDescription +"."
      // res.send("<h1>The temprature in Mumbai is " +temp +"° celcius.</h1>" +des)
        res.write("<p>The weather is currently " +weatherDescription +".</p>")
        res.write("<h1>The temprature in Mumbai is " +temp +" degree celcius.</h1>")

        const icon = weatherData.weather[0].icon
        const imgURL = "http://openweathermap.org/img/wn/" +icon +"@2x.png"
        res.write("<img src=" +imgURL +">")
        res.send()
    })
  })
  // res.send("Output will be printed here .");
});

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
