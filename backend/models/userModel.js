const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Name must be at least 3 characters long"],
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, "Password is required"],
    },
},
    {
        timestamps: true
    }
)

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel