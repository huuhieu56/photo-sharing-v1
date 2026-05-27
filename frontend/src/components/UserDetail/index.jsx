import { useEffect, useState } from "react";
import {Typography, Box, Button} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import {useParams} from "react-router-dom";
import { getUserProfile } from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const params = useParams();
    const [userProfile, setUserProfile] = useState({
      _id: "",
      first_name: "",
      last_name: "",
      location: "",
      description: "",
      occupation: "",
    });
    
    useEffect(() => {
      async function fetchData(id) {
        const data = await getUserProfile(id);
        setUserProfile(data);
      }
      fetchData(params.userId);
    }, [params.userId]); 
    
    return (
        <>
          <Box>
            <Typography variant="h6"> <strong>Full Name: </strong>{userProfile.first_name} {userProfile.last_name}</Typography>
            <Typography variant="body1"> <strong>Location: </strong>{userProfile.location}</Typography>
            <Typography variant="body1"> <strong>Description: </strong>{userProfile.description}</Typography>
            <Typography variant="body1"> <strong>Occupation: </strong>{userProfile.occupation}</Typography>
          </Box>
          <Link to={`/photos/${params.userId}`}>
            <Button variant="contained">User Photos</Button>
          </Link>
          
          
        </>
    );
}

export default UserDetail;
