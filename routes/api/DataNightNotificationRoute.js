const express = require('express');
const router = express.Router();

const DataNightNotifications = require('../../models/DataNightNotifications');


router.get('/',(req,res)=>{
    DataNightNotifications.find().then(DataNightNotifications =>res.json(DataNightNotifications));
});

router.get('/:date',(req,res)=>{
    DataNightNotifications.find({Vente:true,date:req.params.date}).count().then(DataNightNotifications =>res.json(DataNightNotifications));
});



router.post('/',(req,res)=>{
const newDataNotification= new DataNightNotifications({
    Consomation : req.body.Consomation,
    Production :req.body.Production ,
    Vente : req.body.Vente,
    Prix : req.body.Prix,
    idUser : req.body.idUser,
    date:req.body.date

}); 
newDataNotification.save().then(DataNightNotifications=>res.json(DataNightNotifications));
  
});
router.delete('/:id', (req, res) => {
    DataNightNotifications.findById(req.params.id)
      .then(DataNightNotifications => DataNightNotifications.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  
  });

module.exports = router;