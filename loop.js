var http = require('http');
var request = require('request');
const smarthub= require('../Catalyst-Electrify/models/smartHub');


  
var requestLoop = setInterval(function(){
    var l;
    request('http://localhost:5000/api/smarthub', { json: true, async: false }, (err, res, body) => {
        if (err) { return console.log(err); }
         l=body.length;
         var i;
    for (i=1; i<l+1 ; i++) {
    request({
        url: "http://localhost:5000/api/smarthub/getBySerial/"+i,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        json:true,
        headers: {
            'Content-Type' : 'application/json'
        }
    },function(error, response, body){
        if(!error){
            request({
                    url: "http://localhost:5000/api/ProdCons/add",
                    method: "POST",
                    timeout: 10000,
                    followRedirect: true,
                    maxRedirects: 10,
                    json:true,
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: { 
                        SmartHub : body._id
                    }
            });
            console.log(body._id); 
        }else{
            console.log('error' + response.statusCode);
        }
    });
}
      });
      
    
  }, 3600000);
  
