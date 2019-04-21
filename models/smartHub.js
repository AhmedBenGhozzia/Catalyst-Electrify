var mongoose = require('mongoose');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var uniqueValidator = require('mongoose-unique-validator');

var json_obj_C = JSON.parse(Get("https://ipapi.co/json"));

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

const smartHubSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    serialNumber: {
        type: Number,
        required: true,
        unique: true
    },

    maintenance_status: {
        type: String,
        enum: ['Bad','Good'],
        default: 'Good',
        required: true
    },

    last_update: {
        type: String,
        default: Date(Date.now())
       
    },

    ip_addr: {
        type: String,
        default: json_obj_C.ip,
        required:true
       
    },

    country: {
        type: String,
        default: json_obj_C.country_name,
        required:true
    },

    User: {
        type : mongoose.Schema.ObjectId,
        ref :'User',
        default: null
    },

    ProdCons: [{
        type : String,
        ref :'ProdCons',
        default: null
    }]

});

var smartHub = mongoose.model('smartHub',smartHubSchema)
smartHubSchema.plugin(uniqueValidator);

module.exports = smartHub;