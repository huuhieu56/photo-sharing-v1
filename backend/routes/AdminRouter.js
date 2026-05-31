const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../db/userModel");
const { JWT_SECRET } = require("../middleware/auth");
const router = express.Router();

router.post("/login", async (request, response) => {
    const { login_name, password } = request.body;
    console.log("[POST] | api/admin/login");

    if (!login_name || !password) {
        return response.status(400).json("login_name and password are required");
    }

    try {
        const user = await User.findOne({ login_name });
        if (!user) {
            return response.status(400).json("Invalid login_name");
        }
        if (user.password !== password) {
            return response.status(400).json("Invalid password");
        }

        const token = jwt.sign({ user_id: user._id }, JWT_SECRET, { expiresIn: "1d" });
        return response.status(200).json({
            token,
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
        });
    } catch (error) {
        return response.status(500).json("Server Error: " + error);
    }
});

router.post("/logout", (request, response) => {
    console.log("[POST] | api/admin/logout");
    return response.status(200).json("Logged out");
});

module.exports = router;
