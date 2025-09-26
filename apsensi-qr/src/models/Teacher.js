const mongoose = require('mongoose');
const { Schema } = mongoose;
const TeacherSchema = new Schema({
  name: { type: String, required: true },
  nip: { type: String, required: true, unique: true },
  avatarUrl: String,
  qrId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Teacher', TeacherSchema);
