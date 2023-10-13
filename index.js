require('dotenv').config();
const express = require('express');
const path = require('path')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./Routes/user.routes');
const coursesRouter = require('./Routes/course.routes');
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL);
app.use('/uploads', express.static(path.join(__dirname ,'uploads')))

app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);

app.use((err, req, res, next) => {
    res.json(err.message);
});





app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));


 