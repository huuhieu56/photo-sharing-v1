const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (request, response) => {
    const { login_name, password, first_name, last_name, location, description, occupation } = request.body;
    console.log("[POST] | api/user (register)");

    if (!login_name) {
        return response.status(400).json("login_name is required");
    }
    if (!password) {
        return response.status(400).json("password is required");
    }
    if (!first_name) {
        return response.status(400).json("first_name is required");
    }
    if (!last_name) {
        return response.status(400).json("last_name is required");
    }

    try {
        const existing = await User.findOne({ login_name });
        if (existing) {
            return response.status(400).json("login_name already exists");
        }
        const user = await User.create({
            login_name, password, first_name, last_name,
            location: location || "", description: description || "", occupation: occupation || "",
        });
        return response.status(200).json({ login_name: user.login_name, _id: user._id });
    } catch (error) {
        return response.status(500).json("Server Error: " + error);
    }
});

module.exports = router;
