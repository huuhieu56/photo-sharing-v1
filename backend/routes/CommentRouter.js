const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();


router.get("/userCount/:id", async(request, response) => {
    console.log("/api/comment/userCount/" + request.params.id);

    try {
        const photos = await Photo.find({}).select("comments");
        let comments = [];
        for (let i = 0; i<photos.length; i++) {
            for (let j = 0; j<photos[i].comments.length; j++) {
                if (photos[i].comments[j].user_id == request.params.id){
                    comments.push(photos[i].comments[j]);
                }
            }
        }
        return response.status(200).json(comments);
    } catch (error) {
        return response.status(500).json("Server error: " + error);
    }
});

router.post("/commentsOfPhoto/:photo_id", async (request, response) => {
    const photoId = request.params.photo_id;
    const { comment } = request.body;
    const userId = request.user_id;
    console.log("[POST] | api/comment/commentsOfPhoto/" + photoId);

    if (!comment || comment.trim() === "") {
        return response.status(400).json("Comment cannot be empty");
    }

    try {
        const photo = await Photo.findOne({ _id: photoId });
        if (!photo) {
            return response.status(400).json("Photo not found");
        }

        photo.comments.push({
            comment: comment,
            date_time: new Date(),
            user_id: userId,
        });
        await photo.save();

        return response.status(200).json("Comment added");
    } catch (error) {
        return response.status(500).json("Server Error: " + error);
    }
});

module.exports = router;