const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '7508b051f08a2762798a62eb47d9676d';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let city = `${weather.name},${weather.sys.country}`;
        let des =  `${weather.weather[0].main+' : '+weather.weather[0].description}`;
        let weatherText = `${weather.main.temp}`;
        let weatherText2 = `${weather.main.pressure}`;
        let wea3 = `${weather.main.humidity}`;
        let wea4 = `${weather.main.temp_min}`;
        let wea5 = `${weather.main.temp_max}`;
        let wea6 =  `The wind speed is ${weather.wind.speed} and direction is ${weather.wind.deg}`
        let wea7 = `${weather.clouds.all}`;
        res.render('index', {weather: weatherText, error: null, weather2: weatherText2,wea3: wea3,wea4: wea4,wea5: wea5,wea6: wea6,city: city,wea7: wea7,des});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('App Running on port 3000!')
})
