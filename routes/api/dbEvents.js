const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Event = require('../../models/Event');

router.get('/', auth, (req, res) => {
    Event.find()
        .sort({ date: -1 })
        .then(Events => res.json(Events))
})

router.post('/', auth, (req, res) => {
    const newEvent = new Event({
        name: req.body.name,
        appt_date: req.body.appt_date
    })
    const dbPromise = newEvent.save();

    Promise.all([dbPromise])
      .then(([dbResponse]) => {
          res.status(200).json([dbResponse]);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
    
})

router.delete('/:id', auth, (req, res) => {
    console.log(req.params)
    Event.findById(req.params.id)
        .then(event => event.remove().then(() => res.json({ success: true })))
        .catch(err => {
            console.log(err)
            res.status(405).json({ success: false })
        })
})

module.exports = router;