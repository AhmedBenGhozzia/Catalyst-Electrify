var express = require('express');
var router = express.Router();
var fs = require('fs');
const tf = require('@tensorflow/tfjs')
var content = fs.readFileSync('myjsonfile.json');
var weather = JSON.parse(content);
var content1 = fs.readFileSync('predict.json');
var predictData = JSON.parse(content1);
const DataNotification = require('../../models/DataNotification');
var obj =[];

router.get('/test',(req,res)=>{
  DataNotification.find(function(err, data){
    if(err){            
        console.log(err);
    }
    obj= data;
    var json = 
    res.json(data);
    fs.writeFile('myjsonfile.json', JSON.stringify(obj), 'utf8');


})   


});
const trainData = tf.tensor2d(weather.map(item => [
  item.Consomation,
  item.Production

]))

const outputData = tf.tensor2d(weather.map(item => [
  item.Vente
]))

const testingData = tf.tensor2d(predictData.map(item => [
  item.Consomation,
  item.Production
]))

const model = tf.sequential()

model.add(tf.layers.dense({
  inputShape: [2],
  activation: "linear",
  units: 6
}))

model.add(tf.layers.dense({
  inputShape: [6],
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

model.fit(trainData, outputData, {epochs: 100,shuffle:true}).then((history) => console.log(history))
const data = tf.tensor([1,2,3,4]);

router.get('/predict',function (req, res, next){

data.print();


  res.send(model.predict(testingData).dataSync())
})

module.exports = router;
