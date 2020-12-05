const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var city = req.body.city;
  const apiKey = "ef4f2fa5a7850d787060f854544c0722";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function (response) {
    response.on('data', function (data) {
      const weatherJson = JSON.parse(data);
      const temp = weatherJson.main.temp;
      const description = weatherJson.weather[0].description;
      const icon = weatherJson.weather[0].icon
      res.write("<p>The Weather description is: " + description + "</p>");
      res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius</h1>");
      res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png' alt=''>")
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
