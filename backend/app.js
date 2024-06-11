const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDatabase = require('./config/connectDatabase');

dotenv.config({path: path.join(__dirname, 'config', 'config.env')});

const user = require('./routes/user');

connectDatabase();

app.use(express.json());
app.use(cors());

app.use('/api/v1/', user);

app.get("/", (req, res) => {
    res.send("<h1>User Profile Website...</h1>");
})

app.listen(process.env.PORT, () => { 
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})

// DB_URL = mongodb://0.0.0.0:27017/User-Profile