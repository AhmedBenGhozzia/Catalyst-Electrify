const express = require('express');
const router = express.Router();


const User = require('../../models/user');


router.get('/', (req, res, next) => {
    const username = req.query.username;
    const id = req.query.id;
    const email = req.query.email;
    if (id != null){
        User.findById(id).exec((err, user) => {
            if (err)
                res.status(400).send(err)
            else if (!user)
                res.status(404)
            else
                res.status(200).send(user)
        })
    } else if (username != null) {
        User.findOne({ username: username }).exec((err, user) => {
            if (err)
                res.status(400).send(err)
            else if (!user)
                res.status(404)
            else
                res.status(200).send(user)
        })
    } else if (email != null){
        User.findOne({ email: email }).exec((err, user) => {
            if (err)
                res.status(400).send(err)
            else if (!user)
                res.status(404)
            else
                res.status(200).send(user)
        })
    } else {
        User.find((err, users) => {
            if (err)
                res.status(400).send(err)
            else if (!users)
                res.status(404)
            else
                res.status(200).send(users)
        })
    }
});


router.post('/', (req, res, next) => {
    var Role;
    if(req.body.isAdmin){
        Role = "ROLE_ADMIN" 
    }else{
        Role = "ROLE_USER"
    }
    const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        Role: Role
    });
    newuser.save((err, user) => {
        if (err)
            res.status(400).send(err)
        else
            res.status(201).send(user)
    })
});

router.put('/', (req, res, next) => {

})

router.delete('/', (req, res, next) => {
    const username = req.query.username;
    const id = req.query.id;
    const email = req.query.email;
    if (id != null){
        User.findByIdAndDelete(id).exec((err, user) => {
            if (err)
                res.status(400).send(err)
            else if (!user)
                res.status(404)
            else
                res.status(200).send(user)
        })
    } else if (username != null) {
        User.findOneAndDelete({ username: username }).exec((err, user) => {
            if (err)
                res.status(400).send(err)
            else if (!user)
                res.status(404)
            else
                res.status(200).send(user)
        })
    } else if (email != null){
        User.findOneAndDelete({ email: email }).exec((err, user) => {
            if (err)
                res.status(400).send(err)
            else if (!user)
                res.status(404)
            else
                res.status(200).send(user)
        })
    } else {
        res.status(400)
    }
})

module.exports = router;