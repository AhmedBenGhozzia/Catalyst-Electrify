var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var keyPvWatts="TU9n4R5BVyHYH19hmncLVE6HXIXYR5PYAqXzjBoo";


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


//var json_obj_C = JSON.parse(Get("https://ipapi.co/json"));
//var json_pvwatts = JSON.parse(Get("https://developer.nrel.gov/api/pvwatts/v6.json?api_key="+keyPvWatts+"&lat="+Math.trunc(json_obj_C.coord.lat)+"&lon="+Math.trunc(json_obj_C.coord.lon)+"&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10&dataset=intl"));


const ProdConsSchema = mongoose.Schema({
    Prod_hourly: {
        type: String
        
    },
    Prod_annual: {
        type: String
        
    },
    Cons_hourly: {
        type: String
        
    },
    Cons_annual: {
        type: String
        
    },

    date: {
        type: String,
        default: Date(Date.now())
       
    },
    
    SmartHub : {
        type : Schema.Types.ObjectId,
        ref : 'smartHub',
        required:true,
        default : null
    }
    

});

var prodCons = mongoose.model('ProdCons',ProdConsSchema)


module.exports = prodCons;