const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const SchemaInfo = require("./db/schemaInfo");
const { verifyToken } = require("./middleware/auth");
const AdminRouter = require("./routes/AdminRouter");
const RegisterRouter = require("./routes/RegisterRouter");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const CommentRouter = require("./routes/CommentRouter");

dbConnect();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

// Public routes (no auth required)
app.use("/api/admin", AdminRouter);
app.use("/api/user", RegisterRouter);

// Protected routes (auth required)
app.use("/api/user", verifyToken, UserRouter);
app.use("/api/photo", verifyToken, PhotoRouter);
app.use("/api/comment", verifyToken, CommentRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

app.get("/test/info", async (request, response) => {
  try {
    const info = await SchemaInfo.findOne({});
    return response.status(200).json(info);
  } catch (error) {
    return response.status(500).json("Server Error: " + error);
  }
});

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
