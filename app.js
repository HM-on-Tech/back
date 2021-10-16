const express = require('express');
const cors = require('cors');
const session = require('express-session');
// const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const articleRouter = require('./routes/article');
const articlesRouter = require('./routes/articles');
const publicationRouter = require('./routes/publication')
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
app.use(helmet());
app.use(hpp());
// app.use(cookieParser('COOKIE_SECRET'));
// app.use(session({
//   saveUninitialized: false,
//   resave: false,
//   secret: 'COOKIE_SECRET',
// }));

// GET : localhost:3000/
app.get('/', (req, res) => {
  console.log(res)
  return res.send('I am Diane');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', articleRouter);
app.use('/api/posts', articlesRouter);
app.use('/api/publication', publicationRouter)


app.listen(3065, () => {
  console.log('Server is running');
});