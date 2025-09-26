const mongoose = require('mongoose');
const connect = async (uri) => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB connected');
};
module.exports = connect;
const mongoose = require(mongoose);
const connect = async (uri) => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log(MongoDB
