const express = require('express');
const path = require('path')
const connectDb = require('./config/dbConnection');
const adminRoute = require('./router/adminRoutes')
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const errorHandler = require('./midleware/errorHandler');

const app = express();
app.use(express.json());

app.use(errorHandler) 
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/uploads/images", express.static(path.resolve(__dirname, "./uploads/images")))

app.use('/admin/', adminRoute )

connectDb().then(() => { 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
})

