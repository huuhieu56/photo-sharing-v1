import { useEffect, useState } from "react";
import {
  List,
  Toolbar,
  Button,
} from "@mui/material";

import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";
import { getUserPhoto } from "../../lib/fetchModelData";
import PhotoCard from "./Photo/PhotoCard";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos({ checked = false }) {
  const { userId, photoId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getUserPhoto(userId).then(data => setPhotos(data || []));
  }, [userId]);

  const idx = photoId ? Math.max(0, photos.findIndex(p => p._id === photoId)) : 0;

  if (!photos.length) return null;

  if (checked) {
    return (
      <div>
        <PhotoCard photo={photos[idx]} />
        <Toolbar sx={{ gap: 2, justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/photos/${userId}/${photos[idx - 1]._id}`)}
            disabled={idx === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(`/photos/${userId}/${photos[idx + 1]._id}`)}
            disabled={idx === photos.length - 1}
          >
            Next
          </Button>
        </Toolbar>
      </div>
    );
  }

  return (
    <div>
      <List component="nav">
        {photos.map((photo) => (
          <PhotoCard photo={photo}/>
        ))}
      </List>
    </div>
  );
}

export default UserPhotos;
