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
  Prix: {
    type: Number

  },
 Vente: {
    type: Boolean,
    default: false
  },idUser: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = notification = mongoose.model('DataNotification', DataNotificationSchema);
