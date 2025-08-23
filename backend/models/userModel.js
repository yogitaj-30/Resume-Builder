const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
},
    {
        timestamps: true
    }
)

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel