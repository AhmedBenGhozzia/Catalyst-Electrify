const express = require('express');
const router = express.Router();
const Notification = require('../../models/Notification');
const webpush = require("web-push");

webpush.setGCMAPIKey('AIzaSyAGfpwvQobaxCze8RNXJifWc0X8c4DcOpE')
webpush.setVapidDetails(
  "mailto:your-email-address@example-domain.com",
 'BCGHIiUXAsBKkgA-gB00F5WdCyNCY22HaKV9S9XXDQIfS7pIzCkZbuIMeAuLzBqd9HlRrobhYQaARa-FI6pNGT4',
 'ifdpvK8JjK1XrJAIupU12iRx3WnIBCxP06CjTswKJcQ'
)

const testData = {
    title: "Testing",
    body: "It's a success!",
    icon: "/path/to/an/icon.png"
  }
  
  let subscription
  let pushIntervalID
  
  router.post("/register", (req, res, next) => {
    subscription = req.body
    console.log(subscription)
    res.sendStatus(201)
    pushIntervalID = 
      // sendNotification can only take a string as it's second parameter
      webpush.sendNotification(subscription, JSON.stringify(testData))
        .catch(() => clearInterval(pushIntervalID))
   
  })
  
  router.delete("/unregister", (req, res, next) => {
    subscription = null
    clearInterval(pushIntervalID)
    res.sendStatus(200)})

module.exports = router;