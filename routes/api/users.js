const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

router.post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // if (!email || !password || !name) return res.status(400).json({ msg: "please enter all fields" });

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "User already exists" });

            const newUser = new User({
                firstName,
                lastName,
                email,
                password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                (err, token) => {
                                    if (err) throw err;
                                    console.log("sign up token error====>", err)
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            email: user.email
                                        }
                                    })

                                }
                            )

                        }).catch(err => console.log(err))
                })
            })
        })
})


router.put('/reset/:token', (req, res) => {
    const { temp_token} = req.body;
    jwt.verify(temp_token, config.get('jwtSecret'), (err, decoded) => {
        try {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password , salt, async (err, hash) => {
                    req.body.password = hash
                    await User.findOneAndUpdate({ _id: decoded.id }, { password: hash }) 
                    res.status(200).json(true);  
                });    
            });   
        }
        catch (err) {
            console.log("reset password error", err)
        }
    })
})

module.exports = router;