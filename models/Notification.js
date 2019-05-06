const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NotificationSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    enum : ['Warning', 'Success','Danger','Info'],

  },
  Cheked: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  idUser: {
    type: String,
  }
});

module.exports = notification = mongoose.model('Notification', NotificationSchema);
