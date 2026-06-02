import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { BASE_URL, addComment } from "../../../lib/fetchModelData";

function PhotoCard({ photo }) {
  const [commentText, setCommentText] = useState("");

  if (!photo) {
    return null;
  }

  async function handleSubmitComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await addComment(photo._id, commentText);
      setCommentText("");
      window.location.reload();
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  }

  return (
    <Box
      key={photo._id || photo.file_name}
      sx={{ border: "1px solid", margin: "10px" }}
    >
      <img
        src={`${BASE_URL}/images/${photo.file_name}`}
        alt={photo.file_name}
        style={{ width: 600, height: "auto" }}
      />
      <Typography variant="caption">{photo.date_time}</Typography>

      <Box>
        {photo.comments && photo.comments.length > 0 ? (
          photo.comments.map((comment) => (
            <Box key={comment._id} sx={{ border: "1px solid #ddd", margin:"5px", padding:"2px" }}>
              <Link to={`/users/${comment.user._id}`}>
                <Typography variant="subtitle2">
                  {comment.user.first_name} {comment.user.last_name}
                </Typography>
              </Link>
              <Typography variant="body2">{comment.comment}</Typography>
              <Typography variant="caption">{comment.date_time}</Typography>
            </Box>
          ))
        ) : (
          <Typography>"No comments yet."</Typography>
        )}
      </Box>

      <Box component="form" onSubmit={handleSubmitComment}>
        <TextField
          label="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          size="small"
        />
        <Button type="submit" variant="contained" size="small">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default PhotoCard;
