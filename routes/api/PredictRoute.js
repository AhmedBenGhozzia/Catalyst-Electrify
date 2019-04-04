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
    item.Month,
    item.Day,
    item.Hour,
    item.temperature,
    item.cellTemperature,
    item.windSpeed
]))

const outputData = tf.tensor2d(weather.map(item => [
    item.energy
]))

const testingData = tf.tensor2d(predictData.map(item => [
    item.Month,
    item.Day,
    item.Hour,
    item.temperature,
    item.cellTemperature,
    item.windSpeed
]))

const model = tf.sequential()

model.add(tf.layers.dense({
    inputShape: [6],
    activation: "sigmoid",
    units: 64
}))

model.add(tf.layers.dense({
    inputShape: [64],
    activation: "sigmoid",
    units: 64
}))

model.add(tf.layers.dense({
    inputShape: [64],
    activation: "tanh",
    units: 64
}))


model.add(tf.layers.dense({
    activation: "relu",
    units: 1
}))

model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(.06),
})

model.fit(trainData, outputData, { epochs: 100}).then((history) => console.log(history))

router.get('/', function (req, res, next) {
    res.send(model.predict(testingData).dataSync())
})

module.exports = router;
