var express = require('express');
var router = express.Router();

var fs = require('fs');

const tf = require('@tensorflow/tfjs')
require('@tensorflow/tfjs-node')
var content = fs.readFileSync('./data/pvData2.json')
var weather = JSON.parse(content);
var content1 = fs.readFileSync('data/predict.json');
var predictData = JSON.parse(content1);

var ForecastIo = require('forecastio');
var forecastIo = new ForecastIo('8ec0a32442842aca915a87d885b44e83');

const trainData = tf.tensor2d(weather.map(item => [
  item.Hour,
  item["Cloud Coverage"],
  item.Visibility,
  item.Temperature,
  item["Dew Point"],
  item["Wind Speed"]
]))

console.log(trainData)

const outputData = tf.tensor2d(weather.map(item => [
  item.Energy
]))

const testingData = tf.tensor2d(predictData.map(item => [
  item.Hour,
  item["Cloud Coverage"],
  item.Visibility,
  item.Temperature,
  item["Dew Point"],
  item["Wind Speed"]
]))

const model = tf.sequential()

model.add(tf.layers.dense({
  inputShape: [6],
  activation: "linear",
  units: 64
}))

model.add(tf.layers.dense({
  inputShape: [64],
  activation: "linear",
  units: 1
}))


model.add(tf.layers.dense({
  activation: "linear",
  units: 1
}))
model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.adam(.06),
})

model.fit(trainData, outputData, { epochs: 10, shuffle: true }).then((history) => console.log(history))

router.get('/', function (req, res, next) {
  var options = {
    units: 'si',
    extend: 'hourly',
    exclude: 'minutely,daily,flags'
  };
  forecastIo.forecast('36.869241', '10.343235', options).then(function (data) {
    data.hourly.data.forEach(element => {
      delete element.summary
      delete element.icon
      delete element.precipIntensity
      delete element.precipProbability
      delete element.apparentTemperature
      delete element.pressure
      delete element.windGust
      delete element.windBearing
      delete element.uvIndex
      delete element.ozone
      element.Date = new Date(element.time * 1000)
      element.Hour = new Date(element.time * 1000).getHours()
      element.Day = new Date(element.time * 1000).getDay()
      element.Month = new Date(element.time * 1000).getMonth()
      element.Year = new Date(element.time * 1000).getFullYear()
      delete element.time
      element["Cloud Coverage"] = element.cloudCover
      element["Visibility"] = element.visibility
      element["Wind Speed"] = element.windSpeed
      element["Dew Point"] = element.dewPoint
      element["Temperature"] = element.temperature
      delete element.cloudCover
      delete element.visibility
      delete element.windSpeed
      delete element.dewPoint
      delete element.temperature
      delete element.humidity
      delete element.precipType
    });
    const testingData = tf.tensor2d(data.hourly.data.map(item => [
      item.Hour,
      item["Cloud Coverage"],
      item.Visibility,
      item.Temperature,
      item["Dew Point"],
      item["Wind Speed"]
    ]))
    var energy = model.predict(testingData).dataSync()
    data.hourly.data.forEach((element, index) => {
       if(element.Hour<=6 || element.Hour>= 17)
         element.Energy =  0
       else
      element.Energy = energy[index]
    });
    res.send(data.hourly.data)
    next()
  }).error(function (err) {
    res.send(err)
    next()
  });
  //res.send(model.predict(testingData).dataSync())
})

module.exports = router;
