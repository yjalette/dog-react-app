const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const url = config.get('host');

const transporterOptions = {
    port: 587,
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
        type: "OAUTH2",
        user: process.env.CONTACT_EMAIL,
        accessToken: process.env.CONTACT_TOKEN,
        refreshToken: process.env.CONTACT_REFRESH_TOKEN,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        expires: 1572388199859 + 30000
    },
    tls: {
        rejectUnauthorized: false
    }
}

let transporter = nodemailer.createTransport(transporterOptions);


router.post('/send-message', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <div style="background-color: #87aeb1">
            <h3>Name: ${req.body.name}</h3>
            <p>${req.body.msg}</p>
            </div>
        `

        let mailOptions = {
            from: req.body.email, // sender address
            to: process.env.CONTACT_EMAIL,
            replyTo: req.body.email,
            subject: req.body.subject, // Subject line
            text: req.body.msg,
            html: htmlEmail // html body
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) res.status(500).json(err);

            console.log("msg was sent", mailOptions);

            res.status(200).json(mailOptions)
        })

    })

})


router.post('/reset', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            jwt.sign(            
            {
                id: user._id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            },  config.get('jwtSecret'), 
                (err, token) => {
                if (err) throw err;

                nodemailer.createTestAccount((err, account) => {
                    const htmlEmail = `
        <div style="background-color: #87aeb1">
            <p>In order to change your password please click button below</p>
            <button style="background-color: #87aeb1"><a href="http://localhost:3000/forgot-password/${token}">click</a></button>
        </div>
        `
                    let mailOptions = {
                        from: "szanto@donotreply.com", // sender address
                        to: req.body.email,
                        replyTo: "szanto@donotreply.com",
                        subject: 'password reset', // Subject line
                        text: req.body.msg,
                        html: htmlEmail // html body
                    }

                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) console.log(err);

                        console.log("msg was sent", mailOptions);

                        res.status(200).json({token})

                    })
                })

            })
        }).catch(err => console.log("sent email err", err))
})

    router.post(`/confirm-email/:token`, (req, res) => {
        nodemailer.createTestAccount((err, account) => {
            const htmlEmail = `
        <div style="background-color: #87aeb1">
            <h3 style="color: #b18987">Dear, ${req.body.user.firstName}!</h3>
            <p>Please confirm your account by clicking button below</p>
            <button style="background-color: #87aeb1"><a href="http://localhost:3000/confirm-email/${req.body.token}">click here</a></button>
        </div>
        `
                let mailOptions = {
                from: "szanto@donotreply.com", // sender address
                to: req.body.user.email,
                replyTo: req.body.email,
                subject: 'email confirmation', // Subject line
                text: req.body.msg,
                html: htmlEmail // html body
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) console.log(err);

                res.json("Your account was succusefully created. Please login")
            })

        })
    })



    module.exports = router;