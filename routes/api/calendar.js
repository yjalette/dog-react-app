const express = require('express');
const router = express.Router();
const getEvents = require('../../index');


router.get('/', (req, res) => {
    getEvents((err, data) => {
        if (err) {
            // console.log(err);
            res.status(500).json('Error');
            return;
        }
        res.status(200).json(data);
    })
})



module.exports = router;