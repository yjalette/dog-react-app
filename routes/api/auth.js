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
                        { id: user.id },
                        config.get('jwtSecret'),
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
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


// router.get('/user/logout', (req, res) => {
//     User.findByIdAndUpdate({id: req.user._id}, {token: ""}, (err, doc) => {
//       if(err) res.json({success: false, err})
//       return res.status(200).send({
//         success: true
//       })
//     })
//   })
 
module.exports = router;