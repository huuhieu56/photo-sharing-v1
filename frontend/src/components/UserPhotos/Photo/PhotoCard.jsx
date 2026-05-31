import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import "../styles.css";
import { Link } from "react-router-dom";
import { BASE_URL, addComment } from "../../../lib/fetchModelData";


function PhotoCard ({photo, onCommentAdded}) {
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
            if (onCommentAdded) onCommentAdded();
        } catch (err) {
            console.error("Failed to add comment:", err);
        }
    }

    return (
        <ListItem
            key={photo._id || photo.file_name}
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <img
              src={`${BASE_URL}/images/${photo.file_name}`}
              alt={photo.file_name}
              style={{
                width: "600px",
                height: "auto",
                marginTop: "8px",
                borderRadius: "8px",
              }}
            />
            <ListItemText secondary={photo.date_time} />
            <List component="nav">
              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <ListItem
                    key={comment._id}
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      border: "1px solid",
                      borderColor: "primary.main",
                      borderRadius: "8px",
                      margin: "5px",
                    }}
                  >
                    <Link to={`/users/${comment.user._id}`}>
                      <ListItemText
                        primary={
                          comment.user.first_name + " " + comment.user.last_name
                        }
                      ></ListItemText>
                    </Link>
                    <ListItemText secondary={comment.date_time}></ListItemText>
                    <ListItemText secondary={comment.comment}></ListItemText>
                  </ListItem>
                ))
              ) : (
                <Typography>"No comments yet."</Typography>
              )}
            </List>

            <Box component="form" onSubmit={handleSubmitComment} sx={{ display: "flex", gap: 1, mt: 1, width: "100%" }}>
              <TextField
                label="Add a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                size="small"
                sx={{ flex: 1 }}
              />
              <Button type="submit" variant="contained" size="small">Submit</Button>
            </Box>

            <Divider sx={{ width: "100%", mt: 2 }} />
          </ListItem>
    )
}

export default PhotoCard;
