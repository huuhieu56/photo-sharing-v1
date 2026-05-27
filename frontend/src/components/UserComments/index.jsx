import { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { BASE_URL, getCommentsOfUser, getUserProfile } from "../../lib/fetchModelData";
import "./styles.css";


function UserComments() {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const [commentsData, userData] = await Promise.all([
        getCommentsOfUser(userId),
        getUserProfile(userId),
      ]);
      setComments(commentsData || []);
      if (userData) {
        setUserName(`${userData.first_name} ${userData.last_name}`);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Comments by {userName}
      </Typography>
      <List>
        {comments.map((comment) => (
          <ListItem
            key={comment._id}
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              border: "1px solid #ccc",
              borderRadius: "8px",
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Link to={`/photos/${userId}/${comment.photo_id}`}>
                <img
                  src={`${BASE_URL}/images/${comment.photo_file_name}`}
                  alt={comment.photo_file_name}
                  style={{ width: "80px", height: "auto", borderRadius: "4px" }}
                />
              </Link>
              <Link to={`/photos/${userId}/${comment.photo_id}`}>
                <ListItemText secondary={comment.comment} />
              </Link>
            </Box>
            <ListItemText secondary={comment.date_time} />
          </ListItem>
        ))}
      </List>
      {comments.length === 0 && (
        <Typography>No comments found.</Typography>
      )}
    </div>
  );
}

export default UserComments;
