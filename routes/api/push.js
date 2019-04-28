const express = require('express');
const router = express.Router();
const Notification = require('../../models/Notification');
const webpush = require("web-push");
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'habib.daou@esprit.tn',
    clientId:  '959013136746-41fnr0al43pcu3gospglo6ohr0qenmcu.apps.googleusercontent.com',
    clientSecret: '_bcShCQ2NIKRuNRSLdgU0Vi1',
    refreshToken: '1/PMGkb0nF07E1TgAli-Zr5knss4dLlhlBtZz1UdF7w3U',
    accessToken:'ya29.Glv5Bhi_pkyL2BVavuLPqIqW3oNmcXfuHiCaQJcXT4pzdQ5UGFXPZnWRfwjAfz0YOiODZoiugZfUkyzDzAyHYCntVTeE9fFHetDgl_ZDVG4DZzzxMDlWz_SvzRT2',
  },
});
var mailOptions = {
    from: 'Haboub <habib.daou@esprit.tn>',
    to: 'nolivetg@gmail.com',
    subject: 'Nodemailer test',
    text: 'Hello World!!'
}
var mailOptions2 = {
  from: 'Electrify <habib.daou@esprit.tn>',
  to: 'nolivetg@gmail.com',
  subject: 'Electrify',
  text: 'Thank you for using our application you accepted to sell Energy!'
}


webpush.setGCMAPIKey('AIzaSyAGfpwvQobaxCze8RNXJifWc0X8c4DcOpE');
webpush.setVapidDetails(
  "mailto:your-email-address@example-domain.com",
 'BCGHIiUXAsBKkgA-gB00F5WdCyNCY22HaKV9S9XXDQIfS7pIzCkZbuIMeAuLzBqd9HlRrobhYQaARa-FI6pNGT4',
 'ifdpvK8JjK1XrJAIupU12iRx3WnIBCxP06CjTswKJcQ'
);

const testData = {
  title: "Testing",
  body: "It's a success!",
}

let subscription
let pushIntervalID

router.post("/register", (req, res, next) => {
  const subscription ={
    "endpoint":"http://localhost:3000/notifications",
    "keys": {
      "p256dh": "BCGHIiUXAsBKkgA-gB00F5WdCyNCY22HaKV9S9XXDQIfS7pIzCkZbuIMeAuLzBqd9HlRrobhYQaARa-FI6pNGT4",
      "auth": "ifdpvK8JjK1XrJAIupU12iRx3WnIBCxP06CjTswKJcQ"}
    };
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'test' });

  console.log(subscription);

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack); });
  });

router.delete("/unregister", (req, res, next) => {
  subscription = null
  clearInterval(pushIntervalID)
  res.sendStatus(200)
})


router.get('/test', (req, res) => {
  transporter.sendMail(mailOptions, function (err, res) {
    if(err){
    console.log(res);
      console.log('Error');
    } else {
    
        console.log('Email Sent');
    }
})

});

router.get('/MailSell', (req, res) => {
  transporter.sendMail(mailOptions2, function (err, res) {
    if(err){
    console.log(res);
      console.log('Error');
    } else {
    
        console.log('Email Sent');
    }
})

});




module.exports = router;