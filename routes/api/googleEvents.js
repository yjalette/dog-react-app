const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../../googleEvents');
const auth = require('../../middleware/auth')

router.get('/', auth, (req, res) => {
  getEvents()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      // console.dir(err);
      res.status(500).json(err.toString())
    })
})

router.post('/', auth, (req, res) => {
  const { appt_date, name, appt_time } = req.body;
  const startDate = new Date(appt_date)
  startDate.setHours(appt_time);
  const endDate = new Date(appt_date);
  endDate.setHours(+appt_time + 3);
  const newEvent = {
    'summary': name,
    'start': {
      'dateTime': startDate.toISOString(),
      'timeZone': 'America/New_York'
    },
    'end': {
      'dateTime': endDate.toISOString()
    },
    'description': `size: ${req.body.size}, breed: ${req.body.breed}`,
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 13 * 60 },
      ],
    },
  }
  createEvent(newEvent)
    .then((googleResponse) => {
      res.status(200).json(googleResponse);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })

})


router.delete(('./:id'), auth, (req, res) => {
     console.log(req)
     console.log(res)
})



module.exports = router;