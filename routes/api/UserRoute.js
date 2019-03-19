const express = require('express');
const router = express.Router();


const User = require('../../models/user');


router.get('/',(req,res)=>{
User.find().then(users =>res.json(users));
});


router.post('/',(req,res)=>{
const newuser = new User({
    email : req.body.email,
    password :req.body.password ,
    Role : req.body.Role});
    newuser.save().then(user=>res.json(user));

});

module.exports = router;