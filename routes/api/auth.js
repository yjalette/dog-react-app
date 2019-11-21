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
            console.log(user)
            if (!user) return res.status(400).json({ msg: "User doesn't exist" });
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })
                    jwt.sign(
                        {
                            id: user.id,
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


router.put('/change-password/:token', auth, async (req, res) => {
    const { token } = req.params;
    const { oldPassword, newPassword } = req.body;
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    const user = await User.findById({ _id: decoded.id })
    console.log("!!!!!!", user)
    try {
        bcrypt.compare(oldPassword, user.password, (err, result) => {
            if (err) console.log("bscrypt pwd match===>", err)
            if (result === false) return res.status(400).json({ msg: "Invalid Creds" });
            bcrypt.genSalt(10, async (err, salt) => {
                bcrypt.hash(newPassword, salt, async (err, hash) => {
                    // newPassword = hash
                    await User.findByIdAndUpdate({ _id: decoded.id }, { $set: { password: hash } })
                })
            })
            return res.status(200).send(req.body);
        })
    }
    catch (err) {
        console.log("update creds err===>", err)
    }
})

router.put('/change-creds/:token', auth, async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        await User.findOneAndUpdate({ _id: decoded.id }, { $set: { ...req.body } }) 
        return res.status(200).send(req.body);
    }
    catch (err) {
        console.log("update creds err===>", err)
    }
})

module.exports = router;

