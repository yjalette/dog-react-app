const express = require('express');
const router = express.Router();
const { createEvent, deleteEvent, updateEvent } = require('../../googleEvents');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');
const Event = require('../../models/Event');

router.get(`/`, auth, (req, res) => {
  console.log(req.user)
  Event.find({user_id: req.user.id})
    .sort({ date: -1 })
    .then(Events => res.json(Events))
})

router.post('/:token', auth, async (req, res) => {
const { appt_date, name, appt_time, size, breed, service, msg} = req.body;
const decoded = jwt.verify(req.params.token, config.get('jwtSecret'));
const user = await User.findById(decoded.id);
  try {
    const googleResponse = await createEvent({...req.body, email: user.email});
    const newEvent = new Event({
      service,
      name,
      breed,
      size,
      user_id: decoded.id,
      appt_date,
      appt_time,
      msg,
      google_id: googleResponse.data.id
    })
    const dbResponse = await newEvent.save();
    return res.status(200).json(dbResponse);
  }
  catch (err) {
    res.status(500).json(err, {msg: "some required files are missing" });
  }
})

router.put(('/:id'), auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    await event.update({ "resource": req.body})
    await updateEvent(req.body, req.body.google_id);
    await event.updateOne({ $set: req.body });
    res.status(200).json(true);
  }
  catch (err) {
    console.log("update err", err);
    res.status(500).json(err, {msg: "some required files are missing" });
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