require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');

const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 3000;

// connect to DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/apsensi-qr').catch(err => { console.error(err); process.exit(1); });

// EJS with layouts via ejs-mate
const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: process.env.SESSION_SECRET || 'devsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/apsensi-qr' })
}));

// rate limiter
const limiter = rateLimit({ windowMs: 15*60*1000, max: 300 });
app.use(limiter);

// routes
app.use('/', require('./routes/index'));
app.use('/students', require('./routes/students'));
app.use('/api', require('./routes/api'));

app.listen(PORT, () => console.log('Server running on port', PORT));
