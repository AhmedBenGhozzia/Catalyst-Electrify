var express = require('express');
var router = express.Router();

var fs = require('fs');

const tf = require('@tensorflow/tfjs')
require('@tensorflow/tfjs-node')
var content = fs.readFileSync('./data/pvData.json')
var weather = JSON.parse(content);
var content1 = fs.readFileSync('data/predict.json');
var predictData = JSON.parse(content1);

const trainData = tf.tensor2d(weather.map(item => [
  [
    item.Hour,
    item.Month,
    item.Day,
    item.Year
  ],[
    item["Cloud Coverage"],
    item.Visibility,
    item.Temperature,
    item["Dew Point"],
    item["Wind Speed"]
  ]
]))

console.log(trainData)

const outputData = tf.tensor2d(weather.map(item => [
    item.Energy
]))

const testingData = tf.tensor2d(predictData.map(item => [
    item["Cloud Coverage"],
    item.Visibility,
    item.Temperature,
    item["Dew Point"],
    item["Wind Speed"]
]))

const model = tf.sequential()

model.add(tf.layers.dense({
    inputShape: [5],
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

model.fit(trainData, outputData, { epochs: 100, shuffle: true}).then((history) => console.log(history))

router.get('/', function (req, res, next) {
    res.send(model.predict(testingData).dataSync())
})

module.exports = router;
