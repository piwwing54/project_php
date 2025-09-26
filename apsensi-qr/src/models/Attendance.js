const mongoose = require('mongoose');
const { Schema } = mongoose;
const AttendanceSchema = new Schema({
  personId: { type: Schema.Types.ObjectId, required: true },
  role: { type: String, enum: ['student','teacher'], required: true },
  qrPayload: String,
  status: { type: String, enum: ['present','late','absent'], default: 'present' },
  timestamp: { type: Date, default: Date.now },
  meta: { type: Object }
});
module.exports = mongoose.model('Attendance', AttendanceSchema);
