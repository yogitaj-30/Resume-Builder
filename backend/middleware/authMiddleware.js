const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await UserModel.findById(decoded.id).select("-password")
            next();
        } else {
            res.status(401).json({ message: "Not authorized, no token found" })
        }
    } catch (error) {
        res.status(401).json({
            message: "Token failed",
            error: error.message
        })
    }
}

module.exports= protect;