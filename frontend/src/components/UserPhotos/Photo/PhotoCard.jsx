import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import "../styles.css";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../lib/fetchModelData";


function PhotoCard ({photo}) {
    if (!photo) {
        return null;
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
            <Divider sx={{ width: "100%", mt: 2 }} />
          </ListItem>
    )
}

export default PhotoCard;
