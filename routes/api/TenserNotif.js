var express = require('express');
var router = express.Router();
var fs = require('fs');
const tf = require('@tensorflow/tfjs')
var content = fs.readFileSync('weather.json');
var weather = JSON.parse(content);
var content1 = fs.readFileSync('predict.json');
var predictData = JSON.parse(content1);


const trainData = tf.tensor2d(weather.map(item => [
  item.energy,
  item.consomation

]))

const outputData = tf.tensor2d(weather.map(item => [
  item.vente
]))

const testingData = tf.tensor2d(predictData.map(item => [
  item.energy,
  item.consomation
]))

const model = tf.sequential()

model.add(tf.layers.dense({
  inputShape: [2],
  activation: "sigmoid",
  units: 4
}))

model.add(tf.layers.dense({
  inputShape: [4],
  activation: "sigmoid",
  units: 1
})) 


model.add(tf.layers.dense({
  activation: "sigmoid",
  units: 1
}))

model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.adam(.06),
})

model.fit(trainData, outputData, {epochs: 500,shuffle:true}).then((history) => console.log(history))
const data = tf.tensor([1,2,3,4]);

router.get('/predict',function (req, res, next){

data.print();


  res.send(model.predict(testingData).dataSync())
})

module.exports = router;
