require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('../src/models/Student');
const Teacher = require('../src/models/Teacher');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/apsensi-qr');
  await Student.deleteMany({});
  const students = [];
  for (let i=1;i<=20;i++) {
    students.push({ name: `Siswa ${i}`, nis: `NIS${1000+i}`, class: `XI-${(i%5)+1}`, qrId: `student:${i}:${Date.now().toString(36)}` });
  }
  await Student.insertMany(students);
  console.log('seed done');
  process.exit(0);
}
seed().catch(e=>{ console.error(e); process.exit(1); });
