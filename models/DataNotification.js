const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DataNotificationSchema = new Schema({
  Consomation: {
    type: Number
  },
  Production: {
    type: Number

  },
 Vente: {
    type: Boolean,
    default: false
  }
  
});

module.exports = notification = mongoose.model('DataNotification', DataNotificationSchema);
