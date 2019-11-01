const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()

router.post('/', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h3>Name: ${req.body.name}!</h3>
            <p>${req.body.msg}</p>
        `
        let transporter = nodemailer.createTransport({
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
        });

        let mailOptions = {
            from: req.body.email, // sender address
            to: process.env.CONTACT_EMAIL,
            replyTo: req.body.email,
            subject: req.body.subject, // Subject line
            text: req.body.msg,
            html: htmlEmail // html body
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err);

            console.log("msg was sent", mailOptions);

            res.json(mailOptions)
        })

    })

})

router.post(`/:token`, (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h3>Name: ${req.body.user.name}!</h3>
            <p>${`http://localhost:3000/email-confirmation/${req.body.token}`}</p>
        `
        let transporter = nodemailer.createTransport({
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
        });

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

            console.log("msg was sent", mailOptions);

            res.json(mailOptions)
        })

    })



})


module.exports = router;