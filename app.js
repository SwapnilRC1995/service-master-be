const express = require('express');
const path = require('path');
const helmet = require('helmet');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config()

const authenticationRouter = require('./routes/authentication');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const bookingRouter = require('./routes/booking');
const serviceRouter = require('./routes/service');
const tokenRouter = require('./routes/token');

const app = express();

mongoose.set('strictQuery', false);
const main = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);
};
main().catch(err => console.log(err));

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', authenticationRouter)
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/booking', bookingRouter);
app.use('/service', serviceRouter);
app.use('/token', tokenRouter);

app.use((req, res) => res.status(404).send("Route not found"));

module.exports = app;
