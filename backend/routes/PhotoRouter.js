const express = require("express");
const multer = require("multer");
const path = require("path");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../images"),
    filename: (request, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });



router.get("/photosOfUser/:id", async (request, response) => {
    console.log("[GET] | api/photo/photoOfUser/" + request.params.id);
    try {
        const userId = request.params.id;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return response.status(400).json("User not found with id: " + userId);
        }

        const photos = await Photo
                                .find({ user_id: userId })
                                .select("_id user_id comments file_name date_time")
                                .populate({
                                    path: "comments",
                                    populate: {
                                        path: "user_id",
                                        model: "Users",
                                        select: "_id first_name last_name"
                                    }
                                });

        const formatted = photos.map((photo) => ({
                                    _id: photo._id,
                                    user_id: photo.user_id,
                                    file_name: photo.file_name,
                                    date_time: photo.date_time,
                                    comments: (photo.comments || []).map((c) => ({
                                        _id: c._id,
                                        comment: c.comment,
                                        date_time: c.date_time,
                                        user: c.user_id,
                                    })),
                                    }));

        return response.status(200).json(formatted);
    } catch (error) {
        return response.status(500).json("Server Error: " + error);
    }
});

router.get("/photoById/:id", async (request, response) => {
    console.log("[GET] | api/photo/photoById/" + request.params.id);
    try {
        const photoId = request.params.id;
        const photo = await Photo
                                    .findOne({ _id: photoId })
                                    .select("_id user_id comments file_name date_time")
                                    .populate({
                                        path: "comments",
                                        populate: {
                                            path: "user_id",
                                            model: "Users",
                                            select: "_id first_name last_name"
                                        }
                                    });
        const formatted = {
                            _id: photo._id,
                            user_id: photo.user_id,
                            file_name: photo.file_name,
                            date_time: photo.date_time,
                            comments: (photo.comments || []).map((c) => ({
                                _id: c._id,
                                comment: c.comment,
                                date_time: c.date_time,
                                user: c.user_id,
                            })),
                            };

        return response.status(200).json(formatted);
    } catch (error) {
        return response.status(500).json("Server Error: " + error);
    }
});

router.post("/photos/new", upload.single("photo"), async (request, response) => {
    console.log("[POST] | api/photo/photos/new");
    const userId = request.user_id;

    if (!request.file) {
        return response.status(400).json("No file uploaded");
    }

    try {
        const photo = await Photo.create({
            file_name: request.file.filename,
            date_time: new Date(),
            user_id: userId,
            comments: [],
        });
        return response.status(200).json(photo);
    } catch (error) {
        return response.status(500).json("Server Error: " + error);
    }
});

module.exports = router;
