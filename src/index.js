const express = require('express');
const app = express();
const env = require('dotenv');
const userRouter = require('./routes/userRoutes');
const mongoose = require('mongoose');
const { customerRouter } = require('./routes/customerRoutes');
const entryRoute = require('./routes/entryRoutes');

env.config();

app.use(express.json());

app.use('/users', userRouter);
app.use('/customers', customerRouter);
app.use('/entries', entryRoute);

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    app.listen(PORT, ()=> {
        console.log(`Server started at ${PORT}`);
    });
})
.catch((error) => {
    console.log(`connnection has issue: ${error}`);
})
