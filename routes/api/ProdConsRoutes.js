const express = require('express');
const router = express.Router();
const SmartHub = require('../../models/smartHub');
const ProdCons = require('../../models/ProdCons');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var mongoose = require('mongoose');

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function generateRandomNumber() {
    var min = 0.200,
        max = 0.720,
        highlightedNumber = Math.random() * (max - min) + min;

    return highlightedNumber;
};

var key="94f016c0b9a0ce07785c0bb7d52563a0";
var keyPvWatts="TU9n4R5BVyHYH19hmncLVE6HXIXYR5PYAqXzjBoo";
var json_obj_C = JSON.parse(Get("https://ipapi.co/json"));
var json_obj = JSON.parse(Get("http://api.openweathermap.org/data/2.5/weather?q="+json_obj_C.city+"&APPID="+key+"&units=metric"));
var json_pvwatts = JSON.parse(Get("https://developer.nrel.gov/api/pvwatts/v6.json?api_key="+keyPvWatts+"&lat="+Math.trunc(json_obj.coord.lat)+"&lon="+Math.trunc(json_obj.coord.lon)+"&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10&dataset=intl"));
var x= (((json_pvwatts.outputs.ac_annual)/365)/24);


router.get('/',(req,res)=>{
    ProdCons.find().then(ProdConss =>res.json(ProdConss));
});

router.post('/add',(req,res)=>{
    const newProdCons = new ProdCons({
        Prod_hourly: x,
        Prod_annual: x*365,
        Cons_hourly: generateRandomNumber(),
        Cons_annual: generateRandomNumber()*365,
        SmartHub: req.body.SmartHub
    });

    newProdCons.save().then(ProdCons=>res.json(ProdCons));
    SmartHub.findById(req.body.SmartHub, function(err,doc) {
            doc.ProdCons.push(mongoose.Types.ObjectId(newProdCons._id));
            console.log(newProdCons._id);
            doc.save();
        });
        
    
    });





module.exports = router;