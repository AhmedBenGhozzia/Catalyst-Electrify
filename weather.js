var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
//var area = 1.588*1.046;
//var E= (area*((((json_obj.main.pressure*json_obj.main.temp*json_obj.wind.speed*1.5)/100)/area)/10)*200*0.75)/365;
var json_pvwatts = JSON.parse(Get("https://developer.nrel.gov/api/pvwatts/v6.json?api_key="+keyPvWatts+"&lat="+Math.trunc(json_obj.coord.lat)+"&lon="+Math.trunc(json_obj.coord.lon)+"&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=1&losses=10&dataset=intl"));
//console.log(json_obj_C);
//console.log(json_obj);

var x= (((json_pvwatts.outputs.ac_annual)/365)/24);
console.log(generateRandomNumber());
console.log("This smartHub's coordinates are ; lon:" + json_obj.coord.lon +" lat:"+ json_obj.coord.lat + " located in :" +json_obj_C.country_name);
console.log("Your energy production for this hour is :" + x + " kWh"+" and your consumption for the past hour is :" + generateRandomNumber());

