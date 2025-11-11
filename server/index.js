// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const questionsRoute = require('./routes/questionsRoute');
const answersRoute = require('./routes/answersRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/questions', questionsRoute);
app.use('/answers', answersRoute);

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mbti_app';
mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> console.log('✓ MongoDB connected'))
  .catch(err => {
    console.warn('⚠ MongoDB connection failed:', err.message);
    console.warn('⚠ The server will continue to run, but answer submission and history will not work.');
    console.warn('⚠ Questions route will work fine without MongoDB.');
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));