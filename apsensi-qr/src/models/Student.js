const mongoose = require('mongoose');
const { Schema } = mongoose;
const StudentSchema = new Schema({
  name: { type: String, required: true },
  nis: { type: String, required: true, unique: true },
  class: { type: String },
  avatarUrl: { type: String },
  qrId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Student', StudentSchema);
