const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

const postRouter = require('./routes/post');
const inputDataRouter = require('./routes/inputData')
const messageRouter = require('./routes/message')
const db = require('./models');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('DB is connected');
  })
  .catch(console.error);

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('COOKIE_SECRET'));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'COOKIE_SECRET',
}));


app.get('/', (req, res) => {
  console.log(res)
  res.send('hello express');
});

app.delete('/', (req, res) => {
  console.log('--------')
  let first = req.body.PatientFirstName;


  res.json({ 'result': first });
});



app.use('/api/post', postRouter);
app.use('/api/inputData', inputDataRouter)
app.use('/api/message', messageRouter)

app.listen(3065, () => {
  console.log('Server is running');
});