const express = require('express');
const router = express.Router();
var dateFormat = require('dateformat');
const axios = require('axios');

const DataNotification = require('../../models/DataNotification');


router.get('/',(req,res)=>{
    DataNotification.find().then(DataNotifications =>res.json(DataNotifications));
});

router.get('/vente',(req,res)=>{
    DataNotification.find({Vente:true}).count().then(DataNotifications =>res.json(DataNotifications));
});

router.get('/test',(req,res)=>{
    DataNotification.find()
    .then(function(data){
      
        obj= data
  var obj2=[];
  var obj3;
  var resultList =[];
        obj.forEach( function(data){  
            var date =dateFormat(data.date,"mmm d, yyyy") ; 
     
      
            obj2.push(date);


 
            

        });
         obj3= [...new Set(obj2)];
         obj3.forEach (function(d){
            var result = {label:d,y:Math.floor(Math.random() * 20)};


resultList.push(result);
         })  



            res.json(resultList);
      
         

  
    });
});

router.get('/test2',(req,res)=>{
    DataNotification.find()
    .then(function(data){
      
        obj= data
  var obj2=[];
  var obj3;
  var resultList =[];
        obj.forEach( function(data){  
            var date =dateFormat(data.date,"mmm d, yyyy") ; 
     
      
            obj2.push(date);


 
            

        });
         obj3= [...new Set(obj2)];
         obj3.forEach (function(d){
            var result = {label:d,y:Math.floor(Math.random() * 20)};


resultList.push(result);
         })  



            res.json(resultList);
      
         

  
    });
});



router.post('/',(req,res)=>{
const newDataNotification= new DataNotification({
    Consomation : req.body.Consomation,
    Production :req.body.Production ,
    Vente : req.body.Vente,
    Prix : req.body.Prix,
    idUser : req.body.idUser

}); 
newDataNotification.save().then(DataNotification=>res.json(DataNotification));
  
});
router.delete('/:id', (req, res) => {
    DataNotification.findById(req.params.id)
      .then(DataNotification => DataNotification.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  
  });

module.exports = router;