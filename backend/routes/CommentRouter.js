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

module.exports = router;