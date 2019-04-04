const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NotificationSchema = new Schema({
  Content: {
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
  }
});

module.exports = notification = mongoose.model('Notification', NotificationSchema);
