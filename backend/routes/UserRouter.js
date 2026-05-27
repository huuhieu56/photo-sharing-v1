const express = require("express");
const User = require("../db/userModel");
const Photo = require("../db/photoModel");
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

router.get("/listWithCounts", async (request, response) => {
    console.log("[GET] | api/user/listWithCounts");
    try {
        const users = await User.find({}).select("_id first_name last_name");
        const photos = await Photo.find({}).select("user_id comments");

        const result = users.map((user) => {
            const userId = user._id.toString();
            const photoCount = photos.filter((p) => p.user_id.toString() === userId).length;
            let commentCount = 0;
            photos.forEach((p) => {
                p.comments.forEach((c) => {
                    if (c.user_id && c.user_id.toString() === userId) {
                        commentCount++;
                    }
                });
            });
            return {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                photo_count: photoCount,
                comment_count: commentCount,
            };
        });

        return response.status(200).json(result);
    } catch (error) {
        return response.status(500).json("Server Error: " + error);
    }
});

router.get("/commentsOfUser/:id", async (request, response) => {
    console.log("[GET] | api/user/commentsOfUser/" + request.params.id);
    try {
        const userId = request.params.id;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return response.status(400).json("User not found with id: " + userId);
        }

        const photos = await Photo.find({})
            .select("_id file_name date_time comments")
            .populate({
                path: "comments.user_id",
                model: "Users",
                select: "_id first_name last_name",
            });

        const userComments = [];
        photos.forEach((photo) => {
            photo.comments.forEach((c) => {
                if (c.user_id && c.user_id._id.toString() === userId) {
                    userComments.push({
                        _id: c._id,
                        comment: c.comment,
                        date_time: c.date_time,
                        photo_id: photo._id,
                        photo_file_name: photo.file_name,
                    });
                }
            });
        });

        userComments.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
        return response.status(200).json(userComments);
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