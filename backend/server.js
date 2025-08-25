const express = require('express')
const cors = require("cors");
const connectToDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const resumeRouter = require('./routes/resumeRoutes');

const path = require("path")

require("dotenv").config();

const app = express();
app.use(cors())

app.use(express.json())

app.use("/api/auth", userRouter);
app.use("/api/resume", resumeRouter)

app.use("/uploads",
    express.static(path.join(__dirname, "uploads"), {
        setHeaders: (res, _path) => {
            res.set("Access-Control-Allow-Origin", "https://resume-builder-frontend-5yy4.onrender.com/")//"http://localhost:5173"
        }
    })
)

app.get("/", (req, res) => {
    res.send("API is working")
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



