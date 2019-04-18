const express = require('express');
const router = express.Router();

const DataNotification = require('../../models/DataNotification');


router.get('/',(req,res)=>{
    DataNotification.find().then(DataNotifications =>res.json(DataNotifications));
});




router.post('/',(req,res)=>{
const newDataNotification= new DataNotification({
    Consomation : req.body.Consomation,
    Production :req.body.Production ,
    Vente : req.body.Vente

}); 
newDataNotification.save().then(DataNotification=>res.json(DataNotification));
  
});
router.delete('/:id', (req, res) => {
    DataNotification.findById(req.params.id)
      .then(DataNotification => DataNotification.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  
  });

module.exports = router;