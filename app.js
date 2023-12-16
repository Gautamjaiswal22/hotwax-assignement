const express = require('express')
const app = express();
const userRouter = require('./router/router')
app.use(express.json()); // Add this line to parse JSON bodies

app.use('/', userRouter);

module.exports = app;