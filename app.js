const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const mysqlConnection = require('./databases/mysqlConnection');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const todayWorkoutRoutes = require('./routes/todayworkout');
const workoutRecordRoutes = require('./routes/workoutrecord');
const adminRoutes = require('./routes/workout');
const physicalInfoRoutes = require('./routes/physicalinfo');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
mysqlConnection();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/today', todayWorkoutRoutes);
app.use('/record', workoutRecordRoutes);
app.use('/workout', adminRoutes);
app.use('/physical', physicalInfoRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  console.log(err);
  res.status(statusCode).json({ message, data });
});

console.log(process.env);
app.listen(process.env.PORT || 8080);
