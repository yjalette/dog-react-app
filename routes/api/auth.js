const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

const User = require('../../models/User');

router.post('/', (req, res) => {
    const { email, password } = req.body;
    // if (!email || !password ) return res.status(400).json({ msg: "please enter all fields" });
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User doesn't exist" });
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })
                    jwt.sign(
                        { id: user.id,
                          exp: Math.floor(Date.now() / 1000) + (60 * 60)   
                        },
                        config.get('jwtSecret'),
                        (err, token) => {
                            if (err) throw err;
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
                })

        })
})

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password') //disregard the password
    .then(user => res.json(user));
})




module.exports = router;