const express = require('express');
const router = express.Router();

const DataMorningNotification = require('../../models/DataMorningNotification');


router.get('/',(req,res)=>{
    DataMorningNotification.find().then(DataMorningNotification =>res.json(DataMorningNotification));
});




router.post('/',(req,res)=>{
const newDataNotification= new DataMorningNotification({
    Consomation : req.body.Consomation,
    Production :req.body.Production ,
    Vente : req.body.Vente,
    Prix : req.body.Prix,
    idUser : req.body.idUser

}); 
newDataNotification.save().then(DataMorningNotification=>res.json(DataMorningNotification));
  
});
router.delete('/:id', (req, res) => {
    DataMorningNotification.findById(req.params.id)
      .then(DataNotification => DataNotification.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  
  });

module.exports = router;