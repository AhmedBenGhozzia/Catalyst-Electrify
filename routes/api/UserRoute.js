const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

function createToken(user) {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email
        },
        config.get('jwtSecret'),
        {
            expiresIn: '365d'
        }
    );
}

router.get('/', auth, (req, res) => {
    console.log(req.user.id)
    User.findById(req.user.id).exec((err, user) => {
        if (err)
            res.status(400).send(err)
        else if (!user)
            res.status(404).send("no user found")
        else
            res.status(200).send(user)
    })
});

// router.get('/', auth, (req, res, next) => {
//     const username = req.query.username;
//     const id = req.query.id;
//     const email = req.query.email;
//     console.log(req.user)
//     if (id != null) {
//         User.findById(id).exec((err, user) => {
//             if (err)
//                 res.status(400).send(err)
//             else if (!user)
//                 res.status(404).send("no user found")
//             else
//                 res.status(200).send(user)
//         })
//     } else if (username != null) {
//         User.findOne({ username: username }).exec((err, user) => {
//             if (err)
//                 res.status(400).send(err)
//             else if (!user)
//                 res.status(404).send("no user found")
//             else
//                 res.status(200).send(user)
//         })
//     } else if (email != null) {
//         User.findOne({ email: email }).exec((err, user) => {
//             if (err)
//                 res.status(400).send(err)
//             else if (!user)
//                 res.status(404).send('no user found')
//             else
//                 res.status(200).send(user)
//         })
//     } else {
//         User.find((err, users) => {
//             if (err)
//                 res.status(400).send(err)
//             else if (!users)
//                 res.status(404).send("no user found")
//             else
//                 res.status(200).send(users)
//         })
//     }
// });


router.post('/', (req, res, next) => {
    var Role;
    if (req.body.isAdmin) {
        Role = "ROLE_ADMIN"
    } else {
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
            res.status(201).send({
                token: createToken(user),
                user
            })
    })
});

router.put('/', (req, res, next) => {

})

router.delete('/', auth, (req, res, next) => {
    const username = req.query.username;
    const id = req.query.id;
    const email = req.query.email;
    if (id != null) {
        User.findByIdAndDelete(id).exec((err, user) => {
            if (err)
                res.status(400).send(err)
            else if (!user)
                res.status(404).send("no user found")
            else
                res.status(200).send(user)
        })
    } else if (username != null) {
        User.findOneAndDelete({ username: username }).exec((err, user) => {
            if (err)
                res.status(400).send(err)
            else if (!user)
                res.status(404).send("no user found")
            else
                res.status(200).send(user)
        })
    } else if (email != null) {
        User.findOneAndDelete({ email: email }).exec((err, user) => {
            if (err)
                res.status(400).send(err)
            else if (!user)
                res.status(404).send("no user found")
            else
                res.status(200).send(user)
        })
    } else {
        res.status(400)
    }
})

router.post('/login', (req, res, next) => {
    const { username, email, password } = req.body;
    if (!password) {
        res.status(400).send("need to enter a password")
    } else if (email) {
        User.findOne({ email }).select("+password").exec((err, user) => {
            if (err) {
                res.status(400).send(err)
            } if (!user) {
                res.status(404).send("no user found")
            } else {
                if (!user.comparePassword(password)) {
                    res.status(401).send("wrong password")
                } else {
                    res.status(200).send({
                        token: createToken(user),
                        user
                    })
                }
            }
        })
    } else if (username) {
        User.findOne({ username }).select('+password').exec((err, user) => {
            if (err) {
                res.status(400).send(err)
            } if (!user) {
                res.status(404).send("no user found")
            } else {
                if (!user.comparePassword(password)) {
                    res.status(401).send("wrong password")
                } else {
                    res.status(200).send({
                        token: createToken(user),
                        user
                    })
                }
            }
        })
    } else {
        res.status(400).send("need to enter a username or an email")
    }

})

module.exports = router;