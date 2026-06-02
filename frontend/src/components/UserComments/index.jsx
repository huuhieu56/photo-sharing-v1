import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import {
  BASE_URL,
  getCommentsOfUser,
  getUserProfile,
} from "../../lib/fetchModelData";
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
      <Typography variant="h6">Comments by {userName}</Typography>
      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <div>
              <Link to={`/photos/${userId}/${comment.photo_id}`}>
                <img
                  className="comment-image"
                  src={`${BASE_URL}/images/${comment.photo_file_name}`}
                  alt={comment.photo_file_name}
                />
              </Link>
            </div>
            <div>
              <Link to={`/photos/${userId}/${comment.photo_id}`}>
                <Typography variant="body1">{comment.comment}</Typography>
              </Link>
            </div>
            <Typography variant="caption">{comment.date_time}</Typography>
          </div>
        ))}
      </div>
      {comments.length === 0 && <Typography>No comments found.</Typography>}
    </div>
  );
}

export default UserComments;
