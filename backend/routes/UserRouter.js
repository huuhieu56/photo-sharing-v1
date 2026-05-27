const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.get("/list", async (request, response) => {
    console.log("[GET] | api/user/list")
    try {
        const users = await User.find({}).select("_id first_name last_name");
        return response.status(200).json(users);
    } catch (error) {
        return response.status(500).json("Server Error: " + error);
    }
});

router.get("/:id", async (request, response) => {
    const userId = request.params.id;
    console.log("[GET] | api/user/" + userId);

    try {
        const user = await User.findOne({ _id: userId}).select("_id first_name last_name location description occupation");
        if (!user) {
            return response.status(400).json("User not found with id: " + userId);
        }
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json("Server Error: " + error);
    }

});

module.exports = router;