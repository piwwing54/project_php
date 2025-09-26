const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const QRCode = require('qrcode');
const archiver = require('archiver');

// create student
router.post('/', async (req, res) => {
  const { name, nis, class: cls } = req.body;
  const qrId = 'student:' + Date.now().toString(36) + ':' + Math.random().toString(36).slice(2,8);
  const s = new Student({ name, nis, class: cls, qrId });
  await s.save();
  res.redirect('/data-siswa');
});

// download single QR
router.get('/:id/qr', async (req, res) => {
  const s = await Student.findById(req.params.id);
  if (!s) return res.status(404).send('Not found');
  res.setHeader('Content-Type', 'image/png');
  const data = await QRCode.toBuffer(s.qrId, { width: 300 });
  res.send(data);
});

// generate all and return zip
router.get('/generate-all/zip', async (req, res) => {
  const students = await Student.find();
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=qr-all.zip');
  const archive = archiver('zip');
  archive.pipe(res);
  for (const s of students) {
    const buf = await QRCode.toBuffer(s.qrId, { width: 300 });
    archive.append(buf, { name: `${s.nis || s._id}.png` });
  }
  archive.finalize();
});

module.exports = router;
