const express = require('express');
const router = express.Router();
const Notification = require('../../models/Notification');

router.get('/',(req,res)=>{
    Notification.find().then(Notifications =>res.json(Notifications));
});
router.get('/nbrnotif',(req,res)=>{
    Notification.find({Cheked : false}).count().then(Notifications =>{
        res.json(Notifications)
        
    });
});
router.get('/UnchekedNotif/:id',(req,res)=>{
    Notification.find({Cheked : false ,idUser :req.params.id} ).then(Notifications =>res.json(Notifications));
});

router.get('/SuccessNotif',(req,res)=>{
    Notification.find({Cheked : false,type:"Success"}).then(Notifications =>res.json(Notifications));
});

router.get('/WarningNotif',(req,res)=>{
    Notification.find({Cheked : false,type:"Warning"}).then(Notifications =>res.json(Notifications));
});
router.get('/InfoNotif',(req,res)=>{
    Notification.find({Cheked : false,type:"Info"}).then(Notifications =>res.json(Notifications));
});

router.get('/DangerNotif',(req,res)=>{
    Notification.find({Cheked : false,type:"Danger"}).then(Notifications =>res.json(Notifications));
});



router.post('/',(req,res)=>{
const newNotification = new Notification({
    name : req.body.name,
    type :req.body.type ,
    idUser : req.body.idUser

}); 
    newNotification.save().then(notification=>res.json(notification));
  
});
router.delete('/:id', (req, res) => {
    Notification.findById(req.params.id)
      .then(notification => notification.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  
  });

   

module.exports = router;