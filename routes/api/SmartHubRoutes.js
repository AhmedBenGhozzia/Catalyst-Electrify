const express = require('express');
const router = express.Router();
const SmartHub = require('../../models/smartHub');
const userDB = require('../../models/user');
var loop = require('../../loop');

router.get('/',(req,res)=>{
    SmartHub.find().then(smartHubs =>res.json(smartHubs));
});

router.get('/delete/:serial',function (req,res) {
    var serial = req.params.serial;
  
    SmartHub.find({serialNumber:serial}).remove().then(smartHubs => res.json(smartHubs));
});

router.post('/add',(req,res)=>{
const newSmartHub = new SmartHub({
    username : req.body.username,
    password :req.body.password ,
    serialNumber :req.body.serialNumber ,
    email : req.body.email,
    User : req.body.User
});
    if (req.body.User== null) {
        newSmartHub.save().then(SmartHub=>res.json(SmartHub));
    }else
    userDB.findById(req.body.User, function(err,doc) {
        doc.SmartHubs.push(newSmartHub);
        doc.save();
    });
    newSmartHub.save().then(SmartHub=>res.json(SmartHub));

});

router.post('/edit/:serial',(req,res)=>{
    var serial = req.params.serial;
    SmartHub.findOne({serialNumber:serial},function(err,doc) {
        if(req.body.username==null && req.body.email==null && req.body.smartHubs== null) {
            doc.last_update = Date(Date.now());
            doc.save();
            return res.status(302).json(doc);
        }
        else
            doc.smartHubs= req.body.smartHubs;
            doc.username = req.body.username;
            doc.email = req.body.email;
            doc.last_update = Date(Date.now());
            doc.save();
            return res.status(302).json(doc);
    })
});

router.get('/getBySerial/:serial',(req,res)=>{
    var serial = req.params.serial;
    SmartHub.findOne({serialNumber:serial},function(err,doc) {
        if(doc != null) {
            return res.status(302).json(doc);
        }
        else
            
            return res.status(302).json(doc);
    })
});


module.exports = router;