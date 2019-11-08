const express = require('express');
const router = express.Router();
const { createEvent, deleteEvent } = require('../../googleEvents');
const auth = require('../../middleware/auth');
const Event = require('../../models/Event');

router.get('/', auth, (req, res) => {
  Event.find()
      .sort({ date: -1 })
      .then(Events => res.json(Events))
})

router.post('/', auth, async (req, res) => {
  const { appt_date, name, appt_time, size, breed } = req.body;
  const startDate = new Date(appt_date)
  startDate.setHours(appt_time);
  const endDate = new Date(appt_date);
  endDate.setHours(+appt_time + 3);
  const googleEvent = {
    'summary': name,
    'start': {
      'dateTime': startDate.toISOString(),
      'timeZone': 'America/New_York'
    },
    'end': {
      'dateTime': endDate.toISOString()
    },
    'description': `size: ${size}, breed: ${breed}`,
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 13 * 60 },
      ],
    },
  }
  try {
    const googleResponse = await createEvent(googleEvent);
    const newEvent = new Event({
      name: name,
      appt_date: appt_date,
      appt_time: appt_time,
      google_id: googleResponse.data.id
    })
    const dbResponse = await newEvent.save();
    return res.status(200).json(dbResponse);
  }
  catch (err) {
    console.log("eta=>>>", err);
    res.status(500).json(err);
  }
})


router.delete(('/:id'), auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);   
    await deleteEvent(event.google_id);
    await event.remove();
    res.status(200).json(true);
  }
  catch (err) {
    console.log("delete err", err);
    res.status(500).json(err);
  }
})



module.exports = router;