const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


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



module.exports = { transporter};