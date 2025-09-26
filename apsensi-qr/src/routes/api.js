const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// endpoint for scanner to post results
router.post('/absen/scan', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ ok:false, message: 'no code' });
  try {
    // security: accept format student:<id> or teacher:<id>
    const parts = code.split(':');
    if (parts.length < 2) return res.status(400).json({ ok:false });
    const role = parts[0];
    let person;
    if (role === 'student') person = await Student.findOne({ qrId: code });
    if (role === 'teacher') person = await Teacher.findOne({ qrId: code });
    if (!person) return res.status(404).json({ ok:false, message: 'not found' });
    const att = new Attendance({ personId: person._id, role: role, qrPayload: code, timestamp: new Date() });
    await att.save();
    return res.json({ ok:true, person: { name: person.name, id: person._id }, status: 'present' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false });
  }
});

module.exports = router;
