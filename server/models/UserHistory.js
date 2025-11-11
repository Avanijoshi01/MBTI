// server/models/UserHistory.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  date: { type: Date, default: Date.now },
  type: String,
  scores: { type: Object }
});

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  history: { type: [EntrySchema], default: [] }
});

module.exports = mongoose.model('UserHistory', UserSchema);