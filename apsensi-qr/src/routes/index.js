const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
  const totalStudents = await Student.countDocuments();
  const totalTeachers = await Teacher.countDocuments();
  const presentToday = await Attendance.countDocuments({ timestamp: { $gte: new Date(new Date().setHours(0,0,0,0)) } });
  const recentActivities = await Attendance.find().sort({ timestamp: -1 }).limit(10).lean();
  res.render('dashboard', { page: 'dashboard', stats: { totalStudents, totalTeachers, presentToday }, recentActivities });
});

router.get('/data-siswa', async (req, res) => {
  const students = await Student.find().lean();
  res.render('data-siswa', { page: 'data-siswa', students });
});

router.get('/absen-siswa', (req, res) => { res.render('absen', { page: 'absen-siswa' }); });
router.get('/absen-guru', (req, res) => { res.render('absen', { page: 'absen-guru' }); });

module.exports = router;
