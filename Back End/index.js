const express = require('express');
const cors = require('cors')
const path = require('path')
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const errorHandler = require('./midleware/errorHandler');

const app = express();
app.use(express.json());
app.use(cors());

app.use(errorHandler) 
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/uploads/images", express.static(path.resolve(__dirname, "./uploads/images")))


 
connectDb().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
})

