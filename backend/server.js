const express = require('express')
const cors = require("cors");
const connectToDB = require('./config/db');
require("dotenv").config();

const app = express();
app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Test is running")
})

connectToDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`)
        })
    })
    .catch(() => {
        console.log("Error connecting to DB");
        process.exit(1);
    })



